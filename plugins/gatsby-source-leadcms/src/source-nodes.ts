import { LeadCMSApiClient, IContentType } from "./api-client"
import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import yaml from "js-yaml"
import type { GatsbyCache } from "gatsby"

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
	{ reporter, cache },
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
			filePath += ".yaml"
			const yamlObj = { ...filteredRecord, body: contentRecord.body }
			fileContent = yaml.dump(yamlObj)
		} else if (format === "JSON") {
			filePath += ".json"
			const jsonObj = { ...filteredRecord, body: contentRecord.body }
			fileContent = JSON.stringify(jsonObj, null, 2)
		} else if (format === "PlainText") {
			filePath += ".txt"
			fileContent = contentRecord.body
			const meta = { ...filteredRecord }
			await fs.writeFile(fileBase + ".meta.json", JSON.stringify(meta, null, 2), "utf8")
		}

		await fs.writeFile(filePath, fileContent, "utf8")
		reporter.info(`gatsby-source-leadcms: Saved ${filePath}`)
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

	await saveSyncToken(cache, nextSyncToken)

	reporter.info(`gatsby-source-leadcms: Imported ${contentRecords.length} posts to ${targetDir}`)
}
