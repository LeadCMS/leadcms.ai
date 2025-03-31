import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import mdxComponents from "@/components/mdxComponents";
import { Layout } from "@/components/layout";

interface ContentPageData {
  content: {
    id: string;
    slug: string;
    childMdx: {
      body: string;
    };
  };
}

export const ContentPage: React.FC<PageProps<ContentPageData>> = ({ data }) => {
  const { content } = data;

  if (!content) {
    return (
      <Layout>
        <main className="flex-1">
          <div className="container py-12">
            <h1 className="text-3xl font-bold">Content not found</h1>
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
  query ContentPageQuery($slug: String!) {
    content: content(slug: { eq: $slug }) {
      id
      slug
      childMdx {
        body
      }
    }
  }
`;

export { ContentPage as default };
