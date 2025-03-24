import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const components = {
  // Add custom components for MDX here if needed
};

const PageTemplate = ({ data }) => {
  const { onlineSalesPage } = data;

  return (
    <div className="page-container">
      {onlineSalesPage.localCoverImage && (
        <div className="cover-image">
          <img 
            src={onlineSalesPage.localCoverImage} 
            alt={onlineSalesPage.coverImageAlt || onlineSalesPage.title} 
          />
        </div>
      )}
      <h1>{onlineSalesPage.title}</h1>
      <div className="page-meta">
        {onlineSalesPage.author && <span className="author">By {onlineSalesPage.author}</span>}
        {onlineSalesPage.publishedAt && (
          <span className="date">
            Published: {new Date(onlineSalesPage.publishedAt).toLocaleDateString()}
          </span>
        )}
      </div>
      <div className="page-description">{onlineSalesPage.description}</div>
      <div className="page-content">
        <MDXProvider components={components}>
          <MDXRenderer>{onlineSalesPage.body}</MDXRenderer>
        </MDXProvider>
      </div>
    </div>
  );
};

export default PageTemplate;

export const query = graphql`
  query($id: String!) {
    onlineSalesPage(id: { eq: $id }) {
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
