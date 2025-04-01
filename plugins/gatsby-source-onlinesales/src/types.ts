import { PluginOptions as GatsbyPluginOptions } from "gatsby";

/**
 * Plugin options for gatsby-source-onlinesales.
 */
export interface PluginOptions extends GatsbyPluginOptions {
  onlineSalesUrl: string;
  language?: string;
}

/**
 * The Gatsby node type for OnlineSales content
 */
export const ONLINESALES_NODE_TYPE = 'OnlineSalesContent';
