import { MDXProvider } from "@mdx-js/react";
import { graphql, PageProps, HeadFC, Link } from "gatsby";
import {
    Package,
    GitBranch,
    Code,
    Database,
    Globe,
    Lock,
    Server,
    Settings,
    ShieldCheck,
    Zap,
    CheckCircle,
} from "lucide-react";
import React from "react";

import { Layout } from "../components/common/Layout";
import { CodeBlockSection } from "../components/landing/CodeBlockSection";
import { ContactSection } from "../components/landing/ContactSection";
import { CTASection } from "../components/landing/CTASection";
import { FeatureSection } from "../components/landing/FeatureSection";
import { HeroSection } from "../components/landing/HeroSection";
import { LandingFooter } from "../components/landing/LandingFooter";
import { LandingHeader } from "../components/landing/LandingHeader";
import { TabsComparisonSection } from "../components/landing/TabsComparisonSection";
import { TextWithIconsSection } from "../components/landing/TextWithIconsSection";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { icons } from "../utils/icons";

interface LandingPageData {
    onlineSalesLanding: {
        slug: string;
        title: string;
        description: string;
        body: string;
        seoKeywords?: string; // Make optional with ?
        seoImage?: string; // Make optional with ?
    };
}

// Define the Head component for SEO
export const Head: HeadFC<LandingPageData> = ({ data }) => {
    const { onlineSalesLanding } = data;

    return (
        <>
            <title>{onlineSalesLanding.title}</title>
            <meta name="description" content={onlineSalesLanding.description} />
            {onlineSalesLanding.seoKeywords && (
                <meta name="keywords" content={onlineSalesLanding.seoKeywords} />
            )}
            {onlineSalesLanding.seoImage && (
                <meta property="og:image" content={onlineSalesLanding.seoImage} />
            )}
        </>
    );
};

const LandingPageTemplate: React.FC<PageProps<LandingPageData>> = ({ data }) => {
    const { onlineSalesLanding } = data;

    // Filter out non-component functions from icons to ensure type compatibility
    const iconComponents = Object.entries(icons).reduce(
        (acc, [key, icon]) => {
            // Only include components that are valid React components
            // Most Lucide icons are ForwardRefExoticComponent,
            // so we'll use a simpler check to avoid type errors
            if (
                typeof icon === "function" &&
                key !== "createLucideIcon" &&
                // Most icons in Lucide are component functions with these properties
                "propTypes" in icon
            ) {
                acc[key] = icon as React.ComponentType<Record<string, unknown>>;
            }
            return acc;
        },
        {} as Record<string, React.ComponentType<Record<string, unknown>>>
    );

    // Define components that will be available in MDX
    const mdxComponents = {
        // Landing components
        LandingHeader,
        HeroSection,
        FeatureSection,
        TextWithIconsSection,
        TabsComparisonSection,
        CTASection,
        ContactSection,
        CodeBlockSection,
        LandingFooter,

        // UI components
        Button,
        Card,
        CardHeader,
        CardTitle,
        CardDescription,
        CardContent,
        Badge,

        // Gatsby components
        Link,

        // Wrapper for the main content
        main: (props: React.HTMLAttributes<HTMLElement>) => <main className="flex-1" {...props} />,

        // Explicitly include commonly used icon components
        Package,
        GitBranch,
        Code,
        Database,
        Globe,
        Lock,
        Server,
        Settings,
        ShieldCheck,
        Zap,
        CheckCircle,

        // Include other icon components from Lucide that pass our filter
        ...iconComponents,
    };

    // Check if the MDX content contains Header and Footer components
    // If it does, we'll hide the default ones from the Layout
    const containsCustomHeaderFooter =
        onlineSalesLanding.body.includes("<LandingHeader") ||
        onlineSalesLanding.body.includes("<LandingFooter");

    return (
        <Layout hideHeader={containsCustomHeaderFooter} hideFooter={containsCustomHeaderFooter}>
            <MDXProvider components={mdxComponents}>
                <div dangerouslySetInnerHTML={{ __html: onlineSalesLanding.body }} />
            </MDXProvider>
        </Layout>
    );
};

export default LandingPageTemplate;

export const query = graphql`
    query ($id: String!) {
        onlineSalesLanding(id: { eq: $id }) {
            slug
            title
            description
            body
        }
    }
`;
