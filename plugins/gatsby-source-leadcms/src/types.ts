import { PluginOptions as GatsbyPluginOptions } from "gatsby";

/**
 * Plugin options for gatsby-source-leadcms.
 */
export interface PluginOptions extends GatsbyPluginOptions {
  LeadCMSUrl: string;
  language?: string;
}

/**
 * The Gatsby node type for LeadCMS content
 */
export const LEADCMS_NODE_TYPE = 'LeadCMSContent';
