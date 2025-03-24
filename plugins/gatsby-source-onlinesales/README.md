# Gatsby Source OnlineSales

A Gatsby source plugin for pulling content from OnlineSales CMS. This plugin fetches pages and blog posts from the OnlineSales CMS API and makes them available as Gatsby nodes.

## Installation

The plugin is included locally in your project.

## Configuration

Add the plugin to your `gatsby-config.js`:

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-onlinesales',
      options: {
        apiUrl: 'https://your-onlinesales-api-url', // Required: URL to OnlineSales API
        language: 'en-US', // Optional: filter content by language
        staticFolder: `${__dirname}/static`, // Optional: path to the static folder
      },
    },
    // Make sure you have these plugins installed and configured
    'gatsby-plugin-mdx',
  ],
};
```

## Dependencies

This plugin requires the following packages:

- gatsby-plugin-mdx
- @mdx-js/react

Install them with:

```bash
npm install --save gatsby-plugin-mdx @mdx-js/react
```

## Features

- Fetches content from OnlineSales CMS API
- Downloads and processes media files
- Provides MDX components for rendering content dynamically
- Makes content available as Gatsby nodes for your site's pages

## Data Structure

### Content Types

- **OnlineSalesPage**: General pages (type = "page")
- **OnlineSalesBlog**: Blog page content (type = "blog")
- **OnlineSalesPost**: Blog posts (type = "post")

### Special Pages

- **Home Page**: Create a page with the slug "home" to populate the home page
- **Blog Page**: Create content with the type "blog" to customize the blog listing page

## MDX Components

The plugin provides several MDX components that you can use in your content:

### BlogPostList

Displays a list of blog posts with pagination.

```jsx
<BlogPostList 
  postsPerPage={10} 
  showPagination={true}
  showImage={true}
  showExcerpt={true}
/>
```

### FeaturedPosts

Displays a selection of featured posts.

```jsx
<FeaturedPosts 
  count={3} 
  category="Tutorial" 
  tags={["React", "Gatsby"]}
  layout="grid"
/>
```

### HomepageFeature

Creates a feature section for the home page.

```jsx
<HomepageFeature
  title="Welcome to Our Site"
  description="Learn more about our products and services"
  image="/path/to/image.jpg"
  imageAlt="Feature description"
  linkUrl="/about"
  linkText="Read More"
  layout="left"
/>
```

## Usage Examples

### Querying Pages

```graphql
{
  allOnlineSalesPage {
    nodes {
      title
      description
      body
      localCoverImage
      author
      publishedAt
    }
  }
}
```

### Querying Posts

```graphql
{
  allOnlineSalesPost {
    nodes {
      title
      description
      body
      localCoverImage
      author
      category
      tags
      publishedAt
    }
  }
}
```
