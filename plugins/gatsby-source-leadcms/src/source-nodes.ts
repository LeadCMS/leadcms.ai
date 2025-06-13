import { LeadCMSApiClient, IContentType } from "./api-client"
import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import yaml from "js-yaml"
import type { GatsbyCache } from "gatsby"
import { ContentFileHelper } from "./content-file-helper"

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

export const onPreInit = ({ reporter }) => reporter.info("Loaded gatsby-source-leadcms plugin")

export const sourceNodes = async (
	{ reporter, cache, actions, createNodeId, createContentDigest },
	pluginOptions: { leadCMSUrl: string; language?: string; targetDir: string },
) => {
	const { leadCMSUrl, language, targetDir } = pluginOptions
	if (!leadCMSUrl || !targetDir) {
		reporter.panic("gatsby-source-leadcms: 'leadCMSUrl' and 'targetDir' options are required!")
		return
	}

	const api = new LeadCMSApiClient({ leadCMSUrl, language })
	reporter.info(`gatsby-source-leadcms: Fetching content types from ${leadCMSUrl}`)
	let contentTypes: Array<IContentType> = []
	try {
		contentTypes = await api.fetchContentTypes()
	} catch (e) {
		reporter.panic(`gatsby-source-leadcms: Failed to fetch content types: ${e}`)
		return
	}

	await fs.mkdir(targetDir, { recursive: true })
	const syncToken = await loadSyncToken(cache)
	if (!syncToken) {
		// Remove all files and folders in targetDir if starting a full sync
		const entries = await fs.readdir(targetDir, { withFileTypes: true })
		for (const entry of entries) {
			const entryPath = path.join(targetDir, entry.name)
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

		const omitFields = []
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

		const fileBase = path.join(targetDir, contentRecord.slug)
		let filePath = fileBase
		let fileContent = ""

		// Determine extension and content
		if (format === "MDX" || format === "MD") {
			const parsed = matter(contentRecord.body)
			const mergedFrontmatter = {
				...parsed.data,
				...filteredRecord,
			}
			const ext = format === "MDX" ? ".mdx" : ".md"
			filePath += ext
			fileContent =
				`---\n${yaml.dump(mergedFrontmatter)}---\n` + parsed.content.replace(/^\s+/, "")
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
	const allFiles = await ContentFileHelper.listFilesRecursive(targetDir)
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
		let expectedBase = path.join(targetDir, expectedSlug)
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
		const files = await fs.readdir(targetDir)
		for (const file of files) {
			if (file.endsWith(".meta.json")) continue
			const filePath = path.join(targetDir, file)
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
	await ContentFileHelper.removeEmptyDirsRecursive(targetDir)

	await saveSyncToken(cache, nextSyncToken)

	const importedCount = contentRecords.length;
	const deletedCount = deleted.length;

	if (importedCount === 0 && deletedCount === 0) {
		reporter.info("gatsby-source-leadcms: All content is up to date.");
	} else {
		if (importedCount > 0) {
			reporter.info(`gatsby-source-leadcms: Imported ${importedCount} content record${importedCount === 1 ? "" : "s"} to ${targetDir}`);
		}
		if (deletedCount > 0) {
			reporter.info(`gatsby-source-leadcms: Deleted ${deletedCount} content record${deletedCount === 1 ? "" : "s"} from ${targetDir}`);
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
