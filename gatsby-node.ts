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

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
    const { createTypes } = actions;
    
    createTypes(`
        type MdxFrontmatter {
            title: String
            description: String
            type: String
            tags: [String]
            author: String
            publishedAt: Date @dateformat
            coverImageUrl: String
            coverImageAlt: String
            allowComments: Boolean
        }
        
        type Mdx implements Node {
            frontmatter: MdxFrontmatter
        }
    `);
};

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;
    
    // Query for all blog posts
    const result = await graphql<{
        allMdx: {
            totalCount: number;
            nodes: Array<{
                id: string;
                slug: string;
                frontmatter: {
                    publishedAt?: string;
                };
            }>;
        };
    }>(`
        query GetAllBlogPosts {
            allMdx(
                filter: { frontmatter: { type: { eq: "blog-post" } } }
            ) {
                totalCount
                nodes {
                    id
                    slug
                    frontmatter {
                        publishedAt
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild("Error loading blog posts", result.errors);
        return;
    }

    // Sort posts by published date (newest first) in Node.js
    const allPosts = result.data?.allMdx.nodes || [];
    const sortedPosts = allPosts.sort((a, b) => {
        const dateA = a.frontmatter.publishedAt ? new Date(a.frontmatter.publishedAt).getTime() : 0;
        const dateB = b.frontmatter.publishedAt ? new Date(b.frontmatter.publishedAt).getTime() : 0;
        return dateB - dateA; // DESC order (newest first)
    });

    const totalCount = result.data?.allMdx.totalCount || 0;
    const postsPerPage = 15;
    const totalPages = Math.ceil(totalCount / postsPerPage);

    // Create paginated blog index pages
    Array.from({ length: totalPages }).forEach((_, i) => {
        const currentPage = i + 1;
        const skip = i * postsPerPage;
        
        // Get the post IDs for this page in sorted order
        const pagePostIds = sortedPosts.slice(skip, skip + postsPerPage).map(post => post.id);
        const sortedPostIds = sortedPosts.map(post => post.id);
        
        createPage({
            path: currentPage === 1 ? "/blog" : `/blog/page/${currentPage}`,
            component: path.resolve("./src/templates/blog-index.tsx"),
            context: {
                skip,
                limit: postsPerPage,
                currentPage,
                totalPages,
                hasNextPage: currentPage < totalPages,
                hasPreviousPage: currentPage > 1,
                postIds: pagePostIds,
                sortedPostIds: sortedPostIds,
            },
        });
    });

    reporter.info(`Created ${totalPages} blog index pages for ${totalCount} posts`);
};