import { useStaticQuery, graphql, Link } from "gatsby";
import React, { useState } from "react";

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

interface BlogPostQueryData {
    allOnlineSalesPost: {
        nodes: BlogPost[];
    };
}

interface BlogPostListProps {
    postsPerPage?: number;
    showPagination?: boolean;
    showImage?: boolean;
    showExcerpt?: boolean;
    showAuthor?: boolean;
    showDate?: boolean;
    showCategory?: boolean;
    showTags?: boolean;
}

const BlogPostList: React.FC<BlogPostListProps> = ({
    postsPerPage = 5,
    showPagination = true,
    showImage = true,
    showExcerpt = true,
    showAuthor = true,
    showDate = true,
    showCategory = true,
    showTags = true,
}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const data = useStaticQuery<BlogPostQueryData>(graphql`
        query {
            allOnlineSalesPost(sort: { publishedAt: DESC }, filter: { publishedAt: { ne: null } }) {
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

    const posts = data.allOnlineSalesPost.nodes;
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = posts.slice(startIndex, endIndex);

    const handlePageChange = (newPage: number): void => {
        setCurrentPage(newPage);
        // Scroll to top when page changes
        window.scrollTo(0, 0);
    };

    return (
        <div className="blog-post-list">
            {currentPosts.map(post => (
                <div className="blog-post-item" key={post.id}>
                    {showImage && post.localCoverImage && (
                        <div className="post-image">
                            <Link to={`/blog/${post.slug}`}>
                                <img
                                    src={post.localCoverImage}
                                    alt={post.coverImageAlt || post.title}
                                />
                            </Link>
                        </div>
                    )}
                    <div className="post-content">
                        <h2>
                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </h2>

                        <div className="post-meta">
                            {showCategory && post.category && (
                                <span className="category">{post.category}</span>
                            )}
                            {showAuthor && post.author && (
                                <span className="author">By {post.author}</span>
                            )}
                            {showDate && post.publishedAt && (
                                <span className="date">
                                    {new Date(post.publishedAt).toLocaleDateString()}
                                </span>
                            )}
                        </div>

                        {showExcerpt && <p className="description">{post.description}</p>}

                        {showTags && post.tags && post.tags.length > 0 && (
                            <div className="post-tags">
                                {post.tags.map(tag => (
                                    <span className="tag" key={tag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <Link to={`/blog/${post.slug}`} className="read-more">
                            Read more
                        </Link>
                    </div>
                </div>
            ))}

            {showPagination && totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="prev-page"
                    >
                        Previous
                    </button>

                    <div className="page-numbers">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={pageNum === currentPage ? "active" : ""}
                            >
                                {pageNum}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="next-page"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default BlogPostList;
