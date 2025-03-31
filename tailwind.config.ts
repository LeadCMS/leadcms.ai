import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{ts,tsx,mdx}",
        "./src/components/**/*.{ts,tsx,mdx}",
        "./src/templates/**/*.{ts,tsx,mdx}",
        // Ensure content from remote MDX is included
        "./content/**/*.mdx",
        // Consider cached remote content if stored locally
        "./public/mdx-cache/**/*.mdx",
        // Cache directory for gatsby-source-filesystem if used
        "./.cache/**/*.mdx",
        "./gatsby-browser.ts",
        "./gatsby-ssr.ts",
    ],
    extract: {
        mdx: (content) => {
            // This pattern captures most Tailwind class patterns including dynamic ones
            const classesPattern = /(?:className|class)=["']([^"']*)["']/g;
            const matches = [...content.matchAll(classesPattern)];
            return matches.map(match => match[1]).join(' ').split(/\s+/);
        }
    },
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    "1": "hsl(var(--chart-1))",
                    "2": "hsl(var(--chart-2))",
                    "3": "hsl(var(--chart-3))",
                    "4": "hsl(var(--chart-4))",
                    "5": "hsl(var(--chart-5))",
                },
                sidebar: {
                    DEFAULT: "hsl(var(--sidebar-background))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
                    accent: "hsl(var(--sidebar-accent))",
                    "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
                    border: "hsl(var(--sidebar-border))",
                    ring: "hsl(var(--sidebar-ring))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: {
                        height: "0",
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)",
                    },
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)",
                    },
                    to: {
                        height: "0",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
    safelist: [
        // Basic layout and positioning
        'container', 'mx-auto', 'flex', 'flex-col', 'flex-row', 'grid', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3',
        'gap-4', 'gap-6', 'gap-8', 'my-4', 'my-6', 'my-8', 'py-4', 'py-6', 'py-8', 'px-4', 'px-6', 'px-8',
        
        // Typography
        'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl',
        'font-normal', 'font-medium', 'font-semibold', 'font-bold',
        'text-primary', 'text-secondary', 'text-muted-foreground', 'text-primary-foreground',
        
        // Backgrounds and borders
        'bg-primary', 'bg-secondary', 'bg-muted', 'bg-background',
        'border', 'border-primary', 'border-muted',
        'rounded-md', 'rounded-lg', 'rounded-xl',
        
        // Effects
        'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl',
        
        // Interactive elements
        'hover:bg-primary/90', 'hover:underline', 'underline-offset-4'
    ]
};

export default config;
