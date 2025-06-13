import { LeadCMSApiClient, IContentType } from "./api-client"
import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import yaml from "js-yaml"
import type { GatsbyCache, Reporter, Actions, NodePluginArgs } from "gatsby"
import { ContentFileHelper } from "./content-file-helper"
import axios from "axios"

async function loadSyncToken(cache: GatsbyCache): Promise<string | undefined> {
	try {
		return (await cache.get("leadcms-sync-token")) as string | undefined
	} catch {
		return undefined
	}
}

async function saveSyncToken(cache: GatsbyCache, syncToken: string) {
	await cache.set("leadcms-sync-token", syncToken)
}

export const onPreInit = ({ reporter }: { reporter: Reporter }) => reporter.info("Loaded gatsby-source-leadcms plugin")

export const sourceNodes = async (
	{
		reporter,
		cache,
		actions,
		createNodeId,
		createContentDigest,
	}: {
		reporter: Reporter;
		cache: GatsbyCache;
		actions: Actions;
		createNodeId: NodePluginArgs["createNodeId"];
		createContentDigest: NodePluginArgs["createContentDigest"];
	},
	pluginOptions: { leadCMSUrl: string; language?: string; targetDir: string },
) => {
	const { leadCMSUrl, language, targetDir } = pluginOptions
	if (!leadCMSUrl || !targetDir) {
		reporter.panic("gatsby-source-leadcms: 'leadCMSUrl' and 'targetDir' options are required!")
		return
	}

	// Use a dedicated 'content' subdirectory for all content data
	const contentDir = path.join(targetDir, "content")

	const api = new LeadCMSApiClient({ leadCMSUrl, language })
	reporter.info(`gatsby-source-leadcms: Fetching content types from ${leadCMSUrl}`)
	let contentTypes: Array<IContentType> = []
	try {
		contentTypes = await api.fetchContentTypes()
	} catch (e) {
		reporter.panic(`gatsby-source-leadcms: Failed to fetch content types: ${e}`)
		return
	}

	await fs.mkdir(contentDir, { recursive: true })
	const syncToken = await loadSyncToken(cache)
	if (!syncToken) {
		// Remove all files and folders in contentDir if starting a full sync
		const entries = await fs.readdir(contentDir, { withFileTypes: true })
		for (const entry of entries) {
			const entryPath = path.join(contentDir, entry.name)
			if (entry.isDirectory()) {
				await fs.rm(entryPath, { recursive: true, force: true })
			} else {
				await fs.unlink(entryPath)
			}
		}
	}
	const {
		items: contentRecords,
		deleted,
		nextSyncToken,
	} = await api.fetchContentSyncPaged(syncToken, reporter)

	// Build a map of id -> slug for all current records
	const idToSlug = new Map<string, string>()
	for (const contentRecord of contentRecords) {
		if (contentRecord.id && contentRecord.slug) {
			idToSlug.set(String(contentRecord.id), contentRecord.slug)
		}
	}

	for (const contentRecord of contentRecords) {
		if (!contentRecord.body || !contentRecord.slug) continue
		const contentType = contentTypes.find((ct) => ct.uid === contentRecord.type)
		if (!contentType) {
			reporter.warn(
				`gatsby-source-leadcms: No content type found for type '${contentRecord.type}' (slug: ${contentRecord.slug})`,
			)
			continue
		}
		const { format, supportsComments, supportsCoverImage } = contentType

		// Explicitly type omitFields as string[]
		const omitFields: string[] = []
		if (!supportsComments) omitFields.push("allowComments")
		if (!supportsCoverImage) omitFields.push("coverImageUrl", "coverImageAlt")

		const filteredRecord = Object.fromEntries(
			Object.entries(contentRecord).filter(
				([k, v]) =>
					!omitFields.includes(k) &&
					k !== "body" &&
					v !== undefined &&
					v !== null &&
					(typeof v !== "string" || v.trim() !== "") &&
					(Array.isArray(v) ? v.length > 0 : true),
			),
		)

		const fileBase = path.join(contentDir, contentRecord.slug)
		let filePath = fileBase
		let fileContent = ""

		// --- MEDIA HANDLING FOR MDX/MD ---
		let mediaImports: string[] = []
		let mediaReplacements: Array<{ original: string; replacement: string }> = []
		let processedBody = contentRecord.body

		if (format === "MDX" || format === "MD") {
			// 1. Find all media URLs in body content
			const mediaRefs = findMediaUrls(contentRecord.body, leadCMSUrl)
			
			// 2. Find media URLs in frontmatter fields BEFORE converting them
			const frontmatterMediaRefs = findMediaUrlsInFrontmatter(filteredRecord, leadCMSUrl)
			
			// 3. Combine all media references and deduplicate by URL
			const allMediaRefsMap = new Map<string, { url: string; localPath: string; importVar: string }>()
			for (const ref of [...mediaRefs, ...frontmatterMediaRefs]) {
				allMediaRefsMap.set(ref.url, ref)
			}
			const allMediaRefs = Array.from(allMediaRefsMap.values())
			
			// 4. Download all media files
			for (const { url, localPath, importVar } of allMediaRefs) {
				const absMediaPath = path.join(targetDir, localPath)
				const publicMediaPath = path.join(process.cwd(), "public", localPath)
				try {
					await downloadMediaFile(url, absMediaPath)
					// Also copy to public directory for static serving
					await downloadMediaFile(url, publicMediaPath)
					reporter.info(`gatsby-source-leadcms: Downloaded media ${url} -> ${absMediaPath} and ${publicMediaPath}`)
				} catch (e) {
					const errorMsg = e instanceof Error ? `${e.message}\n${e.stack}` : String(e)
					reporter.warn(`gatsby-source-leadcms: Failed to download media ${url}: ${errorMsg}`)
					continue
				}
				// Calculate relative path from MDX file to media file (only for body content media that needs imports)
				if (mediaRefs.some(ref => ref.url === url)) {
					const mdxDir = path.dirname(fileBase)
					const relImportPath = path.relative(mdxDir, path.join(targetDir, localPath)).replace(/\\/g, "/")
					mediaImports.push(`import ${importVar} from "${relImportPath}"`)
					// Replace all occurrences of the original URL with the importVar (for markdown/JSX)
					mediaReplacements.push({ original: url, replacement: importVar })
					const rawPath = url.replace(/^https?:\/\/[^/]+/, "")
					mediaReplacements.push({ original: rawPath, replacement: importVar })
				}
			}

			// 5. Replace /api/media/ URLs in frontmatter fields with /media/ URLs
			for (const [key, value] of Object.entries(filteredRecord)) {
				if (typeof value === "string" && value.includes("/api/media/")) {
					filteredRecord[key] = value.replace(/\/api\/media\//g, "/media/")
					reporter.info(`gatsby-source-leadcms: Converted frontmatter URL in ${key}: ${value} -> ${filteredRecord[key]}`)
				}
			}

			// Replace markdown image syntax ![alt](original_url) with <img src={importVar} alt="alt" />
			if (mediaRefs.length > 0) {
				for (const { url, importVar } of mediaRefs) {
					// Replace ![alt](url) and ![alt](rawPath) with <img src={importVar} alt="alt" />
					const safeUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
					const urlImgRegex = new RegExp(`!\\[([^\\]]*)\\]\\(${safeUrl}\\)`, "g")
					processedBody = processedBody.replace(urlImgRegex, (_m, alt) => `<img src={${importVar}} alt="${alt}" />`)
					const rawPath = url.replace(/^https?:\/\/[^/]+/, "")
					const safeRawPath = rawPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
					const rawImgRegex = new RegExp(`!\\[([^\\]]*)\\]\\(${safeRawPath}\\)`, "g")
					processedBody = processedBody.replace(rawImgRegex, (_m, alt) => `<img src={${importVar}} alt="${alt}" />`)
				}
				// Also: Replace ![alt](img_var) and ![alt](${img_var}) with <img src={img_var} alt="alt" />
				processedBody = processedBody.replace(
					/!\[([^\]]*)\]\((img_[a-zA-Z0-9_]+)\)/g,
					(_match, alt, varName) => `<img src={${varName}} alt="${alt}" />`
				)
				processedBody = processedBody.replace(
					/!\[([^\]]*)\]\(\$\{(img_[a-zA-Z0-9_]+)\}\)/g,
					(_match, alt, varName) => `<img src={${varName}} alt="${alt}" />`
				)
			}

			// 2. Replace all media URLs in the body with the imported variable (not as a string)
			if (mediaReplacements.length > 0) {
				for (const { original, replacement } of mediaReplacements) {
					const safeOriginal = original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
					const re = new RegExp(safeOriginal, "g")
					processedBody = processedBody.replace(re, replacement)
				}
			}

			// 2b. Replace JSX props like image="img_index_leadcms_preview_png" with image={img_index_leadcms_preview_png}
			if (mediaRefs.length > 0) {
				for (const { importVar } of mediaRefs) {
					// Replace image="img_index_leadcms_preview_png" or src="img_index_leadcms_preview_png" with image={img_index_leadcms_preview_png}
					const jsxPropVarNameRegex = new RegExp(`(image|src)=["']${importVar}["']`, "g")
					processedBody = processedBody.replace(jsxPropVarNameRegex, `$1={${importVar}}`)
					// Also handle image="${img_index_leadcms_preview_png}" or src="${img_index_leadcms_preview_png}"
					const jsVarPattern = `\\$\\{${importVar}\\}`
					const jsxPropVarExprRegex = new RegExp(`(image|src)=["']${jsVarPattern}["']`, "g")
					processedBody = processedBody.replace(jsxPropVarExprRegex, `$1={${importVar}}`)
				}
			}

			// 3. Prepare MDX file content
			const parsed = matter(processedBody)
			const mergedFrontmatter = {
				...parsed.data,
				...filteredRecord,
			}
			const ext = format === "MDX" ? ".mdx" : ".md"
			filePath += ext
			let importBlock = ""
			if (mediaImports.length > 0) {
				importBlock = mediaImports.join("\n") + "\n"
			}
			// --- Insert an empty line after imports and before MDX content ---
			fileContent =
				`---\n${yaml.dump(mergedFrontmatter)}---\n` +
				(importBlock ? importBlock : "") +
				(importBlock ? "\n" : "") + // always add an empty line after imports if imports exist
				parsed.content.replace(/^\s+/, "")
		} else if (format === "YAML") {
			filePath += ".yml"
			const yamlObj = { ...filteredRecord, body: contentRecord.body }
			fileContent = yaml.dump(yamlObj)
		} else if (format === "JSON") {
			filePath += ".json"
			const jsonObj = { ...filteredRecord, body: contentRecord.body }
			fileContent = JSON.stringify(jsonObj, null, 2)
		} else if (format === "PlainText") {
			filePath += ".txt"
			fileContent = contentRecord.body
		}

		// Ensure parent directory exists before writing any file
		await fs.mkdir(path.dirname(filePath), { recursive: true })

		// Write main file
		await fs.writeFile(filePath, fileContent, "utf8")

		// Handle .meta.json for PlainText
		if (format === "PlainText") {
			const meta = { ...filteredRecord }
			const metaPath = fileBase + ".meta.json"
			await fs.mkdir(path.dirname(metaPath), { recursive: true })
			await fs.writeFile(metaPath, JSON.stringify(meta, null, 2), "utf8")
		}

		reporter.info(`gatsby-source-leadcms: Saved ${filePath}`)
	}

	// --- Remove obsolete files for records whose slug has changed ---
	const allFiles = await ContentFileHelper.listFilesRecursive(contentDir)
	for (const filePath of allFiles) {
		// Ignore directories and meta.json files for now (meta.json handled with main file)
		if (filePath.endsWith(".meta.json")) continue

		let id: string | undefined
		try {
			id = await ContentFileHelper.extractIdFromFile(filePath)
		} catch {
			continue
		}
		if (!id) continue
		const expectedSlug = idToSlug.get(id)
		if (!expectedSlug) continue // deleted content, handled below

		// Compute expected file path for this id/slug
		let expectedBase = path.join(contentDir, expectedSlug)
		let expectedPaths = [
			expectedBase + ".mdx",
			expectedBase + ".md",
			expectedBase + ".yml",
			expectedBase + ".json",
			expectedBase + ".txt",
		]
		// If this file is not at the expected path, it's obsolete (slug changed)
		if (!expectedPaths.includes(filePath)) {
			await fs.unlink(filePath)
			reporter.info(`gatsby-source-leadcms: Removed obsolete file due to slug change: ${filePath}`)
			// Remove meta.json if present
			const metaPath = filePath.replace(/\.[^.]+$/, ".meta.json")
			try {
				await fs.unlink(metaPath)
			} catch {}
		}
	}

	// Handle deleted content
	for (const id of deleted) {
		const files = await fs.readdir(contentDir)
		for (const file of files) {
			if (file.endsWith(".meta.json")) continue
			const filePath = path.join(contentDir, file)
			try {
				const content = await fs.readFile(filePath, "utf8")
				if (content.includes(`id: ${id}`) || content.includes(`"id": ${id}`)) {
					await fs.unlink(filePath)
					reporter.info(`gatsby-source-leadcms: Deleted ${filePath}`)
					const metaPath = filePath.replace(/\.[^.]+$/, ".meta.json")
					try {
						await fs.unlink(metaPath)
					} catch (e) {
						// ignore
					}
				}
			} catch (e) {
				// ignore
			}
		}
	}

	// Garbage collect empty folders after sync
	await ContentFileHelper.removeEmptyDirsRecursive(contentDir)

	await saveSyncToken(cache, nextSyncToken)

	const importedCount = contentRecords.length;
	const deletedCount = deleted.length;

	if (importedCount === 0 && deletedCount === 0) {
		reporter.info("gatsby-source-leadcms: All content is up to date.");
	} else {
		if (importedCount > 0) {
			reporter.info(`gatsby-source-leadcms: Imported ${importedCount} content record${importedCount === 1 ? "" : "s"} to ${contentDir}`);
		}
		if (deletedCount > 0) {
			reporter.info(`gatsby-source-leadcms: Deleted ${deletedCount} content record${deletedCount === 1 ? "" : "s"} from ${contentDir}`);
		}
	}

	// Create a minimal system node to avoid Gatsby warning about no nodes
	actions.createNode({
		id: createNodeId("leadcms-system-node"),
		parent: null,
		children: [],
		internal: {
			type: "LeadCMS",
			contentDigest: createContentDigest({
				importedCount,
				deletedCount,
				timestamp: Date.now(),
			}),
		},
		importedCount,
		deletedCount,
		timestamp: Date.now(),
	});
}

