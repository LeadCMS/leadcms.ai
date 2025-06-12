import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import mdxComponents from "@/components/mdxComponents";
import { Layout } from "@/layout";

interface MdxPageData {
  mdx: {
    body: string;
    frontmatter: {
      title: string;
    };
  };
}

export const ContentPage: React.FC<PageProps<MdxPageData>> = ({ data }) => {
  const { body, frontmatter } = data.mdx;

  if (!body) {
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
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </main>
    </Layout>
  );
};

export const query = graphql`
  query MdxPage($slug: String!) {
    mdx(slug: { eq: $slug }) {
      body
      frontmatter {
        title
      }
    }
  }
`;

export { ContentPage as default };
