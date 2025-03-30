import { MDXProvider } from "@mdx-js/react";
import { graphql, PageProps } from "gatsby";
import React from "react";

import Layout from "../components/Layout";
import mdxComponents from "../utils/mdxComponents";

interface PageNode {
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

interface HomePageQueryData {
    allOnlineSalesHome: {
        nodes: PageNode[];
    };
}

const HomePage: React.FC<PageProps<HomePageQueryData>> = ({ data }) => {
    // Find the home page content
    const homePage = data.allOnlineSalesHome.nodes.find(page => page.slug === "main");

    if (!homePage) {
        return (
            <Layout>
                <div>
                    <h1>Welcome to Our Website</h1>
                    <p>
                        Home page content not found. Please create a page with slug
                        &quot;home&quot;.
                    </p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="home-container">
                {homePage.localCoverImage && (
                    <div className="hero-image">
                        <img
                            src={homePage.localCoverImage}
                            alt={homePage.coverImageAlt || homePage.title}
                        />
                    </div>
                )}
                <h1 className="home-title">{homePage.title}</h1>
                <div className="home-content">
                    <MDXProvider components={mdxComponents}>
                        {/* In newer gatsby-plugin-mdx versions, we use the body directly */}
                        <div dangerouslySetInnerHTML={{ __html: homePage.body }} />
                    </MDXProvider>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;

export const query = graphql`
    query {
        allOnlineSalesHome {
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
