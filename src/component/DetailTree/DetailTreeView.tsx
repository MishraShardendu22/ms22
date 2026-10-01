"use client";

import {
  ArrowLeft,
  Globe,
  PanelLeft,
  PanelRight,
  Terminal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GitHubIcon } from "@/component/Icons";
import { PageSearch } from "@/component/Search";
import { BADGE_VARIANTS } from "@/static/ui";
import type {
  DetailTreeData,
  TreeNode,
  TreeNodePayload,
  TreeSection,
} from "@/types/detailTree";
import { getLinkLabel } from "@/utils/linkDetection";
import { EditorCanvas } from "./EditorCanvas";
import { EditorExplorer, formatFileLabel } from "./EditorExplorer";
import { EditorInspector } from "./EditorInspector";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface DetailTreeViewProps {
  data: DetailTreeData;
}

/**
 * Convert legacy sections into modern TreeNode hierarchy if needed
 */
function legacySectionsToTree(sections: TreeSection[]): TreeNode[] {
  return sections.map((sec) => {
    let payload: TreeNodePayload | undefined;
    if (sec.content.type === "text") {
      payload = { type: "text", value: sec.content.value };
    } else if (sec.content.type === "list") {
      payload = { type: "list", items: sec.content.items };
    } else if (sec.content.type === "tags") {
      payload = { type: "tags", items: sec.content.items };
    } else if (sec.content.type === "timeline") {
      payload = { type: "timeline", items: sec.content.items };
    } else if (sec.content.type === "images") {
      payload = {
        type: "images",
        urls: sec.content.urls,
        alt: sec.content.alt,
      };
    } else if (sec.content.type === "metadata") {
      return {
        id: sec.id,
        label: sec.title,
        type: "folder" as const,
        children: sec.content.fields.map((f) => ({
          id: `${sec.id}-${f.label}`,
          label: `${f.label}: ${f.value}`,
          type: "property" as const,
          payload: { type: "property" as const, key: f.label, value: f.value },
        })),
      };
    }
    return {
      id: sec.id,
      label: sec.title,
      type: "file" as const,
      payload,
    };
  });
}

/**
 * Recursively find the first leaf node to serve as default open file
 */
function findFirstLeaf(nodes: TreeNode[]): TreeNode | null {
  for (const node of nodes) {
    if (node.children && node.children.length > 0) {
      const child = findFirstLeaf(node.children);
      if (child) return child;
    } else if (node.payload) {
      return node;
    }
  }
  return null;
}

/**
 * Trace the breadcrumb path from root to the active node ID
 */
