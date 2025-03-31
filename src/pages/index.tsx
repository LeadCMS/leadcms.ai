import { MDXProvider } from "@mdx-js/react";
import { graphql, PageProps } from "gatsby";
import React from "react";

import mdxComponents from "../utils/mdxComponents";

const HomePage: React.FC<PageProps<Queries.Query>> = ({ data }) => {
    // Find the home page content
    const homePage = data.allOnlineSalesHome.nodes.find((page: Queries.OnlineSalesHome) => page.slug === "main")!;

    return (
        <MDXProvider components={mdxComponents}>
            {homePage.body}
        </MDXProvider>
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
