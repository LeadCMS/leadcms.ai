import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { Layout } from "@/components/layout";
import { Helmet } from "react-helmet";
import { DefaultLayout } from "@/components/default/defaultLayout";
import { LandingLayout } from "@/components/landing/landingLayout";

interface MdxPageData {
  mdx: {
    body: string;
    frontmatter: {
      title: string;
      description?: string;
      seoKeywords?: string | string[];
      type: string;
    };
  };
}

export const ContentPage: React.FC<PageProps<MdxPageData>> = ({ data }) => {
  const { body, frontmatter } = data.mdx;
  const { title, description, seoKeywords, type } = frontmatter;

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

  // Use LandingLayout for type "home" or "landing", otherwise DefaultLayout
  const LayoutComponent =
    type === "home" || type === "landing" ? LandingLayout : DefaultLayout;

  return (
    <>
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
      <LayoutComponent>{body}</LayoutComponent>
    </>
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
        type
      }
    }
  }
`;

export { ContentPage as default };
