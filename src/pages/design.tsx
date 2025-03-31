import * as React from "react";
import { MDXProvider } from "@mdx-js/react";
import { graphql, PageProps } from "gatsby";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
    CheckCircle,
    Code,
    Database,
    GitBranch,
    Globe,
    Lock,
    Package,
    Server,
    Settings,
    ShieldCheck,
    Zap,
} from "lucide-react";

import mdxComponents from "@/lib/utils/mdxComponents";

const DesignPage: React.FC<PageProps<Queries.Query>> = ({ data }) => {
    // Find the landing page content with slug "design"
    const landingPage = data.allOnlineSalesLanding.nodes.find(
        (page: Queries.OnlineSalesLanding) => page.slug === "design"
    )!;

    return (
        <MDXProvider
            components={{
                ...mdxComponents,
                Button,
                Link,
                Card,
                CardContent,
                CardDescription,
                CardHeader,
                CardTitle,
                Tabs,
                TabsContent,
                TabsList,
                TabsTrigger,
                Badge,
                CheckCircle,
                Code,
                Database,
                GitBranch,
                Globe,
                Lock,
                Package,
                Server,
                Settings,
                ShieldCheck,
                Zap,
            }}
        >
            {landingPage.body}
        </MDXProvider>
    );
};

export default DesignPage;

export const query = graphql`
    query {
        allOnlineSalesLanding {
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
                seoImage
                seoKeywords
            }
        }
    }
`;
