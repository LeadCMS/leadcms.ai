import dotenv from "dotenv";
import type { GatsbyConfig } from "gatsby";

// Load environment variables from .env file
dotenv.config();

// Validate required environment variables
if (!process.env.GATSBY_LEADCMS_API_URL) {
  throw new Error(
    "The GATSBY_LEADCMS_API_URL environment variable is required. Please check your .env file."
  );
}

const apiUrl = process.env.GATSBY_LEADCMS_API_URL;

const config: GatsbyConfig = {
  siteMetadata: {
    title: `LeadCMS`,
    siteUrl: `https://leadcms.ai`,
  },
  graphqlTypegen: true,
  plugins: [
    // 1. Tailwind/PostCSS pipeline
    {
      resolve: "gatsby-plugin-postcss",
      options: {
        postcssOptions: {
          plugins: [require("tailwindcss"), require("autoprefixer")],
        },
      },
    },

    // 2. Google Analytics (optional)
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [process.env.GATSBY_GA_TRACKING_ID].filter(Boolean),
        pluginConfig: {
          head: true,
        },
      },
    },

    // 3. LeadCMS remote source
    {
      resolve: "gatsby-source-leadcms",
      // You can pass any serializable options to the plugin
      options: {
        leadCMSUrl: apiUrl,
        language: process.env.GATSBY_LEADCMS_LANGUAGE || "en",
        targetDir: "./content",
      },
    },

    // 4. Source LeadCMS content from filesystem
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: "./content",
      },
    },

    // 5. Gatsby core image plugins (process images in the data layer)
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",

    // 6. Source local files if needed (images/pages)
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./static/images/",
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

    // 7. MDX plugin – transforms any nodes with mediaType "text/markdown" or "text/mdx"
    "gatsby-plugin-mdx",

    // 8. Sitemap, Manifest, and other site-level plugins
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "static/images/favicon.png", // Ensure this file exists and is in a supported format
        icons: [
          {
            src: "static/images/icon-192x192.png", // Ensure this file exists
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "static/images/icon-512x512.png", // Ensure this file exists
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#0B0B0D",
        name: "LeadCMS",
        short_name: "LeadCMS",
      },
    },
  ],
};

export default config;