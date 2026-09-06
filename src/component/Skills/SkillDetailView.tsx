"use client";

import { ArrowLeft, ArrowUpRight, Check, Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { GitHubIcon } from "@/component/Icons";
import type { AgentSkill } from "@/lib/agentSkills";

interface SkillDetailViewProps {
  skill: AgentSkill;
  markdown: string;
}

export function SkillDetailView({ skill, markdown }: SkillDetailViewProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const cliPullCommand = `skills-sync pull ${skill.name}`;

  // Clean markdown renderer for SKILL.md runbooks
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

      if (line.startsWith("```")) {
        if (inCodeBlock) {
          const codeString = codeBuffer.join("\n");
          const blockId = `code-block-${keyIndex++}`;
          elements.push(
            <div
              key={blockId}
              className="my-4 rounded-xl overflow-hidden border border-gray-800 bg-gray-950 font-mono text-xs shadow-inner"
            >
              <div className="flex items-center justify-between px-4 py-2 bg-gray-900/90 border-b border-gray-800 text-gray-400">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-violet-400">
                  {codeLanguage || "text"}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(codeString, blockId)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy code block"
                >
                  {copiedKey === blockId ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-[10px] text-emerald-400">
                        Copied
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-gray-400" />
                      <span className="text-[10px]">Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-gray-200 leading-relaxed">
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

      // GitHub alerts: > [!IMPORTANT], > [!WARNING], > [!NOTE], > [!TIP]
      if (line.startsWith("> [!")) {
        const alertType = line.match(/> \[!([A-Z]+)\]/)?.[1] || "NOTE";
        const alertContent: string[] = [];
        let j = i + 1;
        while (j < lines.length && lines[j].startsWith(">")) {
          alertContent.push(lines[j].replace(/^>\s?/, ""));
          j++;
        }
        i = j - 1;

        let alertBorder = "border-l-blue-500 bg-blue-500/10 text-blue-300";
        if (alertType === "IMPORTANT") {
          alertBorder = "border-l-violet-500 bg-violet-500/10 text-violet-300";
        } else if (alertType === "WARNING" || alertType === "CAUTION") {
          alertBorder = "border-l-amber-500 bg-amber-500/10 text-amber-300";
        }

        elements.push(
          <div
            key={`alert-${keyIndex++}`}
            className={`my-4 p-4 rounded-r-xl border-l-4 border border-y-0 border-r-0 ${alertBorder}`}
          >
            <span className="font-bold tracking-wider uppercase text-[11px] block mb-1">
              {alertType}
            </span>
            <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">
              {alertContent.join(" ")}
            </p>
          </div>,
        );
        continue;
      }

      // Headings
      if (line.startsWith("# ")) {
        elements.push(
          <h1
            key={`h1-${keyIndex++}`}
            className="text-2xl sm:text-3xl font-bold text-white mt-6 mb-3 tracking-tight"
          >
            {line.replace("# ", "")}
          </h1>,
        );
        continue;
      }

      if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={`h2-${keyIndex++}`}
            className="text-xl sm:text-2xl font-bold text-white mt-8 mb-3 border-b border-gray-800/80 pb-2"
          >
            {line.replace("## ", "")}
          </h2>,
        );
        continue;
      }

      if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={`h3-${keyIndex++}`}
            className="text-base sm:text-lg font-bold text-violet-300 mt-6 mb-2"
          >
            {line.replace("### ", "")}
          </h3>,
        );
        continue;
      }

      // Horizontal rules
      if (line.trim() === "---") {
        elements.push(
          <hr key={`hr-${keyIndex++}`} className="my-6 border-gray-800/80" />,
        );
        continue;
      }

      // Bullet lists
      if (line.startsWith("- ") || line.startsWith("* ")) {
        elements.push(
          <li
            key={`li-${keyIndex++}`}
            className="ml-5 list-disc text-xs sm:text-sm text-gray-300 my-1 leading-relaxed"
          >
            {line.replace(/^[-*]\s+/, "")}
          </li>,
        );
        continue;
      }

      // Numbered lists
      if (/^\d+\.\s+/.test(line)) {
        elements.push(
          <li
            key={`oli-${keyIndex++}`}
            className="ml-5 list-decimal text-xs sm:text-sm text-gray-300 my-1 leading-relaxed"
          >
            {line.replace(/^\d+\.\s+/, "")}
          </li>,
        );
        continue;
      }

      // Paragraphs
      if (line.trim()) {
        elements.push(
          <p
            key={`p-${keyIndex++}`}
            className="text-xs sm:text-sm text-gray-300 my-3 leading-relaxed"
          >
            {line}
          </p>,
        );
      }
    }

    return elements;
  };

  return (
    <div className="w-full relative z-10">
      {/* Back Navigation & Breadcrumb */}
      <div className="flex items-center gap-2 mb-4">
        <Link
          href="/skills"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Agent Skills</span>
        </Link>
        <span className="text-gray-600">/</span>
        <span className="text-xs text-violet-400 font-mono">{skill.name}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 pb-6 border-b border-gray-800/80">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-gray-800/80 text-gray-300 border border-gray-700/70">
              {skill.category.replace(/^\d+\.\s*/, "")}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20">
              SKILL.md
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
            {skill.name}
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            {skill.description}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <Link
            href="/skills/cli"
            className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-900/80 hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white transition-all text-xs font-medium"
          >
            <span>skills-sync CLI</span>
          </Link>
          <a
            href={skill.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900/80 hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white transition-all text-xs font-medium"
          >
            <GitHubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-gray-400" />
          </a>
          <a
            href={skill.rawUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 text-violet-300 hover:text-white transition-all text-xs font-medium"
          >
            <span>Raw</span>
            <ArrowUpRight className="w-3 h-3 text-violet-400" />
          </a>
        </div>
      </div>

      {/* CLI Quick Action Strip */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-gray-900/80 border border-gray-800/80 rounded-xl mb-8 text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-gray-400 shrink-0">Install via CLI:</span>
          <code className="font-mono bg-gray-950 px-2.5 py-1 rounded text-violet-300 border border-gray-800 text-xs truncate">
            {cliPullCommand}
          </code>
        </div>
        <button
          type="button"
          onClick={() => handleCopy(cliPullCommand, "cli-command")}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs transition-colors cursor-pointer shrink-0"
        >
          {copiedKey === "cli-command" ? (
            <>
              <Check className="w-3.5 h-3.5 text-white" />
              <span>Command Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-violet-200" />
              <span>Copy Command</span>
            </>
          )}
        </button>
      </div>

      {/* Main Runbook Content Container */}
      <div className="p-6 sm:p-8 bg-gray-900/60 border border-gray-800/70 rounded-xl mb-12 shadow-lg">
        <article className="max-w-none">{renderMarkdown(markdown)}</article>
      </div>
    </div>
  );
}
