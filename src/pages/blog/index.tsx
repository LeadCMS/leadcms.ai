import { MDXProvider } from '@mdx-js/react';
import { graphql, PageProps } from 'gatsby';
import React from 'react';

import BlogPostList from '../../components/BlogPostList';
import Layout from '../../components/Layout';
import SEO from '../../components/Seo'; // Fixed import path
import mdxComponents from '../../utils/mdxComponents';

// Create local mdxComponents object that includes our BlogPostList component
const localMdxComponents = {
  ...mdxComponents,
  BlogPostList,
};

interface BlogNode {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  localCoverImage?: string;
  coverImageAlt?: string;
  author?: string;
  publishedAt?: string;
}

interface BlogPageQueryData {
  allOnlineSalesBlog: {
    nodes: BlogNode[];
  };
}

const BlogPage: React.FC<PageProps<BlogPageQueryData>> = ({ data }) => {
  // Find the blog page content
  const blogPage = data.allOnlineSalesBlog.nodes[0];

  return (
    <Layout>
      <SEO
        title={blogPage ? blogPage.title : 'Blog'}
        description={blogPage ? blogPage.description : 'Our latest blog posts'}
        image={blogPage ? blogPage.localCoverImage : undefined}
      />
      <div className="blog-page-container">
        {blogPage ? (
          <>
            {blogPage.localCoverImage && (
              <div className="blog-hero-image">
                <img
                  src={blogPage.localCoverImage}
                  alt={blogPage.coverImageAlt || blogPage.title}
                />
              </div>
            )}
            <h1 className="blog-page-title">{blogPage.title}</h1>
            <div className="blog-page-content">
              <MDXProvider components={localMdxComponents}>
                {/* Replace MDXRenderer with direct dangerouslySetInnerHTML */}
                <div dangerouslySetInnerHTML={{ __html: blogPage.body }} />
              </MDXProvider>
            </div>
          </>
        ) : (
          <>
            <h1 className="blog-page-title">Blog</h1>
            {/* Default blog listing when no blog page content is available */}
            <BlogPostList postsPerPage={10} showPagination={true} />
          </>
        )}
      </div>
    </Layout>
  );
};

export default BlogPage;

export const query = graphql`
  query {
    allOnlineSalesBlog {
      nodes {
        id
        slug
        title
        description
        body
        localCoverImage
        coverImageAlt
        author
        publishedAt
      }
    }
  }
`;
