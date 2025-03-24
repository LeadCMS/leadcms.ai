import { useStaticQuery, graphql, Link } from 'gatsby';
import React from 'react';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  localCoverImage?: string;
  coverImageAlt?: string;
  author?: string;
  category?: string;
  tags?: string[];
  publishedAt?: string;
}

interface FeaturedPostsQueryData {
  allOnlineSalesPost: {
    nodes: BlogPost[];
  }
}

interface FeaturedPostsProps {
  count?: number;
  category?: string | null;
  tags?: string[] | null;
  layout?: 'grid' | 'list';
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ 
  count = 3, 
  category = null, 
  tags = null, 
  layout = "grid"
}) => {
  const data = useStaticQuery<FeaturedPostsQueryData>(graphql`
    query {
      allOnlineSalesPost(
        sort: { publishedAt: DESC }
        filter: { publishedAt: { ne: null } }
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
  `);

  let posts = data.allOnlineSalesPost.nodes;
  
  // Filter by category if specified
  if (category) {
    posts = posts.filter(post => post.category === category);
  }
  
  // Filter by tags if specified
  if (tags && Array.isArray(tags) && tags.length > 0) {
    posts = posts.filter(post => 
      post.tags && post.tags.some(tag => tags.includes(tag))
    );
  }
  
  // Limit to specified count
  posts = posts.slice(0, count);

  return (
    <div className={`featured-posts featured-posts-${layout}`}>
      <h2 className="featured-posts-title">Featured Posts</h2>
      <div className="featured-posts-container">
        {posts.map(post => (
          <div className="featured-post" key={post.id}>
            {post.localCoverImage && (
              <div className="featured-post-image">
                <Link to={`/blog/${post.slug}`}>
                  <img 
                    src={post.localCoverImage} 
                    alt={post.coverImageAlt || post.title} 
                  />
                </Link>
              </div>
            )}
            <div className="featured-post-content">
              <h3>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="featured-post-description">{post.description}</p>
              <div className="featured-post-meta">
                {post.category && <span className="category">{post.category}</span>}
                {post.author && <span className="author">By {post.author}</span>}
                {post.publishedAt && (
                  <span className="date">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;
