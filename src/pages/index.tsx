import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import mdxComponents from "@/components/mdxComponents";
import { Layout } from "@/components/Layout";

interface HomePageData {
  content: {
    id: string;
    slug: string;
    childMdx: {
      body: string;
    };
  };
}

export const HomePage: React.FC<PageProps<HomePageData>> = ({ data }) => {
  const { content } = data;

  if (!content) {
    return (
      <Layout>
        <main className="flex-1">
          <div className="container py-12">
            <h1 className="text-3xl font-bold">Home page content not found</h1>
            <p>Please create a content entry with type "home" and slug "main".</p>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="flex-1">
        <MDXProvider components={mdxComponents}>
          <MDXRenderer>{content.childMdx.body}</MDXRenderer>
        </MDXProvider>
      </main>
    </Layout>
  );
};

export const query = graphql`
  query HomePageQuery {
    content: content(type: { eq: "home" }, slug: { eq: "main" }) {
      id
      slug
      childMdx {
        body
      }
    }
  }
`;

export { HomePage as default };
