"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  Check,
  Copy,
  ExternalLink,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { GitHubIcon } from "@/component/Icons";
import { AgentSkillCard } from "@/component/Skills/AgentSkillCard";
import type { AgentSkill } from "@/lib/agentSkills";

interface SkillDetailViewProps {
  skill: AgentSkill;
  markdown: string;
  relatedSkills?: AgentSkill[];
}

function parseInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
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
    } else if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <code
          key={`c-${match.index}`}
          className="px-1.5 py-0.5 rounded bg-[#1e1a16] text-[#d9a55b] font-mono text-[11px] border border-[#2f2923]"
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
            className="text-[#d9a55b] hover:text-[#e6b56c] underline underline-offset-2 transition-colors inline-flex items-center gap-0.5"
          >
            <span>{linkMatch[1]}</span>
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

export function SkillDetailView({
  skill,
  markdown,
  relatedSkills = [],
}: SkillDetailViewProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const cliPullCommand = `skills-sync pull ${skill.name}`;

  // Advanced runbook markdown parser
  const renderMarkdown = (rawMd: string) => {
    // Strip YAML frontmatter
    const cleanMd = rawMd.replace(/^---[\s\S]*?---\n*/, "");
    const lines = cleanMd.split("\n");

    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeLanguage = "";
    let codeBuffer: string[] = [];
    let keyIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code blocks
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          const codeString = codeBuffer.join("\n");
          const blockId = `code-block-${keyIndex++}`;
          elements.push(
            <div
              key={blockId}
              className="my-5 rounded-2xl overflow-hidden border border-[#2f2923] bg-[#0e0c0a] font-mono text-xs shadow-xl"
            >
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#161311] border-b border-[#2f2923]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80" />
                  <span className="ml-2 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#d9a55b]">
                    {codeLanguage || "bash"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(codeString, blockId)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1e1a16] hover:bg-[#27221c] border border-[#2f2923] text-[#b9ae9d] hover:text-[#f3ebdd] transition-colors cursor-pointer text-[11px]"
                  title="Copy code block"
                >
                  {copiedKey === blockId ? (
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
              <pre className="p-4 sm:p-5 overflow-x-auto text-[#f3ebdd] leading-relaxed select-all">
                <code>{codeString}</code>
              </pre>
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

      // Markdown Tables
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
          const splitRow = (r: string) =>
            r
              .split("|")
              .slice(1, -1)
              .map((c) => c.trim());

          const headerCols = splitRow(tableLines[0]);
          const bodyRows = tableLines.slice(2).map(splitRow);

          elements.push(
            <div
              key={`table-${keyIndex++}`}
              className="my-6 overflow-x-auto rounded-xl border border-[#2f2923] bg-[#161311] shadow-lg"
            >
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1e1a16] border-b border-[#2f2923]">
                    {headerCols.map((col) => (
                      <th
                        key={`th-${col}`}
                        className="px-4 py-2.5 text-xs font-mono font-semibold text-[#d9a55b] uppercase tracking-wider"
                      >
                        {parseInlineMarkdown(col)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2f2923]/60">
                  {bodyRows.map((row) => {
                    const rowKey = `tr-${row.join("::")}`;
                    return (
                      <tr
                        key={rowKey}
                        className="hover:bg-[#1e1a16]/50 transition-colors"
                      >
                        {row.map((cell) => (
                          <td
                            key={`${rowKey}-td-${cell}`}
                            className="px-4 py-2 text-xs text-[#b9ae9d] leading-relaxed"
                          >
                            {parseInlineMarkdown(cell)}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>,
          );
          continue;
        }
      }

      // GitHub alerts: > [!IMPORTANT], > [!WARNING], > [!NOTE], > [!TIP], > [!CAUTION]
      if (line.startsWith("> [!")) {
        const alertType = line.match(/> \[!([A-Z]+)\]/)?.[1] || "NOTE";
        const alertContent: string[] = [];
        let j = i + 1;
        while (j < lines.length && lines[j].startsWith(">")) {
          alertContent.push(lines[j].replace(/^>\s?/, ""));
          j++;
        }
        i = j - 1;

        let alertBorder =
          "border-l-emerald-500 bg-emerald-500/10 text-emerald-400";
        if (alertType === "IMPORTANT") {
          alertBorder = "border-l-[#d9a55b] bg-[#d9a55b]/10 text-[#d9a55b]";
        } else if (alertType === "WARNING" || alertType === "CAUTION") {
          alertBorder = "border-l-amber-500 bg-amber-500/10 text-amber-400";
        }

        elements.push(
          <div
            key={`alert-${keyIndex++}`}
            className={`my-5 p-4 sm:p-5 rounded-r-2xl border-l-4 border border-y-0 border-r-0 ${alertBorder}`}
          >
            <span className="font-mono font-bold tracking-wider uppercase text-xs block mb-1.5">
              {alertType}
            </span>
            <div className="text-xs sm:text-sm text-[#f3ebdd] leading-relaxed">
              {parseInlineMarkdown(alertContent.join(" "))}
            </div>
          </div>,
        );
        continue;
      }

      // Headings
      if (line.startsWith("# ")) {
        elements.push(
          <h1
            key={`h1-${keyIndex++}`}
            className="text-2xl sm:text-3xl font-bold font-heading text-[#f3ebdd] mt-8 mb-4 tracking-tight"
          >
            {parseInlineMarkdown(line.replace("# ", ""))}
          </h1>,
        );
        continue;
      }

      if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={`h2-${keyIndex++}`}
            className="text-xl sm:text-2xl font-bold font-heading text-[#f3ebdd] mt-9 mb-3.5 border-b border-[#2f2923] pb-2.5 flex items-center gap-2"
          >
            <span className="w-1.5 h-5 rounded-full bg-[#d9a55b] inline-block shrink-0" />
            <span>{parseInlineMarkdown(line.replace("## ", ""))}</span>
          </h2>,
        );
        continue;
      }

      if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={`h3-${keyIndex++}`}
            className="text-base sm:text-lg font-bold text-[#d9a55b] mt-7 mb-2 tracking-tight"
          >
            {parseInlineMarkdown(line.replace("### ", ""))}
          </h3>,
        );
        continue;
      }

      if (line.startsWith("#### ")) {
        elements.push(
          <h4
            key={`h4-${keyIndex++}`}
            className="text-sm sm:text-base font-bold text-[#f3ebdd] mt-5 mb-1.5"
          >
            {parseInlineMarkdown(line.replace("#### ", ""))}
          </h4>,
        );
        continue;
      }

      // Horizontal rules
      if (line.trim() === "---") {
        elements.push(
          <hr key={`hr-${keyIndex++}`} className="my-7 border-[#2f2923]" />,
        );
        continue;
      }

      // Bullet lists
      if (line.startsWith("- ") || line.startsWith("* ")) {
        elements.push(
          <li
            key={`li-${keyIndex++}`}
            className="ml-5 list-disc text-xs sm:text-sm text-[#b9ae9d] my-1.5 leading-relaxed"
          >
            {parseInlineMarkdown(line.replace(/^[-*]\s+/, ""))}
          </li>,
        );
        continue;
      }

      // Numbered lists
      if (/^\d+\.\s+/.test(line)) {
        elements.push(
          <li
            key={`oli-${keyIndex++}`}
            className="ml-5 list-decimal text-xs sm:text-sm text-[#b9ae9d] my-1.5 leading-relaxed"
          >
            {parseInlineMarkdown(line.replace(/^\d+\.\s+/, ""))}
          </li>,
        );
        continue;
      }

      // Paragraphs
      if (line.trim()) {
        elements.push(
          <p
            key={`p-${keyIndex++}`}
            className="text-xs sm:text-sm text-[#b9ae9d] my-3.5 leading-relaxed"
          >
            {parseInlineMarkdown(line)}
          </p>,
        );
      }
    }

    return elements;
  };

  return (
    <div className="w-full relative z-10">
      {/* Back Navigation & Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Link
          href="/skills"
          className="inline-flex items-center gap-1.5 text-xs text-[#8e8374] hover:text-[#d9a55b] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Agent Skills Catalog</span>
        </Link>
        <span className="text-[#413930]">/</span>
        <span className="text-xs text-[#d9a55b] font-mono">{skill.name}</span>
      </div>

      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#161311] border border-[#2f2923] mb-8 shadow-xl relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#d9a55b]/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1 min-w-0">
            {/* Metadata Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#1e1a16] text-[#d9a55b] border border-[#2f2923]">
                {skill.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-[#d9a55b]/10 text-[#d9a55b] border border-[#d9a55b]/25">
                {"SKILL.md // RUNBOOK"}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] bg-[#1e1a16] text-[#b9ae9d] border border-[#2f2923]">
                <Bot className="w-3 h-3 text-[#d9a55b]" />
                <span>AGY • Claude Code • Cursor</span>
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[#f3ebdd] tracking-tight mb-2.5 break-words">
              {skill.name}
            </h1>

            {/* Description */}
            <p className="text-sm text-[#b9ae9d] leading-relaxed max-w-3xl">
              {skill.description}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-2.5 flex-wrap shrink-0">
            <Link
              href="/skills/cli"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1e1a16] hover:bg-[#27221c] border border-[#2f2923] text-[#b9ae9d] hover:text-[#f3ebdd] transition-all text-xs font-medium shadow-sm"
            >
              <Terminal className="w-3.5 h-3.5 text-[#d9a55b]" />
              <span>CLI Guide</span>
            </Link>
            <a
              href={skill.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1e1a16] hover:bg-[#27221c] border border-[#2f2923] text-[#b9ae9d] hover:text-[#f3ebdd] transition-all text-xs font-medium shadow-sm"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8e8374]" />
            </a>
            <a
              href={skill.rawUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#d9a55b]/10 hover:bg-[#d9a55b]/20 border border-[#d9a55b]/30 text-[#d9a55b] hover:text-[#f3ebdd] transition-all text-xs font-semibold shadow-sm"
            >
              <span>Raw</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* CLI Quick Action Bar */}
        <div className="mt-6 pt-5 border-t border-[#2f2923] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[#8e8374] shrink-0 font-medium">
              Pull into workspace:
            </span>
            <code className="font-mono bg-[#0e0c0a] px-3 py-1.5 rounded-lg text-[#d9a55b] border border-[#2f2923] text-xs truncate select-all">
              {cliPullCommand}
            </code>
          </div>
          <button
            type="button"
            onClick={() => handleCopy(cliPullCommand, "cli-command")}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#d9a55b] hover:bg-[#e6b56c] text-[#0e0c0a] font-bold text-xs transition-colors cursor-pointer shrink-0 shadow-sm"
          >
            {copiedKey === "cli-command" ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#0e0c0a]" />
                <span>Command Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#0e0c0a]" />
                <span>Copy Command</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Runbook Content Article */}
      <div className="p-6 sm:p-10 bg-[#161311] border border-[#2f2923] rounded-2xl mb-12 shadow-xl">
        <article className="max-w-none">{renderMarkdown(markdown)}</article>
      </div>

      {/* Related Skills Drawer */}
      {relatedSkills && relatedSkills.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-bold text-[#f3ebdd] font-heading">
              Related Runbooks in {skill.category}
            </h3>
            <Link
              href="/skills"
              className="text-xs text-[#d9a55b] hover:text-[#f3ebdd] font-medium transition-colors"
            >
              View all skills →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedSkills.map((relSkill) => (
              <AgentSkillCard key={relSkill.name} skill={relSkill} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
