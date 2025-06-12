import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import mdxComponents from "@/components/mdxComponents";
import { Layout } from "@/components/layout";
import { Helmet } from "react-helmet";

interface MdxPageData {
  mdx: {
    body: string;
    frontmatter: {
      title: string;
      description?: string;
      seoKeywords?: string | string[];
    };
  };
}

export const ContentPage: React.FC<PageProps<MdxPageData>> = ({ data }) => {
  const { body, frontmatter } = data.mdx;
  const { title, description, seoKeywords } = frontmatter;

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
      <Helmet>
        {title && <title>{title}</title>}
        {description && (
          <meta name="description" content={description} />
        )}
        {seoKeywords && (
          <meta
            name="keywords"
            content={Array.isArray(seoKeywords) ? seoKeywords.join(", ") : seoKeywords}
          />
        )}
      </Helmet>
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
        description
        seoKeywords
      }
    }
  }
`;

export { ContentPage as default };