// Utility to find all media URLs in a string (markdown, JSX, or component props)
function findMediaUrls(mdx: string, leadCMSUrl: string): Array<{ url: string; localPath: string; importVar: string }> {
	const results: Array<{ url: string; localPath: string; importVar: string }> = []
	const seen = new Set<string>()
	const mediaRegexes = [
		// Markdown image: ![alt](/api/media/...)
		/!\[[^\]]*\]\((\/api\/media\/[^\s)]+)\)/g,
		// Markdown image: ![alt](https://admin.leadcms.ai/api/media/...)
		/!\[[^\]]*\]\((https?:\/\/[^)]+\/api\/media\/[^\s)]+)\)/g,
		// JSX/HTML <img src="/api/media/...">
		/<img[^>]*src=["'](\/api\/media\/[^"']+)["']/g,
		/<img[^>]*src=["'](https?:\/\/[^"']+\/api\/media\/[^"']+)["']/g,
		// JSX <Image src="/api/media/...">
		/<Image[^>]*src=["'](\/api\/media\/[^"']+)["']/g,
		/<Image[^>]*src=["'](https?:\/\/[^"']+\/api\/media\/[^"']+)["']/g,
		// --- NEW: Any JSX prop named image or src with /api/media/... or full URL ---
		/\b(?:image|src)=["'](\/api\/media\/[^"']+)["']/g,
		/\b(?:image|src)=["'](https?:\/\/[^"']+\/api\/media\/[^"']+)["']/g,
	]
	for (const regex of mediaRegexes) {
		let match
		while ((match = regex.exec(mdx))) {
			const rawUrl = match[1]
			if (seen.has(rawUrl)) continue
			seen.add(rawUrl)
			// Normalize to absolute URL
			let url: string
			if (rawUrl.startsWith("http")) {
				url = rawUrl
			} else {
				url = leadCMSUrl.replace(/\/$/, "") + rawUrl
			}
			// Extract path after /media/
			const mediaPathMatch = /\/media\/(.+)$/.exec(rawUrl)
			if (!mediaPathMatch) continue
			const mediaPath = mediaPathMatch[1]
			const localPath = `media/${mediaPath}`
			// Variable name: imgIndex_leadcms_preview_png
			const importVar = "img_" + mediaPath.replace(/[^a-zA-Z0-9]/g, "_")
			results.push({ url, localPath, importVar })
		}
	}
	return results
}

