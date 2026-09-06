"use client";

import { ArrowUpRight, Check, Copy, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { AgentSkill } from "@/lib/agentSkills";

interface SkillDetailModalProps {
  skill: AgentSkill | null;
  onClose: () => void;
}

export function SkillDetailModal({ skill, onClose }: SkillDetailModalProps) {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<string>("");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  useEffect(() => {
    if (!skill) return;

    setLoading(true);
    let isMounted = true;

    // Fetch markdown from API endpoint or raw URL
    fetch(`/api/skills/${skill.name}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch runbook");
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setContent(data.markdown || "");
          setLoading(false);
        }
      })
      .catch(() => {
        // Fallback directly to raw URL if API has issues
        fetch(skill.rawUrl)
          .then((res) => (res.ok ? res.text() : ""))
          .then((text) => {
            if (isMounted) {
              setContent(text);
              setLoading(false);
            }
          })
          .catch(() => {
            if (isMounted) {
              setContent(`# ${skill.name}\n\n${skill.description}`);
              setLoading(false);
            }
          });
      });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      isMounted = false;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [skill, onClose]);

  if (!skill) return null;

  const handleCopy = (text: string, sectionKey: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedSection(sectionKey);
      setTimeout(() => setCopiedSection(null), 2000);
    }
  };

  // Simple, clean markdown section renderer for runbooks
  const renderMarkdown = (md: string) => {
    // Strip YAML frontmatter if present
    const cleanMd = md.replace(/^---[\s\S]*?---\n*/, "");
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
          // Close code block
          const codeString = codeBuffer.join("\n");
          const blockId = `code-block-${keyIndex++}`;
          elements.push(
            <div
              key={blockId}
              className="my-4 rounded-xl overflow-hidden border border-gray-800 bg-gray-950 font-mono text-xs shadow-inner"
            >
              <div className="flex items-center justify-between px-4 py-2 bg-gray-900/90 border-b border-gray-800 text-gray-400">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-violet-400">
                  {codeLanguage || "bash"}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(codeString, blockId)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all cursor-pointer"
                  title="Copy code"
                >
                  {copiedSection === blockId ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-[10px] text-emerald-400">
                        Copied
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
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

      // Check for alerts: > [!IMPORTANT], > [!WARNING], > [!NOTE], > [!TIP]
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
            className="text-2xl sm:text-3xl font-extrabold text-white mt-6 mb-3 tracking-tight"
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
            className="text-xl sm:text-2xl font-bold text-white mt-6 mb-3 border-b border-gray-800/80 pb-2"
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
            className="text-lg font-bold text-violet-300 mt-5 mb-2"
          >
            {line.replace("### ", "")}
          </h3>,
        );
        continue;
      }

      // Divider
      if (line.trim() === "---") {
        elements.push(
          <hr key={`hr-${keyIndex++}`} className="my-5 border-gray-800/80" />,
        );
        continue;
      }

      // Lists
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
            className="text-xs sm:text-sm text-gray-300 my-2.5 leading-relaxed"
          >
            {line}
          </p>,
        );
      }
    }

    return elements;
  };

  const cliPullCommand = `skills-sync pull ${skill.name}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="skill-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800/80 bg-gray-950/60 backdrop-blur-md">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2
                id="skill-modal-title"
                className="text-base sm:text-lg font-mono font-bold text-white truncate"
              >
                {skill.name}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20 shrink-0">
                SKILL.md
              </span>
            </div>
            <p className="text-xs text-gray-400 truncate mt-0.5">
              {skill.category}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={skill.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/80 hover:bg-gray-700 text-gray-200 text-xs font-semibold border border-gray-700 transition-colors"
              title="View on GitHub"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
              title="Close modal"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CLI Quick Action Banner */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-6 py-2.5 bg-gray-950/50 border-b border-gray-800/80 text-xs">
          <div className="flex items-center gap-2 text-violet-300">
            <span className="text-gray-400">Run via CLI:</span>
            <code className="font-mono bg-gray-950 px-2 py-0.5 rounded text-violet-300 border border-violet-900/40 text-xs">
              {cliPullCommand}
            </code>
          </div>
          <button
            type="button"
            onClick={() => handleCopy(cliPullCommand, "cli-command")}
            className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs transition-colors cursor-pointer shrink-0"
          >
            {copiedSection === "cli-command" ? (
              <>
                <Check className="w-3 h-3 text-emerald-300" />
                <span>Command Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy Command</span>
              </>
            )}
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 max-h-[calc(90vh-140px)]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin text-violet-400 mb-3" />
              <p className="text-sm">Fetching skill runbook from GitHub...</p>
            </div>
          ) : content ? (
            <article className="prose prose-invert max-w-none">
              {renderMarkdown(content)}
            </article>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm font-medium text-gray-300">
                Unable to load runbook markdown
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Please check your network connection or view the source
                repository
              </p>
              <a
                href={skill.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-violet-400 hover:underline text-xs"
              >
                <span>View directly on GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
