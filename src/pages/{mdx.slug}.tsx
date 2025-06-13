import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { Layout } from "@/components/layout";
import { Helmet } from "react-helmet";
import { DefaultLayout } from "@/components/default/defaultLayout";
import { LandingLayout } from "@/components/landing/landingLayout";
import { BlogPostLayout } from "@/components/blog/blogPostLayout";

interface MdxPageData {
  mdx: {
    body: string;
    timeToRead: number;
    frontmatter: {
      title: string;
      description?: string;
      seoKeywords?: string | string[];
      type: string;
      tags?: string[];
      author?: string;
      publishedAt?: string;
      coverImageUrl?: string;
      coverImageAlt?: string;
      [key: string]: any;
    };
  };
}

export const ContentPage: React.FC<PageProps<MdxPageData>> = ({ data }) => {
  const { body, timeToRead, frontmatter } = data.mdx;
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

  // Use LandingLayout for type "home" or "landing", BlogPostLayout for "blog-post", otherwise DefaultLayout
  const LayoutComponent =
    type === "home" || type === "landing"
      ? LandingLayout
      : type === "blog-post"
      ? BlogPostLayout
      : DefaultLayout;

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
      <LayoutComponent
        frontmatter={frontmatter}
        timeToRead={timeToRead}
      >
        {body}
      </LayoutComponent>
    </>
  );
};

export const query = graphql`
  query MdxPage($slug: String!) {
    mdx(slug: { eq: $slug }) {
      body
      timeToRead
      frontmatter {
        title
        description
        seoKeywords
        type
        tags
        author
        publishedAt(formatString: "YYYY-MM-DD")
        coverImageUrl
        coverImageAlt
      }
    }
  }
`;

export { ContentPage as default };
