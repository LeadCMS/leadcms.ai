import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import mdxComponents from "@/components/mdxComponents";
import { Layout } from "@/components/layout";

export const DefaultLayout = ({ children }: { children: string }) => {

  return (
    <Layout>
      <main className="flex-1">
        <MDXProvider components={mdxComponents}>
          <MDXRenderer>{children}</MDXRenderer>
        </MDXProvider>
      </main>
    </Layout>
  );
};

export { DefaultLayout as default };
