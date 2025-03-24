import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `OnlineSales`,
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-postcss", 
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        // You need to provide at least one tracking ID
        trackingIds: [
          "GA-TRACKING-ID", // Replace with your actual Google Analytics tracking ID
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
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.png"
      }
    }, 
    "gatsby-plugin-mdx", 
    "gatsby-plugin-sharp", 
    "gatsby-transformer-sharp", 
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    }, 
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    }
  ]
};

export default config;
