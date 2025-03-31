import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * This component exists solely to prevent Tailwind from purging 
 * classes that are used in MDX content or dynamically loaded components.
 * It's never actually rendered visibly in the UI.
 */
export function StyleSafelist() {
  // This component is never rendered visually
  return (
    <div className="hidden">
      {/* Layout classes */}
      <div className={cn(
        "container mx-auto px-4 sm:px-6 lg:px-8",
        "flex flex-col md:flex-row items-center justify-between",
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-6 gap-8",
        "max-w-5xl max-w-6xl max-w-7xl",
        "w-full min-h-screen"
      )}></div>

      {/* Typography classes */}
      <div className={cn(
        "text-sm text-base text-lg text-xl text-2xl text-3xl text-4xl text-5xl text-6xl",
        "font-normal font-medium font-semibold font-bold",
        "tracking-tighter tracking-tight tracking-normal",
        "text-center text-left text-right",
        "text-primary text-secondary text-muted-foreground text-primary-foreground"
      )}></div>

      {/* Spacing classes */}
      <div className={cn(
        "p-2 p-4 p-6 p-8 p-12",
        "px-2 px-4 px-6 px-8",
        "py-2 py-4 py-6 py-8 py-12 py-24 py-32 py-40",
        "m-2 m-4 m-6 m-8 m-12",
        "mt-2 mt-4 mt-6 mt-8 mt-10 mt-12",
        "mb-2 mb-4 mb-6 mb-8 mb-16"
      )}></div>

      {/* Utility classes */}
      <div className={cn(
        "rounded-md rounded-lg rounded-xl rounded-full",
        "border border-2 border-primary border-input",
        "bg-background bg-muted bg-primary bg-primary/10 bg-black",
        "shadow-sm shadow-md shadow-lg shadow-xl",
        "hover:underline hover:bg-primary/90",
        "underline-offset-4"
      )}></div>

      {/* Interactive element classes */}
      <div className={cn(
        "flex-shrink-0 overflow-hidden",
        "sticky relative absolute",
        "top-0 left-0 right-0 bottom-0",
        "z-[-1] z-10 z-50"
      )}></div>

      {/* Responsive classes */}
      <div className={cn(
        "hidden md:flex lg:flex",
        "md:grid-cols-2 lg:grid-cols-3",
        "flex-wrap flex-nowrap"
      )}></div>

      {/* Component-specific classes */}
      <div className={cn(
        "aspect-[4/3]",
        "backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "col-span-2 col-span-3",
        "h-6 h-8 h-10 h-12 h-16 h-20 h-40"
      )}></div>

      {/* MDX specific elements */}
      <div className={cn(
        // Headers
        "prose prose-lg prose-primary",
        "h1 h2 h3 h4 h5 h6",
        "heading-anchor",
        
        // Lists
        "ul ol li",
        "list-disc list-decimal",
        "marker:text-primary",
        
        // Code blocks
        "pre code",
        "language-javascript language-typescript language-tsx language-jsx language-css language-html",
        "syntax-highlighting",
        
        // Tables
        "table thead tbody tr td th",
        "border-collapse",
        
        // Quotes
        "blockquote",
        "border-l-4 border-primary pl-4 italic",
        
        // Links
        "a hover:text-primary hover:underline",
        
        // Images
        "img rounded-lg shadow-md",
        
        // Common MDX wrapper patterns
        "mdx-content mdx-wrapper mdx-container",
        "prose-container",
        "markdown-body"
      )}></div>
      
      {/* Common layout patterns in MDX */}
      <div className={cn(
        // Hero sections
        "hero hero-section bg-gradient-to-b from-background to-muted",
        
        // Feature sections
        "features-grid features-section",
        
        // Testimonials and cards
        "testimonial-card card-content card-body",
        
        // CTA sections
        "cta-section bg-primary text-primary-foreground"
      )}></div>
    </div>
  );
}
