import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  children?: React.ReactNode;
}

export const Head = ({ title, description, image, article = false }: SeoProps) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          defaultTitle: title
          defaultDescription: title
          siteUrl: siteUrl
        }
      }
    }
  `);

  const { defaultTitle, defaultDescription, siteUrl } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: image ? `${siteUrl}${image}` : null,
    url: siteUrl,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.image && <meta name="image" content={seo.image} />}

      {article && <meta property="og:type" content="article" />}
      {!article && <meta property="og:type" content="website" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && <meta property="og:description" content={seo.description} />}
      {seo.image && <meta property="og:image" content={seo.image} />}
      {seo.url && <meta property="og:url" content={seo.url} />}

      <meta name="twitter:card" content="summary_large_image" />
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && <meta name="twitter:description" content={seo.description} />}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </>
  );
};
