// This file is the entry point for the plugin
exports.onPreInit = ({ reporter }) => {
  reporter.info("Loaded gatsby-source-onlinesales");
}

// Export components that can be used in MDX files
exports.mdxComponents = {
  BlogPostList: require('./components/BlogPostList'),
  FeaturedPosts: require('./components/FeaturedPosts'),
  HomepageFeature: require('./components/HomepageFeature')
};
