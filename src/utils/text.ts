/**
 * Utility to strip Markdown syntax, headings, and formatting symbols
 * from text for clean card summaries, snippets, and SEO meta descriptions.
 */
export function stripMarkdown(markdown: string | undefined | null): string {
  if (!markdown) return "";

  let text = markdown;

  // 1. Remove custom section prefixes like "1! CareerCafe 1! Overview" or "1! Something"
  text = text.replace(/\b\d+!\s*/g, "");

  // 2. Remove code blocks (```code```)
  text = text.replace(/```[\s\S]*?```/g, "");

  // 3. Remove inline code (`code`)
  text = text.replace(/`([^`]+)`/g, "$1");

  // 4. Remove images (![alt](url))
  text = text.replace(/!\[([^\]]*)\]\([^)]*\)/g, "");

  // 5. Replace links [text](url) with just text
  text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");

  // 6. Remove headers (# Header, ## Subheader, etc.)
  text = text.replace(/^#{1,6}\s+/gm, "");

  // 7. Remove bold and italics (**bold**, __bold__, *italic*, _italic_)
  text = text.replace(/(\*\*|__)(.*?)\1/g, "$2");
  text = text.replace(/(\*|_)(.*?)\1/g, "$2");

  // 8. Remove strikethrough (~~text~~)
  text = text.replace(/~~(.*?)~~/g, "$1");

  // 9. Remove blockquotes (> quote)
  text = text.replace(/^\s*>\s+/gm, "");

  // 10. Remove list bullets (- item, * item, + item, 1. item)
  text = text.replace(/^\s*[-*+]\s+/gm, "");
  text = text.replace(/^\s*\d+\.\s+/gm, "");

  // 11. Remove horizontal rules (---, ***, ___)
  text = text.replace(/^\s*[-*_]{3,}\s*$/gm, "");

  // 12. Collapse multiple whitespace and newlines into single spaces
  text = text.replace(/\s+/g, " ").trim();

  return text;
}
