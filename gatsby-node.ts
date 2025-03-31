/**
 * Implement Gatsby's Node APIs in this file.
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

import path from "path";
import fs from "fs";
import type { GatsbyNode } from "gatsby";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
        },
    });
};

export const onPreBootstrap: GatsbyNode["onPreBootstrap"] = ({ reporter }) => {
    reporter.info("Setting up MDX caching for Tailwind CSS processing");
    
    // Create a directory for caching remote MDX content if it doesn't exist
    const mdxCacheDir = path.join(process.cwd(), "public", "mdx-cache");
    if (!fs.existsSync(mdxCacheDir)) {
        reporter.info("Creating MDX cache directory");
        fs.mkdirSync(mdxCacheDir, { recursive: true });
    }
};

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, actions }) => {
    // If this is an MDX node from a remote source, cache its content for Tailwind to process
    if (
        node.internal.type === "Mdx" &&
        node.internal.content
    ) {
        // Cache the MDX content for Tailwind to scan
        const mdxCachePath = path.join(
            process.cwd(),
            "public",
            "mdx-cache",
            `${node.internal.contentDigest}.mdx`
        );
        
        if (!fs.existsSync(mdxCachePath)) {
            fs.writeFileSync(mdxCachePath, node.internal.content);
        }
    }
};