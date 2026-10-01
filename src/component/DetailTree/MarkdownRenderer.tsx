"use client";

import { Check, Copy, ExternalLink } from "lucide-react";
import { type ReactNode, useState } from "react";

interface MarkdownRendererProps {
  content: string;
  showLineNumbers?: boolean;
  startLineNumber?: number;
}

/**
 * Parses inline markdown: bold, italic, inline code, and links
 */
function parseInlineMarkdown(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  // Matches **bold**, `code`, [label](url), *italic*
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null = regex.exec(text);

  while (match !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(
        <strong
          key={`b-${match.index}`}
          className="text-[#f3ebdd] font-semibold"
        >
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (
      token.startsWith("*") &&
      token.endsWith("*") &&
      !token.startsWith("**")
    ) {
      parts.push(
        <em key={`i-${match.index}`} className="italic text-[#d9a55b]">
          {token.slice(1, -1)}
        </em>,
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <code
          key={`c-${match.index}`}
          className="px-1.5 py-0.5 rounded bg-[#1e1a16] text-[#d9a55b] font-mono text-xs border border-[#2f2923]"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("[") && token.includes("](")) {
      const linkMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        parts.push(
          <a
            key={`a-${match.index}`}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#d9a55b] hover:text-[#e6b56c] underline underline-offset-2 transition-colors inline-flex items-center gap-1 font-medium"
          >
            <span>{linkMatch[1]}</span>
            <ExternalLink className="w-3 h-3 inline" />
          </a>,
        );
      }
    }
    lastIndex = regex.lastIndex;
    match = regex.exec(text);
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export function MarkdownRenderer({
  content,
  showLineNumbers = false,
  startLineNumber = 1,
}: MarkdownRendererProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  // Clean frontmatter if present
  const cleanContent = content.replace(/^---[\s\S]*?---\n*/, "");
  const lines = cleanContent.split("\n");

  const renderedBlocks: ReactNode[] = [];
  let inCodeBlock = false;
  let codeLanguage = "";
  let codeBuffer: string[] = [];
  let currentLine = startLineNumber;
  let blockKey = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        const codeString = codeBuffer.join("\n");
        const keyId = `code-block-${blockKey++}`;
        const startCodeLine = currentLine;
        currentLine += codeBuffer.length + 2;

        renderedBlocks.push(
          <div
            key={keyId}
            className="my-5 rounded-xl overflow-hidden border border-[#2f2923] bg-[#120f0d] font-mono text-xs shadow-xl"
          >
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#161311] border-b border-[#2f2923]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]/70" />
                <span className="ml-2 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#d9a55b]">
                  {codeLanguage || "shell"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(codeString, keyId)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1e1a16] hover:bg-[#27221c] border border-[#2f2923] text-[#8e8374] hover:text-[#f3ebdd] transition-colors cursor-pointer text-[11px]"
                title="Copy code"
              >
                {copiedKey === keyId ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#8e8374]" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            {/* Code Body with line numbers */}
            <div className="p-4 overflow-x-auto text-[#f3ebdd] leading-relaxed flex">
              {showLineNumbers && (
                <div className="select-none pr-4 text-right text-[#413930] font-mono text-xs border-r border-[#2f2923]/60 mr-4 shrink-0">
                  {Array.from(
                    { length: codeBuffer.length },
                    (_, k) => startCodeLine + k + 1,
                  ).map((lineNum) => (
                    <div key={`ln-${lineNum}`}>{lineNum}</div>
                  ))}
                </div>
              )}
              <pre className="flex-1 font-mono text-xs text-[#b9ae9d] overflow-x-auto">
                <code>{codeString}</code>
              </pre>
            </div>
          </div>,
        );
        codeBuffer = [];
        inCodeBlock = false;
        codeLanguage = "";
      } else {
        inCodeBlock = true;
        codeLanguage = line.replace("```", "").trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Markdown Table
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const tableLines: string[] = [line];
      let j = i + 1;
      while (
        j < lines.length &&
        lines[j].trim().startsWith("|") &&
        lines[j].trim().endsWith("|")
      ) {
        tableLines.push(lines[j]);
        j++;
      }
      i = j - 1;

      if (tableLines.length >= 2) {
        const headerRow = tableLines[0]
          .split("|")
          .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
          .map((c) => c.trim());
        const dataRows = tableLines.slice(2).map((row) =>
          row
            .split("|")
            .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
            .map((c) => c.trim()),
        );

        const tableKey = `table-${blockKey++}`;
        currentLine += tableLines.length;

        renderedBlocks.push(
          <div
            key={tableKey}
            className="my-5 overflow-x-auto rounded-xl border border-[#2f2923] bg-[#120f0d]"
          >
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#2f2923] bg-[#161311]">
                  {headerRow.map((head) => (
                    <th
                      key={`th-${head}`}
                      className="px-4 py-2.5 font-semibold text-[#d9a55b] font-mono uppercase tracking-wider text-[11px]"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2f2923]/60">
                {dataRows.map((row) => (
                  <tr
                    key={`tr-${row.join("|")}`}
                    className="hover:bg-[#161311]/40 transition-colors"
                  >
                    {row.map((cell) => (
                      <td
                        key={`td-${cell}`}
                        className="px-4 py-2.5 text-[#b9ae9d]"
                      >
                        {parseInlineMarkdown(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
        );
        continue;
      }
    }

    const trimmed = line.trim();
    const lineNum = currentLine++;

    // Headings
    if (trimmed.startsWith("### ")) {
      renderedBlocks.push(
        <div key={`h3-${blockKey++}`} className="flex items-baseline mt-6 mb-2">
          {showLineNumbers && (
            <span className="w-8 shrink-0 text-right pr-4 text-[11px] font-mono text-[#413930] select-none">
              {lineNum}
            </span>
          )}
          <h3 className="text-base sm:text-lg font-semibold text-[#f3ebdd] font-heading flex-1">
            {parseInlineMarkdown(trimmed.replace(/^###\s+/, ""))}
          </h3>
        </div>,
      );
      continue;
    }

    if (trimmed.startsWith("## ")) {
      renderedBlocks.push(
        <div
          key={`h2-${blockKey++}`}
          className="flex items-baseline mt-8 mb-3 pb-1 border-b border-[#2f2923]"
        >
          {showLineNumbers && (
            <span className="w-8 shrink-0 text-right pr-4 text-[11px] font-mono text-[#413930] select-none">
              {lineNum}
            </span>
          )}
          <h2 className="text-lg sm:text-xl font-normal text-[#f3ebdd] font-heading flex-1">
            {parseInlineMarkdown(trimmed.replace(/^##\s+/, ""))}
          </h2>
        </div>,
      );
      continue;
    }

    if (trimmed.startsWith("# ")) {
      renderedBlocks.push(
        <div
          key={`h1-${blockKey++}`}
          className="flex items-baseline mt-4 mb-4 pb-2 border-b border-[#2f2923]"
        >
          {showLineNumbers && (
            <span className="w-8 shrink-0 text-right pr-4 text-[11px] font-mono text-[#413930] select-none">
              {lineNum}
            </span>
          )}
          <h1 className="text-xl sm:text-2xl font-normal text-[#f3ebdd] font-heading flex-1">
            {parseInlineMarkdown(trimmed.replace(/^#\s+/, ""))}
          </h1>
        </div>,
      );
      continue;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      renderedBlocks.push(
        <div key={`bq-${blockKey++}`} className="flex items-baseline my-3">
          {showLineNumbers && (
            <span className="w-8 shrink-0 text-right pr-4 text-[11px] font-mono text-[#413930] select-none">
              {lineNum}
            </span>
          )}
          <blockquote className="border-l-2 border-[#d9a55b] pl-3 py-0.5 text-xs text-[#b9ae9d] italic bg-[#161311]/40 rounded-r flex-1">
            {parseInlineMarkdown(trimmed.replace(/^>\s+/, ""))}
          </blockquote>
        </div>,
      );
      continue;
    }

    // Unordered List
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      renderedBlocks.push(
        <div key={`ul-${blockKey++}`} className="flex items-start my-1 text-sm">
          {showLineNumbers && (
            <span className="w-8 shrink-0 text-right pr-4 text-[11px] font-mono text-[#413930] select-none mt-0.5">
              {lineNum}
            </span>
          )}
          <div className="flex items-start gap-2.5 flex-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d9a55b] mt-[5px] shrink-0" />
            <span className="text-[#b9ae9d] leading-relaxed">
              {parseInlineMarkdown(trimmed.replace(/^[-*]\s+/, ""))}
            </span>
          </div>
        </div>,
      );
      continue;
    }

    // Numbered List
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      renderedBlocks.push(
        <div key={`ol-${blockKey++}`} className="flex items-start my-1 text-sm">
          {showLineNumbers && (
            <span className="w-8 shrink-0 text-right pr-4 text-[11px] font-mono text-[#413930] select-none mt-0.5">
              {lineNum}
            </span>
          )}
          <div className="flex items-start gap-2 flex-1">
            <span className="font-mono text-xs font-semibold text-[#d9a55b] min-w-4 mt-0.5">
              {numMatch[1]}.
            </span>
            <span className="text-[#b9ae9d] leading-relaxed">
              {parseInlineMarkdown(numMatch[2])}
            </span>
          </div>
        </div>,
      );
      continue;
    }

    // Empty line
    if (!trimmed) {
      renderedBlocks.push(
        <div key={`empty-${blockKey++}`} className="h-4 flex items-center">
          {showLineNumbers && (
            <span className="w-8 shrink-0 text-right pr-4 text-[11px] font-mono text-[#413930] select-none">
              {lineNum}
            </span>
          )}
        </div>,
      );
      continue;
    }

    // Standard Paragraph
    renderedBlocks.push(
      <div
        key={`p-${blockKey++}`}
        className="flex items-baseline my-1.5 text-sm"
      >
        {showLineNumbers && (
          <span className="w-8 shrink-0 text-right pr-4 text-[11px] font-mono text-[#413930] select-none">
            {lineNum}
          </span>
        )}
        <p className="text-[#b9ae9d] leading-relaxed flex-1">
          {parseInlineMarkdown(trimmed)}
        </p>
      </div>,
    );
  }

  return <div className="space-y-0.5 font-sans">{renderedBlocks}</div>;
}
