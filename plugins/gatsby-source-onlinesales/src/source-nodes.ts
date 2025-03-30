import { NodePluginArgs } from "gatsby";

import { fetchContent } from "./api";
import { downloadMedia, extractMediaUrls, replaceMediaUrls } from "./media";
import { PluginOptions } from "./types";

/**
 * Source nodes from OnlineSales CMS
 */
export async function sourceOnlineSalesNodes(
    args: NodePluginArgs,
    pluginOptions: PluginOptions
): Promise<void> {
    const { actions, createNodeId, createContentDigest, reporter } = args;
    const { createNode } = actions;
    const { apiUrl, language } = pluginOptions;
    const staticFolder = pluginOptions.staticFolder || "./public/static";

    if (!apiUrl) {
        reporter.panic("apiUrl is required for gatsby-source-onlinesales plugin");
        return;
    }

    reporter.info(`Fetching content from ${apiUrl}`);

    try {
        const allContent = await fetchContent(apiUrl, language);

        reporter.info(`Processing ${allContent.length} content items`);

        for (const item of allContent) {
            const bodyMediaUrls = extractMediaUrls(item.body);
            const coverImagePath =
                item.coverImageUrl && item.coverImageUrl.startsWith("/api/media/")
                    ? item.coverImageUrl.replace("/api/media/", "")
                    : null;

            const allMediaPaths: string[] = [...bodyMediaUrls];
            if (coverImagePath) allMediaPaths.push(coverImagePath);

            const localMediaPaths: Record<string, string> = {};
            for (const mediaPath of allMediaPaths) {
                reporter.verbose(`Downloading media: ${mediaPath}`);
                const localPath = await downloadMedia(apiUrl, mediaPath, staticFolder);
                if (localPath) {
                    localMediaPaths[mediaPath] = localPath;
                }
            }

            item.body = replaceMediaUrls(item.body, localMediaPaths);

            if (coverImagePath && localMediaPaths[coverImagePath]) {
                item.localCoverImage = localMediaPaths[coverImagePath];
            }

            const nodeType = `OnlineSales${item.type.charAt(0).toUpperCase() + item.type.slice(1)}`;

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

        reporter.info(`Successfully processed ${allContent.length} OnlineSales content items`);
    } catch (error) {
        reporter.panic(
            `Failed to source content from OnlineSales CMS: ${error instanceof Error ? error.message : String(error)}`,
            error instanceof Error ? error : new Error(String(error))
        );
    }
}
