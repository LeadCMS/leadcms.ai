import { MDXProvider } from "@mdx-js/react";
import { graphql, PageProps } from "gatsby";
import React from "react";

import Layout from "../components/Layout";
import mdxComponents from "../utils/mdxComponents";

const HomePage: React.FC<PageProps<Queries.Query>> = ({ data }) => {
    // Find the home page content
    const homePage = data.allOnlineSalesHome.nodes.find((page: Queries.OnlineSalesHome) => page.slug === "main")!;

    return (
        <Layout>
            <MDXProvider components={mdxComponents}>
                {homePage.body}
            </MDXProvider>
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
