import { GatsbyNode } from "gatsby";

import { sourceOnlineSalesNodes } from "./src/source-nodes";
import { createOnlineSalesSchema } from "./src/schema";
import { PluginOptions } from "./src/types";

export const sourceNodes: GatsbyNode["sourceNodes"] = async (
  gatsbyApi,
  pluginOptions
) => {
  return sourceOnlineSalesNodes(gatsbyApi, pluginOptions as PluginOptions);
};

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = async (
  { actions, reporter },
  pluginOptions
) => {
  const { createTypes } = actions;
  return createOnlineSalesSchema(createTypes, reporter, pluginOptions as PluginOptions);
};
