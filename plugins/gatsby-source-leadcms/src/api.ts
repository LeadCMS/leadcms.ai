import axios from "axios";
import { ContentDetailsDto } from "./types";

/**
 * Fetch all content from LeadCMS CMS using a REST endpoint.
 */
export async function fetchContent(
  LeadCMSUrl: string,
  language?: string
): Promise<ContentDetailsDto[]> {
  const allData: ContentDetailsDto[] = [];
  const contentUrl = new URL(`${LeadCMSUrl}/api/content`);

  contentUrl.searchParams.set("filter[limit]", "100");

  if (language) {
    contentUrl.searchParams.set("filter[where][language][like]", language);
  }

  let hasMoreData = true;
  while (hasMoreData) {
    contentUrl.searchParams.set("filter[skip]", allData.length.toString());
    const response = await axios.get<ContentDetailsDto[]>(contentUrl.toString());

    const totalCount =
      Number(response.headers["x-total-count"]) || response.data.length;
    allData.push(...response.data);
    hasMoreData = allData.length < totalCount;
  }

  return allData;
}
