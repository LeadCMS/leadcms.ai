import { PluginOptions as GatsbyPluginOptions } from "gatsby";

/**
 * Plugin options for gatsby-source-onlinesales
 */
export interface PluginOptions extends GatsbyPluginOptions {
    apiUrl: string;
    language?: string;
    staticFolder?: string;
}

/**
 * Content item from OnlineSales CMS API
 */
export interface ContentDetailsDto {
    id: number;
    title: string;
    description: string;
    body?: string;
    coverImageUrl?: string;
    coverImageAlt?: string;
    slug: string;
    type: string;
    author?: string;
    language: string;
    category?: string;
    tags?: string[];
    allowComments?: boolean;
    source?: string;
    publishedAt?: string;
    createdAt?: string;
    updatedAt?: string;
    localCoverImage?: string;
}
