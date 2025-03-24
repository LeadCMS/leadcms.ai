import { MDXProvider } from '@mdx-js/react';
import { graphql, PageProps } from 'gatsby';
import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/Seo'; // Fixed import path
import mdxComponents from '../utils/mdxComponents';

interface PageData {
  onlineSalesPage: {
    slug: string;
    title: string;
    description: string;
    body: string;
    localCoverImage?: string;
    coverImageAlt?: string;
    author?: string;
    publishedAt?: string;
    updatedAt?: string;
  };
}

const PageTemplate: React.FC<PageProps<PageData>> = ({ data }) => {
  const { onlineSalesPage } = data;

  // Skip rendering home page as it will be handled by index.js
  if (onlineSalesPage.slug === 'home') {
    return null;
  }

  return (
    <Layout>
      <SEO
        title={onlineSalesPage.title}
        description={onlineSalesPage.description}
        image={onlineSalesPage.localCoverImage}
      />
      <div className="page-container">
        {onlineSalesPage.localCoverImage && (
          <div className="page-cover-image">
            <img
              src={onlineSalesPage.localCoverImage}
              alt={onlineSalesPage.coverImageAlt || onlineSalesPage.title}
            />
          </div>
        )}
        <h1 className="page-title">{onlineSalesPage.title}</h1>
        <div className="page-content">
          <MDXProvider components={mdxComponents}>
            <div dangerouslySetInnerHTML={{ __html: onlineSalesPage.body }} />
          </MDXProvider>
        </div>
      </div>
    </Layout>
  );
};

export default PageTemplate;

export const query = graphql`
  query ($id: String!) {
    onlineSalesPage(id: { eq: $id }) {
      slug
      title
      description
      body
      localCoverImage
      coverImageAlt
      author
      publishedAt
      updatedAt
    }
  }
`;