function findNodePath(
  nodes: TreeNode[],
  targetId: string,
  currentPath: string[] = [],
): string[] | null {
  for (const node of nodes) {
    const label = formatFileLabel(node);
    const newPath = [...currentPath, label];
    if (node.id === targetId) {
      return newPath;
    }
    if (node.children && node.children.length > 0) {
      const found = findNodePath(node.children, targetId, newPath);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Recursively find all readable leaf nodes with payload
 */
function getReadableNodes(nodes: TreeNode[]): TreeNode[] {
  const result: TreeNode[] = [];
  function traverse(list: TreeNode[]) {
    for (const node of list) {
      if (node.children && node.children.length > 0) {
        traverse(node.children);
      } else if (node.payload) {
        result.push(node);
      }
    }
  }
  traverse(nodes);
  return result;
}

function MobileNodeRenderer({ node }: { node: TreeNode | null }) {
  if (!node?.payload) {
    return (
      <div className="text-center py-6 text-xs font-mono text-[#8e8374]">
        No content available for this section
      </div>
    );
  }

  const { payload } = node;

  if (payload.type === "text") {
    return (
      <div className="space-y-3">
        <div className="border-b border-[#2f2923] pb-2">
          <h2 className="text-base font-semibold text-[#f3ebdd] font-heading">
            {node.label}
          </h2>
        </div>
        <MarkdownRenderer content={payload.value} showLineNumbers={false} />
      </div>
    );
  }

  if (payload.type === "list") {
    return (
      <div className="space-y-3">
        <div className="border-b border-[#2f2923] pb-2">
          <h2 className="text-base font-semibold text-[#f3ebdd] font-heading">
            {node.label}
          </h2>
          <p className="text-[11px] font-mono text-[#8e8374] mt-0.5">
            {payload.items.length} items
          </p>
        </div>
        <div className="space-y-2">
          {payload.items.map((item) => (
            <div
              key={item}
              className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#1e1a16] border border-[#2f2923] text-xs font-sans text-[#b9ae9d] leading-relaxed"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d9a55b] mt-1.5 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (payload.type === "tags") {
    return (
      <div className="space-y-3">
        <div className="border-b border-[#2f2923] pb-2">
          <h2 className="text-base font-semibold text-[#f3ebdd] font-heading">
            {node.label}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {payload.items.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-mono bg-[#1e1a16] text-[#d9a55b] border border-[#2f2923] rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (payload.type === "property") {
    return (
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#1e1a16] border border-[#2f2923] text-xs font-mono">
        <span className="text-[#8e8374]">{payload.key}</span>
        <span className="text-[#f3ebdd] font-semibold">{payload.value}</span>
      </div>
    );
  }

  if (payload.type === "image") {
    return (
      <div className="space-y-3">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#1e1a16] border border-[#2f2923]">
          <Image
            src={payload.url}
            alt={payload.alt || node.label}
            fill
            className="object-contain"
          />
        </div>
      </div>
    );
  }

  if (payload.type === "images") {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-3">
          {payload.urls.map((url, idx) => (
            <div
              key={url}
              className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#1e1a16] border border-[#2f2923]"
            >
              <Image
                src={url}
                alt={`${payload.alt || node.label} #${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (payload.type === "timeline") {
    return (
      <div className="space-y-3">
        <div className="border-b border-[#2f2923] pb-2">
          <h2 className="text-base font-semibold text-[#f3ebdd] font-heading">
            {node.label}
          </h2>
        </div>
        <div className="space-y-2">
          {payload.items.map((item, idx) => (
            <div
              key={item}
              className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#1e1a16] border border-[#2f2923] text-xs text-[#b9ae9d]"
            >
              <span className="px-2 py-0.5 rounded-full bg-[#d9a55b]/10 text-[#d9a55b] text-[10px] font-mono shrink-0">
                #{idx + 1}
              </span>
              <span className="leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export function DetailTreeView({ data }: DetailTreeViewProps) {
  // Resolve tree hierarchy (using modern tree or converted legacy sections)
  const treeNodes = useMemo<TreeNode[]>(() => {
    if (data.tree && data.tree.length > 0) return data.tree;
    if (data.sections && data.sections.length > 0) {
      return legacySectionsToTree(data.sections);
    }
    return [];
  }, [data.tree, data.sections]);

  // Initial leaf node (default to README.md / description if present)
  const initialLeaf = useMemo<TreeNode | null>(() => {
    return findFirstLeaf(treeNodes);
  }, [treeNodes]);

  const [activeNode, setActiveNode] = useState<TreeNode | null>(initialLeaf);
  const [openTabs, setOpenTabs] = useState<TreeNode[]>(() =>
    initialLeaf ? [initialLeaf] : [],
  );

  // Panel visibility states
  const [isExplorerOpen, setIsExplorerOpen] = useState(true);
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);

  // Sync active node if tree nodes change
  useEffect(() => {
    if (
      initialLeaf &&
      (!activeNode || !openTabs.some((t) => t.id === activeNode.id))
    ) {
      setActiveNode(initialLeaf);
      setOpenTabs((prev) => (prev.length > 0 ? prev : [initialLeaf]));
    }
  }, [initialLeaf, activeNode, openTabs]);

  // Handle selecting a file from explorer
  const handleSelectNode = useCallback((node: TreeNode) => {
    // Only open leaf nodes in editor buffer
    if (node.type === "folder" || (node.children && node.children.length > 0)) {
      return;
    }

    setActiveNode(node);
    setOpenTabs((prev) => {
      if (prev.some((t) => t.id === node.id)) {
        return prev;
      }
      return [...prev, node];
    });
  }, []);

  // Handle closing a tab
  const handleCloseTab = useCallback(
    (nodeId: string) => {
      setOpenTabs((prev) => {
        const nextTabs = prev.filter((t) => t.id !== nodeId);
        if (activeNode?.id === nodeId) {
          // If active tab was closed, switch to adjacent or remaining
          const closedIndex = prev.findIndex((t) => t.id === nodeId);
          const newActive =
            nextTabs[closedIndex] ||
            nextTabs[closedIndex - 1] ||
            nextTabs[0] ||
            null;
          setActiveNode(newActive);
        }
        return nextTabs;
      });
    },
    [activeNode],
  );

  // Handle selecting an open tab
  const handleSelectTab = useCallback((node: TreeNode) => {
    setActiveNode(node);
  }, []);

  // Breadcrumbs path
  const breadcrumbs = useMemo(() => {
    if (!activeNode) return [];
    return (
      findNodePath(treeNodes, activeNode.id) || [formatFileLabel(activeNode)]
    );
  }, [treeNodes, activeNode]);

  const readableNodes = useMemo<TreeNode[]>(() => {
    return getReadableNodes(treeNodes);
  }, [treeNodes]);

  const [mobileActiveNode, setMobileActiveNode] = useState<TreeNode | null>(
    () => readableNodes[0] || initialLeaf,
  );

  useEffect(() => {
    if (
      readableNodes.length > 0 &&
      (!mobileActiveNode ||
        !readableNodes.some((n) => n.id === mobileActiveNode.id))
    ) {
      setMobileActiveNode(readableNodes[0]);
    }
  }, [readableNodes, mobileActiveNode]);

  const techItems = useMemo<string[]>(() => {
    if (data.skills && data.skills.length > 0) return data.skills;
    const tagNode = treeNodes.find(
      (n) =>
        n.payload?.type === "tags" || n.label.toLowerCase().includes("tech"),
    );
    if (tagNode?.payload?.type === "tags") {
      return tagNode.payload.items;
    }
    return [];
  }, [data.skills, treeNodes]);

  return (
    <div className="min-h-screen md:h-screen flex flex-col relative z-10 bg-transparent text-[#f3ebdd] overflow-y-auto md:overflow-hidden">
      {/* Mobile-Specific Clean Project Page (< md) */}
      <div className="flex md:hidden flex-col min-h-screen bg-transparent text-[#f3ebdd] px-4 py-4 space-y-4">
        {/* Top Mobile Bar: Back Link & Search */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href={data.backLink.href}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-[#161311] hover:bg-[#1e1a16] border border-[#2f2923] hover:border-[#d9a55b]/40 text-[#b9ae9d] hover:text-[#f3ebdd] rounded-full transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#d9a55b]" />
            <span>{data.backLink.label}</span>
          </Link>
          <PageSearch defaultFilter={data.entityType} />
        </div>

        {/* Project Hero Card */}
        <div className="rounded-2xl bg-[#161311] border border-[#2f2923] p-4 sm:p-5 space-y-3.5 shadow-xl">
          <div className="flex items-start gap-3.5">
            {data.logo ? (
              <div className="w-12 h-12 rounded-2xl bg-[#1e1a16] border border-[#2f2923] flex items-center justify-center overflow-hidden shrink-0 p-1">
                <Image
                  src={data.logo}
                  alt={data.title}
                  width={48}
                  height={48}
                  className="object-contain max-h-full max-w-full"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-[#1e1a16] border border-[#2f2923] flex items-center justify-center text-[#d9a55b] shrink-0">
                <Terminal className="w-5 h-5" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold font-serif text-[#f3ebdd] leading-snug">
                  {data.title}
                </h1>
                {data.badge && (
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold border rounded-full ${BADGE_VARIANTS[data.badge.variant]}`}
                  >
                    {data.badge.label}
                  </span>
                )}
              </div>
              {data.subtitle && (
                <p className="text-xs text-[#8e8374] mt-1 leading-relaxed">
                  {data.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Primary Action Buttons */}
          {data.links && data.links.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1 border-t border-[#2f2923]/60">
              {data.links.map((link) => {
                const label = link.label || getLinkLabel(link.type);
                const isGithub =
                  link.type === "github" ||
                  label.toLowerCase().includes("code") ||
                  label.toLowerCase().includes("repo");
                return (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#1e1a16] hover:bg-[#25201b] border border-[#2f2923] hover:border-[#d9a55b]/40 text-xs font-mono font-medium text-[#f3ebdd] hover:text-[#d9a55b] transition-colors"
                  >
                    {isGithub ? (
                      <GitHubIcon className="w-3.5 h-3.5 text-[#d9a55b]" />
                    ) : (
                      <Globe className="w-3.5 h-3.5 text-[#d9a55b]" />
                    )}
                    <span>{label}</span>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Live Status & Tech Stack Card */}
        <div className="rounded-2xl bg-[#161311] border border-[#2f2923] p-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-[#2f2923]/60">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono font-medium text-[#f3ebdd]">
                System Active
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#8e8374]">
              Observatory v4.1 • Verified
            </span>
          </div>

          {/* Tech Stack Pills */}
          {((data.skills && data.skills.length > 0) ||
            techItems.length > 0) && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8e8374]">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(data.skills || techItems).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono bg-[#1e1a16] text-[#b9ae9d] border border-[#2f2923] rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content Section Tabs & Body */}
        {readableNodes.length > 0 && (
          <div className="space-y-2.5">
            {/* Simple Pill Picker if more than 1 section */}
            {readableNodes.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {readableNodes.map((node) => {
                  const isActive =
                    (mobileActiveNode?.id || readableNodes[0]?.id) === node.id;
                  const label = formatFileLabel(node).replace(
                    /\.(md|env|sh|json)$/,
                    "",
                  );
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setMobileActiveNode(node)}
                      className={`px-3 py-1.5 text-xs font-mono rounded-full shrink-0 transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#d9a55b] text-[#0e0c0a] font-bold shadow-sm"
                          : "bg-[#161311] text-[#8e8374] hover:text-[#f3ebdd] border border-[#2f2923]"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Document Body Card */}
            <div className="rounded-2xl bg-[#161311] border border-[#2f2923] p-4 sm:p-5 shadow-lg space-y-4">
              <MobileNodeRenderer node={mobileActiveNode || readableNodes[0]} />
            </div>
          </div>
        )}
      </div>

      {/* Desktop IDE Application Bar */}
      <header className="hidden md:block shrink-0 px-3 sm:px-4 py-2.5 bg-[#161311] border-b border-[#2f2923] relative z-20 select-none">
        <div className="flex items-center justify-between gap-3 max-w-full">
          {/* Left: Back Link & Workspace Identity */}
          <div className="flex items-center gap-3 min-w-0">
            <Link href={data.backLink.href}>
              <button
                type="button"
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono bg-[#1e1a16] hover:bg-[#25201b] border border-[#2f2923] text-[#8e8374] hover:text-[#f3ebdd] rounded-md transition-all cursor-pointer"
                title={data.backLink.label}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{data.backLink.label}</span>
              </button>
            </Link>

            {/* Logo & Title */}
            <div className="flex items-center gap-2.5 min-w-0">
              {data.logo ? (
                <div className="w-7 h-7 rounded-md bg-[#1e1a16] border border-[#2f2923] flex items-center justify-center overflow-hidden shrink-0">
                  <Image
                    src={data.logo}
                    alt={data.title}
                    width={28}
                    height={28}
                    className="object-contain p-0.5"
                  />
                </div>
              ) : (
                <div className="w-7 h-7 rounded-md bg-[#1e1a16] border border-[#2f2923] flex items-center justify-center text-[#d9a55b] shrink-0">
                  <Terminal className="w-3.5 h-3.5" />
                </div>
              )}

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-sm sm:text-base font-semibold text-[#f3ebdd] font-heading truncate">
                    {data.title}
                  </h1>
                  {data.badge && (
                    <span
                      className={`hidden xs:inline px-2 py-0.2 text-[10px] font-mono uppercase tracking-wider font-semibold border rounded-full ${BADGE_VARIANTS[data.badge.variant]}`}
                    >
                      {data.badge.label}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Actions, Search, and Panel Toggles */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Quick External Links (Desktop) */}
            {data.links && data.links.length > 0 && (
              <div className="hidden md:flex items-center gap-1.5">
                {data.links.slice(0, 2).map((link) => {
                  const label = getLinkLabel(link.type);
                  return (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-[#b9ae9d] hover:text-[#f3ebdd] bg-[#1a1613] hover:bg-[#201b17] border border-[#2f2923] rounded-md transition-colors"
                    >
                      {link.type === "github" ? (
                        <GitHubIcon className="w-3 h-3 text-[#d9a55b]" />
                      ) : (
                        <Globe className="w-3 h-3 text-[#d9a55b]" />
                      )}
                      <span>{link.label || label}</span>
                    </a>
                  );
                })}
              </div>
            )}

            {/* Page Search Modal */}
            <PageSearch defaultFilter={data.entityType} />

            {/* Explorer Toggle Button */}
            <button
              type="button"
              onClick={() => setIsExplorerOpen(!isExplorerOpen)}
              className={`p-1.5 rounded-md border border-[#2f2923] transition-colors ${
                isExplorerOpen
                  ? "bg-[#1e1a16] text-[#d9a55b]"
                  : "bg-[#14110f] text-[#8e8374] hover:text-[#f3ebdd]"
              }`}
              title={isExplorerOpen ? "Hide Explorer" : "Show Explorer"}
              aria-label="Toggle Explorer"
            >
              <PanelLeft className="w-4 h-4" />
            </button>

            {/* Inspector Toggle Button */}
            <button
              type="button"
              onClick={() => setIsInspectorOpen(!isInspectorOpen)}
              className={`p-1.5 rounded-md border border-[#2f2923] transition-colors ${
                isInspectorOpen
                  ? "bg-[#1e1a16] text-[#d9a55b]"
                  : "bg-[#14110f] text-[#8e8374] hover:text-[#f3ebdd]"
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
      </header>

      {/* Main IDE 3-Pane Body */}
      <div className="hidden md:flex flex-1 overflow-hidden relative z-10">
        {/* Left Explorer Pane */}
        {isExplorerOpen && (
          <EditorExplorer
            tree={treeNodes}
            activeNodeId={activeNode?.id || ""}
            onSelectNode={handleSelectNode}
            workspaceName={data.title}
          />
        )}

        {/* Center Editor Canvas Buffer */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <EditorCanvas
            activeNode={activeNode}
            openTabs={openTabs}
            activeTabId={activeNode?.id || ""}
            onSelectTab={handleSelectTab}
            onCloseTab={handleCloseTab}
            breadcrumbs={breadcrumbs}
            workspaceName={data.title}
            entityType={data.entityType}
            isExplorerOpen={isExplorerOpen}
            onToggleExplorer={() => setIsExplorerOpen(!isExplorerOpen)}
            isInspectorOpen={isInspectorOpen}
            onToggleInspector={() => setIsInspectorOpen(!isInspectorOpen)}
          />
        </main>

        {/* Right Telemetry & Inspector Pane */}
        <EditorInspector
          data={data}
          isOpen={isInspectorOpen}
          onToggle={() => setIsInspectorOpen(!isInspectorOpen)}
        />
      </div>
    </div>
  );
}
