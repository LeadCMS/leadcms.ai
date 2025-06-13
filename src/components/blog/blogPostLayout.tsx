import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import mdxComponents from "@/components/mdxComponents";
import { Layout } from "@/components/layout";

export interface BlogPostLayoutProps {
  children: string;
  frontmatter: {
    title?: string;
    description?: string;
    tags?: string[];
    author?: string;
    publishedAt?: string;
    coverImageUrl?: string;
    coverImageAlt?: string;
    [key: string]: any;
  };
}

export const BlogPostLayout: React.FC<BlogPostLayoutProps> = ({
  children,
  frontmatter,
}) => {
  const { title, description, tags, author, publishedAt, coverImageUrl, coverImageAlt } = frontmatter;
  return (
    <Layout>
      <section className="w-full bg-background border-b border-muted/60">
        <div className="max-w-3xl mx-auto px-4 md:px-0 pt-12 md:pt-20 lg:pt-24 pb-8 md:pb-12 flex flex-col gap-6">
          {coverImageUrl && (
            <img 
              src={coverImageUrl}
              alt={coverImageAlt || title || "Blog post cover image"} 
              className="w-full h-auto rounded-lg object-cover aspect-video"
            />
          )}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2 mb-2">
              {tags?.map((tag) => (
                <span key={tag} className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary mb-2">{title}</h1>
            {description && <p className="text-lg text-muted-foreground mb-2">{description}</p>}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {author && <span>By <span className="font-semibold text-foreground">{author}</span></span>}
              {publishedAt && <span className="opacity-70">{publishedAt}</span>}
            </div>
          </div>
        </div>
      </section>
      <main className="flex-1 flex justify-center px-4 md:px-0">
        <article
          className="prose prose-lg dark:prose-invert w-full max-w-3xl pt-8 md:pt-12 pb-4 md:pb-6 lg:pb-8 mx-auto"
        >
          <MDXProvider components={mdxComponents}>
            <MDXRenderer>{children}</MDXRenderer>
          </MDXProvider>
        </article>
      </main>
    </Layout>
  );
};

export { BlogPostLayout as default };
