import React from 'react';
import { graphql, Link } from 'gatsby';

const BlogIndexTemplate = ({ data }) => {
  const { allOnlineSalesPost } = data;

  return (
    <div className="blog-container">
      <h1>Blog</h1>
      <div className="post-list">
        {allOnlineSalesPost.nodes.map(post => (
          <div className="post-card" key={post.id}>
            {post.localCoverImage && (
              <div className="post-card-image">
                <Link to={`/blog/${post.slug}`}>
                  <img 
                    src={post.localCoverImage} 
                    alt={post.coverImageAlt || post.title} 
                  />
                </Link>
              </div>
            )}
            <div className="post-card-content">
              <h2>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <div className="post-card-meta">
                {post.category && <span className="category">{post.category}</span>}
                {post.author && <span className="author">By {post.author}</span>}
                {post.publishedAt && (
                  <span className="date">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
              <p className="description">{post.description}</p>
              <Link to={`/blog/${post.slug}`} className="read-more">
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogIndexTemplate;

export const query = graphql`
  query {
    allOnlineSalesPost(
      sort: {publishedAt: DESC}
      filter: {publishedAt: {ne: null}}
    ) {
      nodes {
        id
        slug
        title
        description
        localCoverImage
        coverImageAlt
        author
        category
        tags
        publishedAt
      }
    }
  }
`;
