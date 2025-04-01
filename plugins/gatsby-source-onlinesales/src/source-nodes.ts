import { NodePluginArgs } from "gatsby";
import { createRemoteFileNode } from "gatsby-source-filesystem";
import { fetchContent } from "./api";
import { PluginOptions, ONLINESALES_NODE_TYPE } from "./types";

/**
 * Source nodes from OnlineSales CMS.
 */
export async function sourceOnlineSalesNodes(
    args: NodePluginArgs,
    pluginOptions: PluginOptions
): Promise<void> {
    const { actions, createNodeId, createContentDigest, reporter, getCache } = args;
    const { createNode } = actions;
    const { onlineSalesUrl, language } = pluginOptions;

    if (!onlineSalesUrl) {
        reporter.panic("onlineSalesUrl is required for gatsby-source-onlinesales plugin");
        return;
    }

    reporter.info(`Fetching content from ${onlineSalesUrl}`);

    try {
        const allContent = await fetchContent(onlineSalesUrl, language);
        reporter.info(`Processing ${allContent.length} content items`);

        for (const item of allContent) {
            // 1) Convert coverImageUrl to absolute
            const absoluteCoverUrl = makeAbsoluteUrl(item.coverImageUrl, onlineSalesUrl);

            // 2) Replace relative /api/media URLs inside the body
            const originalBody = item.body ?? "";
            const finalMdxContent = replaceRelativeMediaPaths(originalBody, onlineSalesUrl);

            // 3) We store top-level fields (so user can query them easily),
            //    but the real parsing is done by gatsby-plugin-mdx from internal.content.
            //    We'll place finalMdxContent in internal.content, with mediaType text/markdown.
            const nodeData = {
                ...item, // spread in normal fields: id, title, description, etc.
                body: originalBody, // keep the original body if you want direct access
                coverImageUrl: absoluteCoverUrl, // store absolute version at top-level
            };

            const nodeId = createNodeId(`onlinesales-${item.type}-${item.id}`);

            // 4) Create the node object
            const node = {
                ...nodeData,
                id: nodeId,
                parent: null,
                children: [],
                internal: {
                    type: ONLINESALES_NODE_TYPE,
                    // Gatsby plugin MDX will parse this content
                    content: finalMdxContent,
                    mediaType: "text/markdown",
                    contentDigest: createContentDigest(finalMdxContent)
                },
            };

            // 5) Create the node in Gatsby
            await createNode(node as any);

            // 6) If you want to handle coverImageUrl as a local file, create a child File node:
            //    then link it by storing a field named coverImage___NODE.
            //    This lets you query `coverImage { childImageSharp { gatsbyImageData } }`
            if (absoluteCoverUrl) {
                try {
                    const fileNode = await createRemoteFileNode({
                        url: absoluteCoverUrl,
                        parentNodeId: nodeId,
                        createNode,
                        createNodeId,
                        getCache,

                    });
                    if (fileNode) {
                        // create a field that links the file node
                        actions.createNodeField({
                            node: node as any,
                            name: `coverImage`,
                            value: fileNode.id,
                        });
                    }
                } catch (err) {
                    reporter.warn(
                        `Failed to download cover image from ${absoluteCoverUrl}: ${err}`
                    );
                }
            }
        }

        reporter.info(`Successfully processed ${allContent.length} OnlineSales content items`);
    } catch (error) {
        reporter.panic(
            `Failed to source content from OnlineSales CMS: ${
                error instanceof Error ? error.message : String(error)
            }`,
            error instanceof Error ? error : new Error(String(error))
        );
    }
}


/**
 * Convert /api/media/... references to absolute URLs using baseUrl or apiUrl.
 */
function makeAbsoluteUrl(
    relativeOrFullUrl: string | undefined,
    baseDomain: string
): string | undefined {
    if (!relativeOrFullUrl) return undefined;

    // If it's already absolute, return as is:
    try {
        new URL(relativeOrFullUrl);
        return relativeOrFullUrl; // no error => it's absolute
    } catch {
        // Otherwise, construct from base
        return `${baseDomain.replace(/\/$/, "")}${relativeOrFullUrl}`;
    }
}

/**
 * Replace occurrences of /api/media/... in the body with absolute URLs,
 * so that remark/MDX image plugins can handle them properly.
 */
function replaceRelativeMediaPaths(body: string, baseDomain: string): string {
    return body.replace(
        /(\]\(|src=")(\/api\/media[^\)"]+)/g,
        `$1${baseDomain.replace(/\/$/, "")}$2`
    );
}