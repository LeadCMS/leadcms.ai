## General Setup

- Project uses **Gatsby v4**.
- Do not use any Gatsby v5+ features.
- Use **gatsby-plugin-mdx v3.20.0**.
- MDX transformation is done using `@mdx-js/mdx@1.6.22` and `@mdx-js/react@1.6.22`.
- React version is `18.2.0`.

This project uses TypeScript exclusively. GitHub Copilot must follow these standards:

### MDX Content Handling

- MDX content is fetched from a remote CMS and stored in custom Gatsby nodes.
- MDX string contains frontmatter and custom JSX components (e.g. `<Image />`, `<Tabs />`, etc.).
- Nodes must set `internal.mediaType = "text/markdown"` to trigger MDX transformation.
- Gatsby automatically creates `childMdx` under these nodes using `gatsby-plugin-mdx`.

### Images in MDX

- Images are remote and included either via markdown syntax (`![](url)`) or JSX (`<Image src="/api/media/..." />`).
- Use **`gatsby-remark-images-remote`** in `gatsby-plugin-mdx` options to handle markdown image optimization.

### Rendering MDX Pages

- MDX content is queried through GraphQL using `childMdx.body` and `childMdx.frontmatter`.
- Render content using `MDXProvider` and `MDXRenderer` from `gatsby-plugin-mdx`.

```jsx
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Image from "../components/Image";

const components = { Image };

<MDXProvider components={components}>
  <MDXRenderer>{body}</MDXRenderer>
</MDXProvider>
```

### File Extension Rules

- **Gatsby Config Files**: Always use `.ts` extension
  - `gatsby-node.ts`
  - `gatsby-config.ts`
  - `gatsby-browser.ts`
  - `gatsby-ssr.ts`

- **React Components**: Always use `.tsx` extension
  - UI components
  - Page components
  - Layout components

- **Utility/Helper Files**: Always use `.ts` extension

### Import Path Conventions

- Use path aliases with `@/` prefix for project imports
  ```typescript
  // Correct
  import { Button } from "@/components/ui/button";
  
  // Incorrect
  import { Button } from "../../components/ui/button";
  ```

### Project Structure

- UI components in `src/components/ui/`
- Utility functions in `src/lib/utils.ts`

### Styling

- Use Tailwind CSS for styling
- Follow shadcn/ui class naming conventions
- Use the `cn()` utility for conditional class names

## Forbidden Practices

- DO NOT create or suggest JavaScript files (`.js` or `.jsx`)
- DO NOT modify webpack configuration directly (use gatsby-node.ts)
- DO NOT use default exports for components (use named exports)
- DO NOT use inline styles (use Tailwind classes)

## When Suggesting Code

- Always follow TypeScript best practices
- Include proper type definitions
- Use existing project patterns as reference
- Maintain consistent code style with existing files

# Copilot Instructions for Gatsby Project with Remote MDX Content

These instructions help GitHub Copilot generate consistent and functional code for this Gatsby project. This project uses **Gatsby v4.25.9** and **gatsby-plugin-mdx v3.20.0**, with MDX content sourced remotely and images processed via `gatsby-remark-images-remote`. The site uses TailwindCSS and Radix UI.

## Styling and UI

- Use **TailwindCSS** and **tailwindcss-animate** for styles.
- Use **clsx** and **class-variance-authority** for dynamic class generation.
- Use **Radix UI components** (e.g. `@radix-ui/react-tabs`) for layout and interactive elements.

## Summary for Copilot

When generating code:
- Assume **Gatsby v4** and **gatsby-plugin-mdx v3.20.0**.
- MDX content is remote, passed through `gatsby-plugin-mdx`, and rendered using `MDXRenderer`.
- Remote images must be optimized using `gatsby-remark-images-remote`.
- Custom JSX components (like `<Image />`) are defined at the site level and mapped via `MDXProvider`.
- Use TailwindCSS utility classes and Radix UI components where needed.
- Avoid using `gatsby-mdx-remote`, `StaticImage`, or Gatsby v5 features.

