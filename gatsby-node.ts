/**
 * Implement Gatsby's Node APIs in this file.
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

import { GatsbyNode } from "gatsby";

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
    const { createTypes } = actions;

    // Define the schema for OnlineSalesLanding to include the optional SEO fields
    const typeDefs = `
    type OnlineSalesLanding implements Node {
      slug: String!
      title: String!
      description: String!
      body: String!
      seoKeywords: String
      seoImage: String
    }
  `;

    createTypes(typeDefs);
};
