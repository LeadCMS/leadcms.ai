import { GatsbyNode } from "gatsby";

import { createOnlineSalesSchema } from "./src/schema";
import { sourceOnlineSalesNodes } from "./src/source-nodes";
import { PluginOptions } from "./src/types";

/**
 * Initialize the plugin
 */
export const onPreInit: GatsbyNode["onPreInit"] = ({ reporter }) => {
    reporter.info("Initializing OnlineSales source plugin");
};

/**
 * Create nodes from OnlineSales CMS
 */
export const sourceNodes: GatsbyNode["sourceNodes"] = async (
    args,
    pluginOptions: PluginOptions
) => {
    return sourceOnlineSalesNodes(args, pluginOptions);
};

/**
 * Create schema customization
 */
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = async (
    { actions, reporter },
    pluginOptions: PluginOptions
) => {
    return createOnlineSalesSchema(actions.createTypes, reporter, pluginOptions);
};
