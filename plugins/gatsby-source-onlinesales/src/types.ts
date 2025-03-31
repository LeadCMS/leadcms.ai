import { PluginOptions as GatsbyPluginOptions } from "gatsby";

/**
 * Plugin options for gatsby-source-onlinesales.
 */
export interface PluginOptions extends GatsbyPluginOptions {
  onlineSalesUrl: string;
  language?: string;
}

/**
 * Content item from OnlineSales CMS API.
 */
export interface ContentDetailsDto {
  id: number;
  title: string;
  description: string;
  body?: string; // frontmatter + MDX
  coverImageUrl?: string;
  coverImageAlt?: string;
  slug: string;
  type: string;
  author?: string;
  language: string;
  category?: string;
  tags?: string[];
  allowComments?: boolean;
  publishedAt?: string; // ISO date
  seoTitle?: string;
  seoDescription?: string;
}
