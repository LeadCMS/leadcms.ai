import matter from "gray-matter";

/**
 * Result of frontmatter extraction
 */
interface FrontmatterResult {
  frontmatter: Record<string, any>;
  content: string;
  rawFrontmatter: string | null;
}

/**
 * Extract frontmatter from MDX content
 * 
 * @param content MDX content potentially containing frontmatter
 * @returns Extracted frontmatter and cleaned content
 */
export function extractFrontmatter(content: string): FrontmatterResult | null {
  try {
    // Check if content appears to have frontmatter
    if (!content.trim().startsWith('---')) {
      return null;
    }

    const { data, content: cleanContent, matter: rawFrontmatter } = matter(content);
    
    // Only return parsed data if frontmatter was actually found
    if (Object.keys(data).length === 0) {
      return null;
    }

    return {
      frontmatter: data,
      content: cleanContent,
      rawFrontmatter: rawFrontmatter || null,
    };
  } catch (error) {
    console.warn('Error parsing frontmatter:', error);
    return null;
  }
}
