import axios from "axios"

interface ILeadCMSApiClientOptions {
	leadCMSUrl: string
	language?: string
}

export interface IContent {
	title: string
	description: string
	body: string
	coverImageUrl: string
	coverImageAlt: string
	slug: string
	type: string
	author: string
	language: string
	category: string
	tags: Array<string>
	allowComments: boolean
	source: string
	publishedAt: string
	id: number
	createdAt: string
	updatedAt: string
}

export interface IContentType {
	uid: string
	format: "MD" | "YAML" | "JSON" | "MDX" | "PlainText"
	supportsComments: boolean
	supportsCoverImage: boolean
	id: number
	createdAt: string
	updatedAt: string
}

async function fetchPaginated<T>(url: URL): Promise<Array<T>> {
	const allData: Array<T> = []
	// eslint-disable-next-line no-constant-condition
	while (true) {
		url.searchParams.set("filter[skip]", allData.length.toString())
		const response = await axios.get(url.toString())
		const totalCount = Number(response.headers["x-total-count"]) || response.data.length
		allData.push(...response.data)
		console.log(`Loaded ${allData.length} items of ${totalCount} from ${url.pathname}`)
		if (totalCount === allData.length) {
			break
		}
	}
	return allData
}

class LeadCMSApiClient {
	private _options: ILeadCMSApiClientOptions

	constructor(options: ILeadCMSApiClientOptions) {
		this._options = options
	}

	async fetchContent(): Promise<Array<IContent>> {
		const postsUrl = new URL("/api/content", this._options.leadCMSUrl)
		postsUrl.searchParams.set("filter[limit]", "100")
		if (this._options.language) {
			postsUrl.searchParams.set("filter[where][language][like]", this._options.language)
		}
		return fetchPaginated<IContent>(postsUrl)
	}

	async fetchContentTypes(): Promise<Array<IContentType>> {
		const typesUrl = new URL("/api/content-types", this._options.leadCMSUrl)
		typesUrl.searchParams.set("filter[limit]", "100")
		return fetchPaginated<IContentType>(typesUrl)
	}

	async fetchContentSyncPaged(
		syncToken: string | undefined,
		reporter: { info: (msg: string) => void },
	): Promise<{ items: Array<IContent>; deleted: Array<number>; nextSyncToken: string }> {
		const allItems: Array<IContent> = []
		const allDeleted: Array<number> = []
		let token = syncToken || ""
		let page = 0
		let nextSyncToken: string | undefined = token
		// eslint-disable-next-line no-constant-condition
		while (true) {
			const url = new URL("/api/content/sync", this._options.leadCMSUrl)
			url.searchParams.set("filter[limit]", "100")
			url.searchParams.set("syncToken", token)
			const response = await fetch(url.toString())
			if (response.status === 204) break
			const data = await response.json()
			if (data.items && Array.isArray(data.items)) allItems.push(...data.items)
			if (data.deleted && Array.isArray(data.deleted)) allDeleted.push(...data.deleted)
			nextSyncToken = response.headers.get("x-next-sync-token") || nextSyncToken
			if (!nextSyncToken || nextSyncToken === token) break
			token = nextSyncToken
			reporter.info(`gatsby-source-leadcms: Synced page ${++page}, token: ${token}`)
		}
		return { items: allItems, deleted: allDeleted, nextSyncToken: nextSyncToken || "" }
	}
}

export { LeadCMSApiClient }
