"use client";

import {
  Check,
  ChevronRight,
  Code2,
  Copy,
  ExternalLink,
  FileCode,
  FileText,
  GitBranch,
  Hash,
  Image as ImageIcon,
  PanelLeft,
  PanelRight,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { TreeNode } from "@/types/detailTree";
import { formatFileLabel } from "./EditorExplorer";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface EditorCanvasProps {
  activeNode: TreeNode | null;
  openTabs: TreeNode[];
  activeTabId: string;
  onSelectTab: (node: TreeNode) => void;
  onCloseTab: (nodeId: string) => void;
  breadcrumbs: string[];
  workspaceName: string;
  entityType: string;
  isExplorerOpen: boolean;
  onToggleExplorer: () => void;
  isInspectorOpen: boolean;
  onToggleInspector: () => void;
}

function getTabIcon(node: TreeNode) {
  const label = formatFileLabel(node);
  if (label.endsWith(".md")) {
    return <FileText className="w-3.5 h-3.5 text-[#d9a55b]" />;
  }
  if (label.endsWith(".json")) {
    return <Tag className="w-3.5 h-3.5 text-[#58a6ff]" />;
  }
  if (label.endsWith(".env") || label.endsWith(".sh")) {
    return <FileCode className="w-3.5 h-3.5 text-[#3fb950]" />;
  }
  if (node.payload?.type === "image" || node.payload?.type === "images") {
    return <ImageIcon className="w-3.5 h-3.5 text-[#d29922]" />;
  }
  return <FileText className="w-3.5 h-3.5 text-[#8e8374]" />;
}

function getLanguageMode(node: TreeNode | null): string {
  if (!node) return "Plain Text";
  const label = formatFileLabel(node);
  if (label.endsWith(".md")) return "Markdown";
  if (label.endsWith(".json")) return "JSON";
  if (label.endsWith(".env")) return "ENV";
  if (label.endsWith(".sh")) return "Shell";
  if (node.payload?.type === "image" || node.payload?.type === "images")
    return "Media Preview";
  return "Document";
}

export function EditorCanvas({
  activeNode,
  openTabs,
  activeTabId,
  onSelectTab,
  onCloseTab,
  breadcrumbs,
  workspaceName,
  entityType,
  isExplorerOpen,
  onToggleExplorer,
  isInspectorOpen,
  onToggleInspector,
}: EditorCanvasProps) {
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  // Extract raw text for copy button
  const rawContent = useMemo(() => {
    if (!activeNode?.payload) return "";
    const p = activeNode.payload;
    if (p.type === "text") return p.value;
    if (p.type === "property") return `${p.key}="${p.value}"`;
    if (p.type === "list") return p.items.map((i) => `- ${i}`).join("\n");
    if (p.type === "tags") return JSON.stringify(p.items, null, 2);
    if (p.type === "link") return p.url;
    if (p.type === "timeline") {
      return p.items
        .map(
          (i) =>
            `## ${i.title} (${i.startDate} - ${i.endDate || "Present"})\n${i.subtitle || ""}`,
        )
        .join("\n\n");
    }
    return "";
  }, [activeNode]);

  const handleCopyFile = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard && rawContent) {
      navigator.clipboard.writeText(rawContent);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const languageMode = getLanguageMode(activeNode);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-transparent h-full overflow-hidden">
      {/* Tab Strip */}
      <div className="shrink-0 flex items-center bg-[#14110f] border-b border-[#2f2923] overflow-x-auto select-none [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-[#2f2923]">
        {/* Toggle Explorer Button (mobile/small screen or when closed) */}
        <button
          type="button"
          onClick={onToggleExplorer}
          className={`px-3 h-9 flex items-center justify-center border-r border-[#2f2923] transition-colors ${
            isExplorerOpen
              ? "text-[#d9a55b] bg-[#1a1613]"
              : "text-[#8e8374] hover:text-[#f3ebdd] hover:bg-[#1a1613]"
          }`}
          title={isExplorerOpen ? "Hide Explorer" : "Show Explorer"}
          aria-label="Toggle Explorer"
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        {/* Tab Items */}
        <div className="flex items-center min-w-0 flex-1">
          {openTabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            const label = formatFileLabel(tab);
            const icon = getTabIcon(tab);

            return (
              <div
                key={tab.id}
                className={`group flex items-center h-9 border-r border-[#2f2923] max-w-56 shrink-0 ${
                  isActive
                    ? "bg-[#161311] text-[#f3ebdd] border-t-2 border-t-[#d9a55b] font-medium"
                    : "bg-[#14110f] text-[#8e8374] hover:text-[#b9ae9d] hover:bg-[#161311] border-t-2 border-t-transparent"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelectTab(tab)}
                  className="flex items-center gap-2 h-full pl-3.5 pr-2 text-xs font-mono truncate cursor-pointer text-left focus:outline-none"
                >
                  <span className="shrink-0">{icon}</span>
                  <span className="truncate">{label}</span>
                </button>
                {openTabs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onCloseTab(tab.id)}
                    className="mr-2 p-0.5 rounded opacity-0 group-hover:opacity-100 hover:bg-[#25201b] hover:text-[#f3ebdd] transition-all cursor-pointer"
                    title="Close tab"
                  >
                    <X className="w-3 h-3 text-[#8e8374] hover:text-[#f3ebdd]" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Tab Controls */}
        <div className="flex items-center border-l border-[#2f2923] bg-[#14110f] px-2 h-9 gap-1 shrink-0">
          <button
            type="button"
            onClick={onToggleInspector}
            className={`p-1.5 rounded transition-colors ${
              isInspectorOpen
                ? "text-[#d9a55b] bg-[#1e1a16]"
                : "text-[#8e8374] hover:text-[#f3ebdd] hover:bg-[#1e1a16]"
            }`}
            title={
              isInspectorOpen ? "Hide Inspector" : "Show Telemetry & Specs"
            }
            aria-label="Toggle Inspector"
          >
            <PanelRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Breadcrumbs & File Action Bar */}
      <div className="shrink-0 h-8 px-4 flex items-center justify-between border-b border-[#2f2923]/60 bg-[#120f0d] text-xs font-mono text-[#8e8374] select-none">
        {/* Breadcrumb Path */}
        <div className="flex items-center gap-1.5 overflow-x-auto min-w-0 pr-2">
          <span className="text-[#8e8374] hover:text-[#b9ae9d] transition-colors truncate">
            {workspaceName}
          </span>
          {breadcrumbs.map((crumb, idx) => (
            <div
              key={`crumb-${crumb}`}
              className="flex items-center gap-1.5 shrink-0"
            >
              <ChevronRight className="w-3 h-3 text-[#413930]" />
              <span
                className={
                  idx === breadcrumbs.length - 1
                    ? "text-[#f3ebdd] font-medium truncate"
                    : "text-[#8e8374] truncate"
                }
              >
                {crumb}
              </span>
            </div>
          ))}
        </div>

        {/* File Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setShowLineNumbers(!showLineNumbers)}
            className={`p-1 rounded flex items-center gap-1 text-[11px] transition-colors ${
              showLineNumbers
                ? "bg-[#1e1a16] text-[#d9a55b] border border-[#2f2923]"
                : "text-[#8e8374] hover:text-[#f3ebdd] hover:bg-[#1a1613]"
            }`}
            title={showLineNumbers ? "Hide Line Numbers" : "Show Line Numbers"}
          >
            <Hash className="w-3 h-3" />
            <span className="hidden sm:inline">Lines</span>
          </button>

          {rawContent && (
            <button
              type="button"
              onClick={handleCopyFile}
              className="p-1 px-1.5 rounded flex items-center gap-1 text-[11px] text-[#8e8374] hover:text-[#f3ebdd] hover:bg-[#1a1613] transition-colors"
              title="Copy file contents"
            >
              {isCopied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Editor Buffer Canvas */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#2f2923] [&::-webkit-scrollbar-thumb]:rounded-full">
        <div className="max-w-4xl mx-auto">
          {activeNode ? (
            <BufferContent
              node={activeNode}
              showLineNumbers={showLineNumbers}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-[#8e8374] font-mono text-xs">
              <Sparkles className="w-8 h-8 text-[#d9a55b]/40 mb-3 animate-pulse" />
              <span>Select a file from the explorer to open buffer</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <footer className="shrink-0 h-6 px-3 bg-[#161311] border-t border-[#2f2923] flex items-center justify-between text-[11px] font-mono select-none text-[#8e8374]">
        {/* Left Side Telemetry */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[#d9a55b]">
            <GitBranch className="w-3 h-3" />
            <span>main</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[#b9ae9d]">0 errors</span>
          </div>
          <div className="hidden sm:inline text-[#413930]">|</div>
          <span className="hidden sm:inline uppercase text-[#8e8374]">
            {entityType}
          </span>
        </div>

        {/* Right Side File Meta */}
        <div className="flex items-center gap-3">
          <span>Ln 1, Col 1</span>
          <span className="hidden sm:inline">Spaces: 2</span>
          <span>UTF-8</span>
          <span className="px-1.5 py-0.5 rounded bg-[#1e1a16] text-[#d9a55b] border border-[#2f2923]/60 text-[10px] font-medium">
            {languageMode}
          </span>
        </div>
      </footer>
    </div>
  );
}

/**
 * Buffer renderer for various node payloads
 */
interface BufferContentProps {
  node: TreeNode;
  showLineNumbers: boolean;
}

function BufferContent({ node, showLineNumbers }: BufferContentProps) {
  const payload = node.payload;

  // Case 1: Text / Markdown content
  if (payload?.type === "text") {
    return (
      <div className="animate-fadeIn">
        <MarkdownRenderer
          content={payload.value}
          showLineNumbers={showLineNumbers}
        />
      </div>
    );
  }

  // Case 2: Property (Key-Value environment configuration)
  if (payload?.type === "property") {
    return (
      <div className="rounded-xl border border-[#2f2923] bg-[#120f0d] p-5 font-mono text-xs shadow-xl animate-fadeIn">
        <div className="text-[#413930] mb-3 select-none">
          # Configuration Entry ({node.label})
        </div>
        <div className="flex items-center gap-3">
          {showLineNumbers && (
            <span className="text-[#413930] select-none text-right w-6">1</span>
          )}
          <div className="flex items-center gap-2">
            <span className="text-[#58a6ff] font-semibold">{payload.key}</span>
            <span className="text-[#8e8374]">=</span>
            <span className="text-[#3fb950]">&quot;{payload.value}&quot;</span>
          </div>
        </div>
      </div>
    );
  }

  // Case 3: List items
  if (payload?.type === "list") {
    return (
      <div className="space-y-4 animate-fadeIn">
        <div className="border-b border-[#2f2923] pb-3 mb-4">
          <h2 className="text-xl font-normal text-[#f3ebdd] font-heading">
            {node.label}
          </h2>
          <p className="text-xs font-mono text-[#8e8374] mt-1">
            Total items: {payload.items.length}
          </p>
        </div>
        <div className="space-y-2 font-mono text-xs">
          {payload.items.map((item, idx) => (
            <div
              key={`item-${item}`}
              className="flex items-start gap-3 p-3 rounded-lg bg-[#14110f] border border-[#2f2923]/60 hover:border-[#d9a55b]/40 transition-colors"
            >
              {showLineNumbers && (
                <span className="text-[#413930] select-none text-right w-6 shrink-0 mt-0.5">
                  {idx + 1}
                </span>
              )}
              <span className="w-1.5 h-1.5 rounded-full bg-[#d9a55b] mt-1.5 shrink-0" />
              <span className="text-[#b9ae9d] leading-relaxed flex-1 font-sans text-sm">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Case 4: Tags / Skills
  if (payload?.type === "tags") {
    const jsonFormatted = JSON.stringify(
      {
        category: node.label,
        stack: payload.items,
        count: payload.items.length,
      },
      null,
      2,
    );

    return (
      <div className="space-y-6 animate-fadeIn">
        <div>
          <h2 className="text-xl font-normal text-[#f3ebdd] font-heading">
            {node.label}
          </h2>
          <p className="text-xs font-mono text-[#8e8374] mt-1">
            Registered technology definitions
          </p>
        </div>

        {/* Visual Pills */}
        <div className="flex flex-wrap gap-2">
          {payload.items.map((tag) => (
            <div
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161311] border border-[#2f2923] text-xs font-mono text-[#f3ebdd] hover:border-[#d9a55b]/50 transition-colors"
            >
              <Tag className="w-3 h-3 text-[#d9a55b]" />
              <span>{tag}</span>
            </div>
          ))}
        </div>

        {/* Formatted JSON view */}
        <div className="rounded-xl border border-[#2f2923] bg-[#120f0d] p-4 font-mono text-xs shadow-xl">
          <div className="text-[#8e8374] text-[11px] mb-2 uppercase tracking-wider font-semibold border-b border-[#2f2923]/60 pb-2">
            JSON Representation
          </div>
          <pre className="text-[#b9ae9d] overflow-x-auto">
            <code>{jsonFormatted}</code>
          </pre>
        </div>
      </div>
    );
  }

  // Case 5: Single Image
  if (payload?.type === "image") {
    return (
      <div className="space-y-4 animate-fadeIn">
        <div className="border-b border-[#2f2923] pb-3 mb-4">
          <h2 className="text-xl font-normal text-[#f3ebdd] font-heading">
            {payload.alt || node.label}
          </h2>
          <p className="text-xs font-mono text-[#8e8374] mt-1">
            Media preview canvas
          </p>
        </div>
        <div className="relative aspect-video max-w-2xl rounded-xl overflow-hidden bg-[#161311] border border-[#2f2923] shadow-2xl group">
          <Image
            src={payload.url}
            alt={payload.alt}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
          <a
            href={payload.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-[#0e0c0a]/80 backdrop-blur border border-[#2f2923] text-xs font-mono text-[#f3ebdd] hover:text-[#d9a55b] flex items-center gap-1.5 transition-colors opacity-0 group-hover:opacity-100"
          >
            <span>Full Resolution</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  // Case 6: Multiple Images Gallery
  if (payload?.type === "images") {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="border-b border-[#2f2923] pb-3">
          <h2 className="text-xl font-normal text-[#f3ebdd] font-heading">
            {payload.alt || node.label}
          </h2>
          <p className="text-xs font-mono text-[#8e8374] mt-1">
            {payload.urls.length} media assets in collection
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {payload.urls.map((url, idx) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative aspect-video rounded-xl overflow-hidden bg-[#161311] border border-[#2f2923] hover:border-[#d9a55b]/50 transition-all group shadow-lg"
            >
              <Image
                src={url}
                alt={`${payload.alt} #${idx + 1}`}
                fill
                className="object-cover group-hover:scale-102 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-xs font-mono font-medium text-[#f3ebdd] px-3 py-1.5 rounded bg-[#1e1a16]/90 border border-[#2f2923] flex items-center gap-1">
                  <span>View Asset #{idx + 1}</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  // Case 7: Timeline
  if (payload?.type === "timeline") {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="border-b border-[#2f2923] pb-3">
          <h2 className="text-xl font-normal text-[#f3ebdd] font-heading">
            {node.label}
          </h2>
          <p className="text-xs font-mono text-[#8e8374] mt-1">
            Operational timeline & phases
          </p>
        </div>
        <div className="space-y-4">
          {payload.items.map((item) => (
            <div
              key={`timeline-${item.title}-${item.startDate}`}
              className="p-4 rounded-xl bg-[#14110f] border border-[#2f2923] space-y-2 hover:border-[#d9a55b]/40 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h3 className="text-base font-medium text-[#f3ebdd]">
                  {item.title}
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#1e1a16] border border-[#2f2923] text-[#d9a55b]">
                  {item.startDate} —{" "}
                  {item.endDate || (item.isCurrent ? "Present" : "N/A")}
                </span>
              </div>
              {item.subtitle && (
                <p className="text-xs font-mono text-[#8e8374]">
                  {item.subtitle}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Case 8: Link
  if (payload?.type === "link") {
    return (
      <div className="p-6 rounded-xl bg-[#14110f] border border-[#2f2923] max-w-lg space-y-4 animate-fadeIn">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#1e1a16] border border-[#2f2923] text-[#d9a55b]">
            <ExternalLink className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#f3ebdd] font-mono">
              {node.label}
            </h3>
            <p className="text-xs font-mono text-[#8e8374] truncate">
              {payload.url}
            </p>
          </div>
        </div>
        <a
          href={payload.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-3 rounded-lg bg-[#d9a55b] hover:bg-[#e6b56c] text-[#0e0c0a] font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Open External Resource</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  // Case 9: Project Reference
  if (payload?.type === "project") {
    return (
      <div className="p-6 rounded-xl bg-[#14110f] border border-[#2f2923] max-w-xl space-y-4 animate-fadeIn">
        <div className="flex items-center gap-2 text-xs font-mono text-[#d9a55b]">
          <Code2 className="w-4 h-4" />
          <span>Associated Project</span>
        </div>
        <h3 className="text-lg font-medium text-[#f3ebdd]">{payload.name}</h3>
        {payload.description && (
          <p className="text-sm text-[#b9ae9d] leading-relaxed">
            {payload.description}
          </p>
        )}
        {payload.technologies && payload.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {payload.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-xs font-mono bg-[#1e1a16] text-[#8e8374] border border-[#2f2923]"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <Link
          href={`/projects/${payload.id}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1e1a16] hover:bg-[#25201b] border border-[#2f2923] text-xs font-mono text-[#f3ebdd] transition-colors"
        >
          <span>Explore Project Details</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#d9a55b]" />
        </Link>
      </div>
    );
  }

  // Fallback
  return (
    <div className="p-6 text-sm text-[#8e8374] font-mono">{node.label}</div>
  );
}
