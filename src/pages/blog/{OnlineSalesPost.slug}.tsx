import { MDXProvider } from "@mdx-js/react";
import { graphql, PageProps } from "gatsby";
import React from "react";

import Layout from "../../components/Layout";
import mdxComponents from "../../utils/mdxComponents";

interface PostData {
    onlineSalesPost: {
        title: string;
        description: string;
        body: string;
        localCoverImage?: string;
        coverImageAlt?: string;
        author?: string;
        category?: string;
        tags?: string[];
        publishedAt?: string;
        updatedAt?: string;
    };
}

const PostTemplate: React.FC<PageProps<PostData>> = ({ data }) => {
    const { onlineSalesPost } = data;

    return (
        <Layout>
            <article className="blog-post">
                {onlineSalesPost.localCoverImage && (
                    <div className="post-cover-image">
                        <img
                            src={onlineSalesPost.localCoverImage}
                            alt={onlineSalesPost.coverImageAlt || onlineSalesPost.title}
                        />
                    </div>
                )}
                <h1 className="post-title">{onlineSalesPost.title}</h1>
                <div className="post-meta">
                    {onlineSalesPost.category && (
                        <span className="category">{onlineSalesPost.category}</span>
                    )}
                    {onlineSalesPost.author && (
                        <span className="author">By {onlineSalesPost.author}</span>
                    )}
                    {onlineSalesPost.publishedAt && (
                        <span className="date">
                            Published: {new Date(onlineSalesPost.publishedAt).toLocaleDateString()}
                        </span>
                    )}
                </div>
                {onlineSalesPost.tags && onlineSalesPost.tags.length > 0 && (
                    <div className="post-tags">
                        {onlineSalesPost.tags.map(tag => (
                            <span className="tag" key={tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                <div className="post-description">{onlineSalesPost.description}</div>
                <div className="post-content">
                    <MDXProvider components={mdxComponents}>
                        <div dangerouslySetInnerHTML={{ __html: onlineSalesPost.body }} />
                    </MDXProvider>
                </div>
            </article>
        </Layout>
    );
};

export default PostTemplate;

export const query = graphql`
    query ($id: String!) {
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
