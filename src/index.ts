import { GatsbyBrowser } from 'gatsby';

import BlogPostList from './components/BlogPostList';
import FeaturedPosts from './components/FeaturedPosts';
import HomepageFeature from './components/HomepageFeature';

// This file is the entry point for the plugin
export const onPreInit: GatsbyBrowser['onPreRouteUpdate'] = () => {
  // Using warn instead of log to comply with ESLint rule
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('Loaded gatsby-plugin-onlinesales');
  }
};

// Export components that can be used in MDX files
export const mdxComponents = {
  BlogPostList,
  FeaturedPosts,
  HomepageFeature,
};
