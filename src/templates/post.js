import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const components = {
  // Add custom components for MDX here if needed
};

const PostTemplate = ({ data }) => {
  const { onlineSalesPost } = data;

  return (
    <div className="post-container">
      {onlineSalesPost.localCoverImage && (
        <div className="cover-image">
          <img 
            src={onlineSalesPost.localCoverImage} 
            alt={onlineSalesPost.coverImageAlt || onlineSalesPost.title} 
          />
        </div>
      )}
      <h1>{onlineSalesPost.title}</h1>
      <div className="post-meta">
        {onlineSalesPost.category && <span className="category">{onlineSalesPost.category}</span>}
        {onlineSalesPost.author && <span className="author">By {onlineSalesPost.author}</span>}
        {onlineSalesPost.publishedAt && (
          <span className="date">
            Published: {new Date(onlineSalesPost.publishedAt).toLocaleDateString()}
          </span>
        )}
      </div>
      {onlineSalesPost.tags && onlineSalesPost.tags.length > 0 && (
        <div className="tags">
          {onlineSalesPost.tags.map(tag => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
      )}
      <div className="post-description">{onlineSalesPost.description}</div>
      <div className="post-content">
        <MDXProvider components={components}>
          <MDXRenderer>{onlineSalesPost.body}</MDXRenderer>
        </MDXProvider>
      </div>
    </div>
  );
};

export default PostTemplate;

export const query = graphql`
  query($id: String!) {
    onlineSalesPost(id: { eq: $id }) {
      title
      description
      body
      localCoverImage
      coverImageAlt
      author
      category
      tags
      publishedAt
      updatedAt
    }
  }
`;
