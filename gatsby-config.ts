import dotenv from "dotenv";
import type { GatsbyConfig } from "gatsby";

// Load environment variables from .env file
dotenv.config();

// Validate required environment variables
if (!process.env.ONLINESALES_API_URL) {
    throw new Error(
        "The ONLINESALES_API_URL environment variable is required. Please check your .env file."
    );
}

const config: GatsbyConfig = {
    siteMetadata: {
        title: `OnlineSales`,
        siteUrl: `https://onlinesales.tech`,
    },
    graphqlTypegen: true,
    plugins: [
        "gatsby-plugin-postcss",
        {
            resolve: "gatsby-plugin-google-gtag",
            options: {
                // You need to provide at least one tracking ID
                trackingIds: [
                    process.env.GA_TRACKING_ID, // Replace with your actual Google Analytics tracking ID
                ],
                // Optional configuration options
                pluginConfig: {
                    // Puts tracking script in the head instead of the body
                    head: true,
                },
            },
        },
        "gatsby-plugin-image",
        "gatsby-plugin-sitemap",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "src/images/icon.png",
            },
        },
        "gatsby-plugin-mdx",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: "./src/images/",
            },
            __key: "images",
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "pages",
                path: "./src/pages/",
            },
            __key: "pages",
        },
        {
            resolve: "gatsby-source-onlinesales",
            options: {
                apiUrl: process.env.ONLINESALES_API_URL,
                language: process.env.ONLINESALES_LANGUAGE || "en",
            },
        },
    ],
};

export default config;
