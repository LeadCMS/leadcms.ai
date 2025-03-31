# OnlineSales.tech Gatsby Project Coding Standards

## TypeScript Requirements

This project uses TypeScript exclusively. GitHub Copilot must follow these standards:

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
