import fs from "fs/promises"
import path from "path"
import yaml from "js-yaml"

export class ContentFileHelper {
	static async listFilesRecursive(dir: string): Promise<string[]> {
		const subdirs = await fs.readdir(dir, { withFileTypes: true })
		const files = await Promise.all(
			subdirs.map(async (entry) => {
				const res = path.join(dir, entry.name)
				if (entry.isDirectory()) {
					return ContentFileHelper.listFilesRecursive(res)
				} else {
					return [res]
				}
			}),
		)
		return files.flat()
	}

	static async extractIdFromFile(filePath: string): Promise<string | undefined> {
		let fileContent: string
		try {
			fileContent = await fs.readFile(filePath, "utf8")
		} catch {
			return undefined
		}

		if (filePath.endsWith(".md") || filePath.endsWith(".mdx")) {
			const match = /^---\n([\s\S]*?)\n---/.exec(fileContent)
			if (match) {
				try {
					const frontmatter = yaml.load(match[1]) as Record<string, any>
					if (frontmatter && frontmatter.id) return String(frontmatter.id)
				} catch {}
			}
		} else if (filePath.endsWith(".yml")) {
			try {
				const data = yaml.load(fileContent) as Record<string, any>
				if (data && data.id) return String(data.id)
			} catch {}
		} else if (filePath.endsWith(".json")) {
			try {
				const data = JSON.parse(fileContent)
				if (data && data.id) return String(data.id)
			} catch {}
		} else if (filePath.endsWith(".txt")) {
			const metaPath = filePath.replace(/\.txt$/, ".meta.json")
			try {
				const metaContent = await fs.readFile(metaPath, "utf8")
				const meta = JSON.parse(metaContent)
				if (meta && meta.id) return String(meta.id)
			} catch {}
		}
		return undefined
	}

	static async removeEmptyDirsRecursive(dir: string): Promise<void> {
		let entries: Array<import("fs").Dirent>
		try {
			entries = await fs.readdir(dir, { withFileTypes: true })
		} catch {
			return
		}
		const subdirs = []
		for (const entry of entries) {
			if (entry.isDirectory()) {
				const subdir = path.join(dir, entry.name)
				await ContentFileHelper.removeEmptyDirsRecursive(subdir)
				subdirs.push(subdir)
			}
		}
		// After cleaning subdirs, check if current dir is empty
		const after = await fs.readdir(dir)
		if (after.length === 0) {
			// Don't remove the root targetDir itself
			const { targetDir } = require.main?.children?.[0]?.exports?.pluginOptions || {}
			if (!targetDir || path.resolve(dir) !== path.resolve(targetDir)) {
				await fs.rmdir(dir).catch(() => {})
			}
		}
	}
}
