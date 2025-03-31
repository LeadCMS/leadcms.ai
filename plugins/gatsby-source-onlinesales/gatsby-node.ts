import { GatsbyNode } from "gatsby";
import { sourceOnlineSalesNodes } from "./src/source-nodes";
import { PluginOptions } from "./src/types";

/**
 * Implements Gatsby's sourceNodes API.
 */
export const sourceNodes: GatsbyNode["sourceNodes"] = async (
  gatsbyApi,
  pluginOptions
) => {
  // Delegate to our custom function in src/source-nodes.ts
  return sourceOnlineSalesNodes(gatsbyApi, pluginOptions as PluginOptions);
};

/**
 * Creates a single node type `Content` and links its coverImage to File.
 * We rely on `gatsby-plugin-mdx` to parse the `internal.content` as frontmatter + MDX.
 */
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = async ({
  actions,
  reporter,
}) => {
  const { createTypes } = actions;

  // Define the node type. We'll store frontmatter+MDX in `internal.content`,
  // but also expose top-level fields for convenience. coverImage is a File link.
  // The "seoTitle" and "seoDescription" fields can be optional or removed if not used.
  const typeDefs = `
    type Content implements Node {
      # Basic fields
      id: ID!
      title: String
      description: String
      slug: String!
      type: String!
      author: String
      language: String!
      category: String
      tags: [String]
      allowComments: Boolean
      publishedAt: Date
      seoTitle: String
      seoDescription: String

      # The raw body is also stored at top-level for convenience, though
      # MDX parsing will happen via internal.content. 
      body: String

      # The cover image is stored as a separate File node
      coverImage: File @link

      # If you prefer to keep the cover image URL in a string field as well:
      coverImageUrl: String
      coverImageAlt: String
    }
  `;

  createTypes(typeDefs);
  reporter.info("Created single Content schema type");
};
