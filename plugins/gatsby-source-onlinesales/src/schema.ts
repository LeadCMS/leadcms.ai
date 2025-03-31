import { Reporter } from "gatsby";

import { fetchContentTypes } from "./api";
import { PluginOptions } from "./types";

/**
 * Create schema customization for OnlineSales content types
 */
export async function createOnlineSalesSchema(
    createTypes: (types: string | string[]) => void,
    reporter: Reporter,
    pluginOptions: PluginOptions
): Promise<void> {
    const { apiUrl } = pluginOptions;

    if (!apiUrl) {
        reporter.panic("apiUrl is required for gatsby-source-onlinesales plugin");
        return;
    }

    // Define the base interface including frontmatter fields
    const typeDefs = `
    interface OnlineSalesContent @dontInfer {
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
      rawFrontmatter: String
      # Common frontmatter fields
      seoTitle: String
      seoDescription: String
    }
  `;

    createTypes(typeDefs);

    try {
        // Prefetch content types right now during schema creation
        reporter.info(`Prefetching content types from ${apiUrl}`);
        const contentTypes = await fetchContentTypes(apiUrl);

        if (contentTypes.length === 0) {
            reporter.warn("No content types found in the API");
            return; // Don't create any types if none found
        }

        reporter.info(`Found content types: ${contentTypes.join(", ")}`);

        // Create schema types only for the types discovered in the API
        contentTypes.forEach(contentType => {
            const typeName = `OnlineSales${contentType.charAt(0).toUpperCase() + contentType.slice(1)}`;

            reporter.info(`Creating schema for content type: ${contentType} as ${typeName}`);

            // Define each type with explicit fields to match interface
            const typeDefStr = `
                type ${typeName} implements Node & OnlineSalesContent @dontInfer {
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
                    rawFrontmatter: String
                    # Common frontmatter fields
                    seoTitle: String
                    seoDescription: String
                    internal: Internal!
                }
            `;

            createTypes(typeDefStr);
        });
    } catch (error) {
        // Just log the error without creating any default types
        reporter.error(`Error creating schema types: ${error}`);
        reporter.warn("Schema may be incomplete - no types were created");
    }
}
