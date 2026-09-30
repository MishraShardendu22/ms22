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

  return (
    <div className="h-screen flex flex-col relative z-10 bg-transparent text-[#f3ebdd] overflow-hidden">
      {/* Top IDE Application Bar */}
      <header className="shrink-0 px-3 sm:px-4 py-2.5 bg-[#161311] border-b border-[#2f2923] relative z-20 select-none">
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
      <div className="flex-1 flex overflow-hidden relative z-10">
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
