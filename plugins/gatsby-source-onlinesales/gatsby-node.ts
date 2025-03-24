import fs from "fs";
import path from "path";

import axios from "axios";
import {
    GatsbyNode,
    SourceNodesArgs,
    CreateSchemaCustomizationArgs,
    PluginOptions as GatsbyPluginOptions,
} from "gatsby";

interface PluginOptions extends GatsbyPluginOptions {
    apiUrl: string;
    language?: string;
    staticFolder?: string;
}

interface ContentItem {
    id: number;
    title: string;
    description: string;
    body?: string;
    coverImageUrl?: string;
    coverImageAlt?: string;
    slug: string;
    type: string;
    author?: string;
    language: string;
    category?: string;
    tags?: string[];
    allowComments?: boolean;
    source?: string;
    publishedAt?: string;
    createdAt?: string;
    updatedAt?: string;
    localCoverImage?: string;
}

// Function to fetch all content from OnlineSales CMS
async function fetchContent(apiUrl: string, language?: string): Promise<ContentItem[]> {
    const allData: ContentItem[] = [];
    const contentUrl = new URL(`${apiUrl}/api/content`);

    contentUrl.searchParams.set("filter[limit]", "100");

    if (language) {
        contentUrl.searchParams.set("filter[where][language][like]", language);
    }

    // Fix: Replace while(true) with a more explicit condition
    let hasMoreData = true;
    while (hasMoreData) {
        contentUrl.searchParams.set("filter[skip]", allData.length.toString());
        const response = await axios.get(contentUrl.toString());
        const totalCount = Number(response.headers["x-total-count"]) || response.data.length;
        allData.push(...response.data);
        // Fix: Replace console.log with reporter.info in the sourceNodes function
        hasMoreData = allData.length < totalCount;
    }

    return allData;
}

// Function to extract media URLs from content
function extractMediaUrls(content?: string): string[] {
    if (!content) return [];

    const mediaUrls: string[] = [];
    const regex = /\/api\/media\/([^\s"')]+)/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
        mediaUrls.push(match[1]);
    }

    return mediaUrls;
}

// Function to download media files
// Fix parameter order - required params first, then optional
async function downloadMedia(
    apiUrl: string,
    filePath: string,
    staticFolder: string
): Promise<string | null> {
    try {
        const mediaUrl = `${apiUrl}/api/media/${filePath}`;
        const response = await axios.get(mediaUrl, { responseType: "arraybuffer" });

        const localPath = path.join(staticFolder, "media", filePath);
        const localDir = path.dirname(localPath);

        // Create directory if it doesn't exist
        if (!fs.existsSync(localDir)) {
            fs.mkdirSync(localDir, { recursive: true });
        }

        // Write file
        fs.writeFileSync(localPath, response.data);

        return `/media/${filePath}`; // Return the local path relative to static folder
    } catch (error) {
        console.error(`Error downloading media from ${filePath}:`, error);
        return null;
    }
}

// Function to replace media URLs in content
function replaceMediaUrls(
    content: string | undefined,
    localMediaPaths: Record<string, string>
): string {
    if (!content) return "";

    let updatedContent = content;

    // Replace all instances of "/api/media/..." with local paths
    for (const [mediaPath, localUrl] of Object.entries(localMediaPaths)) {
        const regex = new RegExp(`/api/media/${mediaPath}`, "g");
        updatedContent = updatedContent.replace(regex, localUrl);
    }

    return updatedContent;
}

export const sourceNodes: GatsbyNode["sourceNodes"] = async (
    { actions, createNodeId, createContentDigest, reporter }: SourceNodesArgs,
    pluginOptions: PluginOptions
) => {
    const { createNode } = actions;
    const { apiUrl, language } = pluginOptions;
    const staticFolder = pluginOptions.staticFolder || "./public/static";

    if (!apiUrl) {
        reporter.panic("apiUrl is required for gatsby-source-onlinesales plugin");
        return;
    }

    reporter.info(`Fetching content from ${apiUrl}`);

    try {
        // Fetch all content from OnlineSales CMS
        const allContent = await fetchContent(apiUrl, language);

        reporter.info(`Processing ${allContent.length} content items`);

        // Process each content item
        for (const item of allContent) {
            // Extract media URLs from the body and cover image
            const bodyMediaUrls = extractMediaUrls(item.body);
            const coverImagePath =
                item.coverImageUrl && item.coverImageUrl.startsWith("/api/media/")
                    ? item.coverImageUrl.replace("/api/media/", "")
                    : null;

            const allMediaPaths: string[] = [...bodyMediaUrls];
            if (coverImagePath) allMediaPaths.push(coverImagePath);

            // Download media files and get local paths
            const localMediaPaths: Record<string, string> = {};
            for (const mediaPath of allMediaPaths) {
                reporter.verbose(`Downloading media: ${mediaPath}`);
                const localPath = await downloadMedia(apiUrl, mediaPath, staticFolder);
                if (localPath) {
                    localMediaPaths[mediaPath] = localPath;
                }
            }

            // Replace media URLs in content
            item.body = replaceMediaUrls(item.body, localMediaPaths);

            if (coverImagePath && localMediaPaths[coverImagePath]) {
                item.localCoverImage = localMediaPaths[coverImagePath];
            }

            // Create node based on content type
            const nodeType =
                item.type === "page"
                    ? "OnlineSalesPage"
                    : item.type === "blog"
                      ? "OnlineSalesBlog"
                      : "OnlineSalesPost";

            const nodeId = createNodeId(`onlinesales-${item.type}-${item.id}`);
            const nodeContent = JSON.stringify(item);

            const node = {
                ...item,
                id: nodeId,
                parent: null,
                children: [],
                internal: {
                    type: nodeType,
                    content: nodeContent,
                    contentDigest: createContentDigest(item),
                },
            };

            createNode(node);
        }

        reporter.success(`Successfully processed ${allContent.length} OnlineSales content items`);
    } catch (error) {
        reporter.panic(
            `Failed to source content from OnlineSales CMS: ${error instanceof Error ? error.message : String(error)}`,
            error instanceof Error ? error : new Error(String(error))
        );
    }
};

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({
    actions,
}: CreateSchemaCustomizationArgs) => {
    const { createTypes } = actions;

    const typeDefs = `
    type OnlineSalesPage implements Node {
      id: ID!
      title: String!
      description: String!
      body: String
      coverImageUrl: String
      coverImageAlt: String
      localCoverImage: String
      slug: String!
      type: String!
      author: String
      language: String!
      allowComments: Boolean
      publishedAt: Date
      createdAt: Date
      updatedAt: Date
    }

    type OnlineSalesBlog implements Node {
      id: ID!
      title: String!
      description: String!
      body: String
      coverImageUrl: String
      coverImageAlt: String
      localCoverImage: String
      slug: String!
      type: String!
      author: String
      language: String!
      allowComments: Boolean
      publishedAt: Date
      createdAt: Date
      updatedAt: Date
    }

    type OnlineSalesPost implements Node {
      id: ID!
      title: String!
      description: String!
      body: String
      coverImageUrl: String
      coverImageAlt: String
      localCoverImage: String
      slug: String!
      type: String!
      author: String
      language: String!
      category: String
      tags: [String]
      allowComments: Boolean
      source: String
      publishedAt: Date
      createdAt: Date
      updatedAt: Date
      comments: JSON
    }
  `;

    createTypes(typeDefs);
};
