"use client";

import {
  ChevronDown,
  ChevronRight,
  ChevronsDownUp,
  ChevronsUpDown,
  FileCode,
  FileText,
  Folder,
  FolderOpen,
  Image as ImageIcon,
  Link as LinkIcon,
  Tag,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { TreeNode } from "@/types/detailTree";

interface EditorExplorerProps {
  tree: TreeNode[];
  activeNodeId: string;
  onSelectNode: (node: TreeNode) => void;
  workspaceName: string;
}

/**
 * Format node label to read like an authentic project file or folder name
 */
export function formatFileLabel(node: TreeNode): string {
  if (node.type === "folder" || (node.children && node.children.length > 0)) {
    return node.label;
  }

  const raw = node.label.trim();
  const lower = raw.toLowerCase();

  if (lower === "description") return "README.md";
  if (lower === "summary") return "summary.md";
  if (lower === "status" || lower.startsWith("status:")) return "status.env";
  if (lower === "technologies" || lower === "skills") return "stack.json";
  if (lower === "configuration") return "config.env";
  if (lower === "execution") return "run.sh";
  if (lower === "operational phases") return "phases.md";
  if (lower === "period" || lower.startsWith("period:")) return "timeline.env";

  if (
    raw.endsWith(".md") ||
    raw.endsWith(".json") ||
    raw.endsWith(".env") ||
    raw.endsWith(".sh") ||
    raw.endsWith(".ts")
  ) {
    return raw;
  }

  // Convert multi-word labels like "Operational Phases" to "operational-phases.md"
  if (node.payload?.type === "text" || node.payload?.type === "list") {
    return `${raw.toLowerCase().replace(/\s+/g, "-")}.md`;
  }
  if (node.payload?.type === "tags") {
    return `${raw.toLowerCase().replace(/\s+/g, "-")}.json`;
  }
  if (node.payload?.type === "property") {
    return `${raw.toLowerCase().replace(/[:\s]+/g, "-")}.env`;
  }

  return raw;
}

function getFileIcon(node: TreeNode) {
  if (node.type === "folder" || (node.children && node.children.length > 0)) {
    return null;
  }

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
  if (node.payload?.type === "link") {
    return <LinkIcon className="w-3.5 h-3.5 text-[#58a6ff]" />;
  }

  return <FileText className="w-3.5 h-3.5 text-[#8e8374]" />;
}

interface ExplorerNodeProps {
  node: TreeNode;
  depth: number;
  activeNodeId: string;
  onSelectNode: (node: TreeNode) => void;
  expandedFolders: Set<string>;
  onToggleFolder: (folderId: string) => void;
}

function ExplorerNode({
  node,
  depth,
  activeNodeId,
  onSelectNode,
  expandedFolders,
  onToggleFolder,
}: ExplorerNodeProps) {
  const isFolder =
    node.type === "folder" ||
    Boolean(node.children && node.children.length > 0);
  const isExpanded = expandedFolders.has(node.id);
  const isActive = node.id === activeNodeId;
  const displayLabel = formatFileLabel(node);
  const icon = getFileIcon(node);

  const handleClick = () => {
    if (isFolder) {
      onToggleFolder(node.id);
    } else {
      onSelectNode(node);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className={`w-full text-left group flex items-center gap-1.5 py-1 px-2 text-xs font-mono select-none cursor-pointer transition-colors ${
          isActive
            ? "bg-[#1e1a16] text-[#f3ebdd] border-l-2 border-[#d9a55b] font-medium"
            : "text-[#8e8374] hover:text-[#b9ae9d] hover:bg-[#161311]/80 border-l-2 border-transparent"
        }`}
        style={{ paddingLeft: `${Math.max(8, depth * 14 + 8)}px` }}
      >
        {isFolder ? (
          <>
            <span className="w-3 h-3 flex items-center justify-center shrink-0 opacity-70 group-hover:opacity-100">
              {isExpanded ? (
                <ChevronDown className="w-3 h-3 text-[#b9ae9d]" />
              ) : (
                <ChevronRight className="w-3 h-3 text-[#8e8374]" />
              )}
            </span>
            <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
              {isExpanded ? (
                <FolderOpen className="w-3.5 h-3.5 text-[#d9a55b]" />
              ) : (
                <Folder className="w-3.5 h-3.5 text-[#8e8374]" />
              )}
            </span>
          </>
        ) : (
          <>
            <span className="w-3 h-3 shrink-0" />
            <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
              {icon}
            </span>
          </>
        )}
        <span className="truncate">{displayLabel}</span>
      </button>

      {isFolder && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <ExplorerNode
              key={child.id}
              node={child}
              depth={depth + 1}
              activeNodeId={activeNodeId}
              onSelectNode={onSelectNode}
              expandedFolders={expandedFolders}
              onToggleFolder={onToggleFolder}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function EditorExplorer({
  tree,
  activeNodeId,
  onSelectNode,
  workspaceName,
}: EditorExplorerProps) {
  // Collect all folder IDs
  const allFolderIds = useMemo(() => {
    const ids: string[] = [];
    const traverse = (nodes: TreeNode[]) => {
      for (const n of nodes) {
        if (n.type === "folder" || (n.children && n.children.length > 0)) {
          ids.push(n.id);
        }
        if (n.children) traverse(n.children);
      }
    };
    traverse(tree);
    return ids;
  }, [tree]);

  // Default expand all folders so files are immediately browsable
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    () => new Set(allFolderIds),
  );

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  };

  const expandAll = () => setExpandedFolders(new Set(allFolderIds));
  const collapseAll = () => setExpandedFolders(new Set());

  return (
    <aside className="w-60 lg:w-64 shrink-0 flex flex-col border-r border-[#2f2923] bg-[#120f0d] select-none h-full overflow-hidden">
      {/* Explorer Title Bar */}
      <div className="shrink-0 h-9 px-3 flex items-center justify-between border-b border-[#2f2923] bg-[#161311]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#b9ae9d]">
            Explorer
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={expandAll}
            className="p-1 rounded hover:bg-[#1e1a16] text-[#8e8374] hover:text-[#f3ebdd] transition-colors"
            title="Expand All Folders"
          >
            <ChevronsUpDown className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="p-1 rounded hover:bg-[#1e1a16] text-[#8e8374] hover:text-[#f3ebdd] transition-colors"
            title="Collapse All Folders"
          >
            <ChevronsDownUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Workspace Section Header */}
      <div className="shrink-0 px-3 py-1.5 flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-[#d9a55b] uppercase bg-[#14110f] border-b border-[#2f2923]/60">
        <span className="w-1.5 h-1.5 rounded-full bg-[#d9a55b]" />
        <span className="truncate">{workspaceName}</span>
      </div>

      {/* File Tree List */}
      <div className="flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#2f2923] [&::-webkit-scrollbar-thumb]:rounded-full">
        {tree.map((node) => (
          <ExplorerNode
            key={node.id}
            node={node}
            depth={0}
            activeNodeId={activeNodeId}
            onSelectNode={onSelectNode}
            expandedFolders={expandedFolders}
            onToggleFolder={toggleFolder}
          />
        ))}
      </div>
    </aside>
  );
}