// Utility to find media URLs in frontmatter fields
function findMediaUrlsInFrontmatter(frontmatter: Record<string, any>, leadCMSUrl: string): Array<{ url: string; localPath: string; importVar: string }> {
	const results: Array<{ url: string; localPath: string; importVar: string }> = []
	const seen = new Set<string>()
	
	// Check all string values in frontmatter for media URLs
	for (const [key, value] of Object.entries(frontmatter)) {
		if (typeof value === "string" && value.includes("/api/media/")) {
			if (seen.has(value)) continue
			seen.add(value)
			
			// Normalize to absolute URL for downloading
			let url: string
			if (value.startsWith("http")) {
				url = value
			} else {
				url = leadCMSUrl.replace(/\/$/, "") + value
			}
			
			// Extract path after /api/media/
			const mediaPathMatch = /\/api\/media\/(.+)$/.exec(value)
			if (!mediaPathMatch) continue
			
			const mediaPath = mediaPathMatch[1]
			const localPath = `media/${mediaPath}`
			// Variable name: img_blog_test_blog_post_leadcms_preview_png
			const importVar = "img_" + mediaPath.replace(/[^a-zA-Z0-9]/g, "_")
			
			results.push({ url, localPath, importVar })
		}
	}
	
	return results
}

// Download a file to disk if not already present
async function downloadMediaFile(url: string, destPath: string) {
	await fs.mkdir(path.dirname(destPath), { recursive: true })
	try {
		await fs.access(destPath)
		// Already exists
		return
	} catch {}
	const response = await axios.get(url, { responseType: "arraybuffer" })
	await fs.writeFile(destPath, response.data)
}
