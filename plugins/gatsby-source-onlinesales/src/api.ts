import axios from "axios";

import { ContentDetailsDto } from "./types";

/**
 * Fetch all content from OnlineSales CMS
 */
export async function fetchContent(
    apiUrl: string,
    language?: string
): Promise<ContentDetailsDto[]> {
    const allData: ContentDetailsDto[] = [];
    const contentUrl = new URL(`${apiUrl}/api/content`);

    contentUrl.searchParams.set("filter[limit]", "100");

    if (language) {
        contentUrl.searchParams.set("filter[where][language][like]", language);
    }

    let hasMoreData = true;
    while (hasMoreData) {
        contentUrl.searchParams.set("filter[skip]", allData.length.toString());
        const response = await axios.get(contentUrl.toString());
        const totalCount = Number(response.headers["x-total-count"]) || response.data.length;
        allData.push(...response.data);
        hasMoreData = allData.length < totalCount;
    }

    return allData;
}

/**
 * Fetch just the content types (lightweight API call)
 */
export async function fetchContentTypes(apiUrl: string): Promise<string[]> {
    try {
        const contentUrl = new URL(`${apiUrl}/api/content`);
        contentUrl.searchParams.set("filter[limit]", "100");

        const contentTypes = new Set<string>();
        let hasMoreData = true;
        let skip = 0;

        while (hasMoreData) {
            contentUrl.searchParams.set("filter[skip]", skip.toString());
            const response = await axios.get(contentUrl.toString());
            const items = response.data;

            items.forEach((item: { type: string }) => {
                contentTypes.add(item.type);
            });

            const totalCount = Number(response.headers["x-total-count"]) || items.length;
            skip += items.length;
            hasMoreData = skip < totalCount;
        }

        return Array.from(contentTypes);
    } catch (error) {
        console.error("Error fetching content types:", error);
        return [];
    }
}
