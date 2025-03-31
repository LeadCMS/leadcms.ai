/**
 * Implement Gatsby's Node APIs in this file.
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

import path from "path";
import { GatsbyNode } from "gatsby";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
        },
    });
};