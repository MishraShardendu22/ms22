"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  DETAIL_TREE_THEME_CONFIG,
  type DetailTreeTheme,
} from "@/constants/theme";
import type { TreeNode, TreeNodePayload } from "@/types/detailTree";
import { TreeNodeIcon } from "./TreeNodeIcon";

// =============================================================================
// Chevron Component
// =============================================================================

interface ChevronProps {
  isExpanded: boolean;
  className?: string;
}

function Chevron({ isExpanded, className = "" }: ChevronProps) {
  return (
    <svg
      className={`w-3 h-3 transition-transform duration-150 ${isExpanded ? "rotate-90" : ""} ${className}`}
      viewBox="0 0 16 16"
      fill="currentColor"
      role="img"
      aria-hidden="true"
    >
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
}

// =============================================================================
// Tree Node Content Renderers
// =============================================================================

interface ContentRendererProps {
  payload: TreeNodePayload;
  theme: DetailTreeTheme;
}

function ContentRenderer({ payload, theme }: ContentRendererProps) {
  const colors = DETAIL_TREE_THEME_CONFIG[theme];

  switch (payload.type) {
    case "text":
      return (
        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap pl-6">
          {payload.value}
        </p>
      );

    case "property":
      return (
        <div className="flex items-baseline gap-2 pl-6 text-sm">
          <span className="text-gray-500">{payload.key}:</span>
          <span className="text-gray-200">{payload.value}</span>
        </div>
      );

    case "list":
      return (
        <ul className="space-y-1 pl-6">
          {payload.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <span
                className={`w-1 h-1 rounded-full ${colors.bullet} mt-2 shrink-0`}
              />
              <span className="text-gray-300 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "timeline":
      return (
        <div className="pl-6 space-y-3">
          {payload.items.map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <div
                className={`w-2 h-2 rounded-full ${colors.bullet} mt-1.5 shrink-0`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-gray-100 font-medium text-sm">
                  {item.title}
                </p>
                {item.subtitle && (
                  <p className="text-gray-400 text-xs mt-0.5">
                    {item.subtitle}
                  </p>
                )}
                <p className="text-gray-500 text-xs mt-0.5">
                  {item.startDate} —{" "}
                  {item.endDate || (item.isCurrent ? "Present" : "N/A")}
                </p>
              </div>
            </div>
          ))}
        </div>
      );

    case "tags":
      return (
        <div className="flex flex-wrap gap-1.5 pl-6">
          {payload.items.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.5 text-xs font-medium ${colors.bg} ${colors.text} rounded border ${colors.border}`}
            >
              {tag}
            </span>
          ))}
        </div>
      );

    case "link":
      return (
        <Link
          href={payload.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 pl-6 text-sm ${colors.text} ${colors.textHover} transition-colors`}
        >
          <TreeNodeIcon icon="link" className="w-3 h-3" />
          <span className="underline underline-offset-2">{payload.url}</span>
        </Link>
      );

    case "image":
      return (
        <div className="pl-6">
          <a
            href={payload.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative aspect-video max-w-md rounded-lg overflow-hidden bg-[#1e1a16] border border-[#2f2923] hover:border-[#d9a55b]/40 transition-colors group"
          >
            <Image
              src={payload.url}
              alt={payload.alt}
              className="object-cover group-hover:opacity-90 transition-opacity"
              fill
              sizes="(max-width: 768px) 100vw, 448px"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
              <span className="text-[#f3ebdd] text-sm font-medium">
                View Full Image
              </span>
            </div>
          </a>
        </div>
      );

    case "images":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pl-6">
          {payload.urls.map((url) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative aspect-video rounded-lg overflow-hidden bg-[#1e1a16] border border-[#2f2923] hover:border-[#d9a55b]/40 transition-colors group"
            >
              <Image
                src={url}
                alt={payload.alt}
                className="object-cover group-hover:opacity-90 transition-opacity"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <span className="text-[#f3ebdd] text-xs font-medium">View</span>
              </div>
            </a>
          ))}
        </div>
      );

    case "project":
      return (
        <Link
          href={`/projects/${payload.id}`}
          className="block pl-6 p-3 bg-[#1e1a16] rounded-lg border border-[#2f2923] hover:border-[#d9a55b]/40 transition-colors"
        >
          <h4 className={`text-sm font-medium ${colors.text}`}>
            {payload.name}
          </h4>
          {payload.description && (
            <p className="text-[#8e8374] text-xs mt-1 line-clamp-2">
              {payload.description}
            </p>
          )}
          {payload.technologies && payload.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {payload.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-1.5 py-0.5 text-xs bg-gray-700/50 text-gray-300 rounded"
                >
                  {tech}
                </span>
              ))}
              {payload.technologies.length > 4 && (
                <span className="px-1.5 py-0.5 text-xs bg-gray-700/50 text-gray-400 rounded">
                  +{payload.technologies.length - 4}
                </span>
              )}
            </div>
          )}
        </Link>
      );

    default:
      return null;
  }
}

// =============================================================================
// Tree Row Component
// =============================================================================

interface TreeRowProps {
  node: TreeNode;
  depth: number;
  theme: DetailTreeTheme;
  isLast: boolean;
  parentPath: boolean[];
  onToggle: (nodeId: string) => void;
  expandedNodes: Set<string>;
  focusedNodeId: string | null;
  onFocus: (nodeId: string) => void;
}

function TreeRow({
  node,
  depth,
  theme,
  isLast,
  parentPath,
  onToggle,
  expandedNodes,
  focusedNodeId,
  onFocus,
}: TreeRowProps) {
  const colors = DETAIL_TREE_THEME_CONFIG[theme];
  const hasChildren = node.children && node.children.length > 0;
  const isFolder = node.type === "folder" || hasChildren;
  const isExpanded = expandedNodes.has(node.id);
  const isFocused = focusedNodeId === node.id;
  const rowRef = useRef<HTMLDivElement>(null);

  // Scroll into view when focused
  useEffect(() => {
    if (isFocused && rowRef.current) {
      rowRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isFocused]);

  const handleClick = useCallback(() => {
    onFocus(node.id);
    if (isFolder) {
      onToggle(node.id);
    }
  }, [node.id, isFolder, onFocus, onToggle]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  // Determine icon
  let iconType = node.icon;
  if (!iconType) {
    if (isFolder) {
      iconType = isExpanded ? "folder-open" : "folder";
    } else {
      iconType = "file";
    }
  }

  return (
    <>
      {/* Tree Row */}
      <div
        ref={rowRef}
        role="treeitem"
        tabIndex={isFocused ? 0 : -1}
        aria-expanded={isFolder ? isExpanded : undefined}
        aria-selected={isFocused}
        className={`
          group flex items-center min-h-7 cursor-pointer select-none
          ${colors.bgHover} transition-colors
          ${isFocused ? "bg-[#1e1a16] ring-1 ring-[#d9a55b]/40" : ""}
        `}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {/* Indentation guides */}
        <div className="flex items-center shrink-0">
          {parentPath.map((showLine, depthIndex) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: depth index is semantically meaningful here
              key={`depth-${depthIndex}-${showLine}`}
              className="w-5 h-7 flex justify-center shrink-0"
            >
              {showLine && (
                <div className={`w-px h-full border-l ${colors.line}`} />
              )}
            </div>
          ))}

          {/* Current level connector */}
          <div className="w-5 h-7 flex items-center justify-center shrink-0 relative">
            {depth > 0 && (
              <>
                {/* Vertical line */}
                <div
                  className={`absolute left-1/2 w-px ${colors.line} border-l ${
                    isLast ? "h-1/2 top-0" : "h-full"
                  }`}
                />
                {/* Horizontal line */}
                <div
                  className={`absolute left-1/2 top-1/2 w-1/2 h-px ${colors.line} border-t`}
                />
              </>
            )}
          </div>
        </div>

        {/* Expand/Collapse chevron */}
        <div className="w-4 h-4 flex items-center justify-center shrink-0">
          {isFolder ? (
            <Chevron
              isExpanded={isExpanded}
              className={`${colors.text} opacity-60`}
            />
          ) : (
            <span className="w-1.5 h-1.5" />
          )}
        </div>

        {/* Icon */}
        <div
          className={`w-5 h-5 flex items-center justify-center shrink-0 ${colors.text} opacity-80`}
        >
          <TreeNodeIcon icon={iconType} />
        </div>

        {/* Label */}
        <span className="text-sm text-gray-200 group-hover:text-white transition-colors truncate py-1 pr-4">
          {node.label}
        </span>
      </div>

      {/* Content (for leaf nodes with payload) */}
      {!isFolder && node.payload && (
        <div
          className="pb-2"
          style={{ paddingLeft: `${(depth + 1) * 20 + 24}px` }}
        >
          <ContentRenderer payload={node.payload} theme={theme} />
        </div>
      )}

      {/* Content for folder nodes with payload (like images) - shown when expanded */}
      {isFolder && isExpanded && node.payload && (
        <div
          className="pb-2"
          style={{ paddingLeft: `${(depth + 1) * 20 + 24}px` }}
        >
          <ContentRenderer payload={node.payload} theme={theme} />
        </div>
      )}

      {/* Children */}
      {isFolder && isExpanded && node.children && (
        <div>
          {node.children.map((child, idx) => (
            <TreeRow
              key={child.id}
              node={child}
              depth={depth + 1}
              theme={theme}
              isLast={node.children ? idx === node.children.length - 1 : false}
              parentPath={[...parentPath, !isLast]}
              onToggle={onToggle}
              expandedNodes={expandedNodes}
              focusedNodeId={focusedNodeId}
              onFocus={onFocus}
            />
          ))}
        </div>
      )}
    </>
  );
}

// =============================================================================
// Main Tree Container
// =============================================================================

interface TreeContainerProps {
  nodes: TreeNode[];
  theme: DetailTreeTheme;
}

export function TreeContainer({ nodes, theme }: TreeContainerProps) {
  // Initialize expanded state from defaultExpanded
  const getInitialExpanded = useCallback(() => {
    const expanded = new Set<string>();
    const traverse = (nodeList: TreeNode[]) => {
      for (const node of nodeList) {
        if (node.defaultExpanded) {
          expanded.add(node.id);
        }
        if (node.children) {
          traverse(node.children);
        }
      }
    };
    traverse(nodes);
    return expanded;
  }, [nodes]);

  const [expandedNodes, setExpandedNodes] =
    useState<Set<string>>(getInitialExpanded);
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback((nodeId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }, []);

  const handleFocus = useCallback((nodeId: string) => {
    setFocusedNodeId(nodeId);
  }, []);

  // Flatten visible nodes for keyboard navigation
  const getVisibleNodes = useCallback((): TreeNode[] => {
    const visible: TreeNode[] = [];
    const traverse = (nodeList: TreeNode[]) => {
      for (const node of nodeList) {
        visible.push(node);
        if (node.children && expandedNodes.has(node.id)) {
          traverse(node.children);
        }
      }
    };
    traverse(nodes);
    return visible;
  }, [nodes, expandedNodes]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const visibleNodes = getVisibleNodes();
      const currentIndex = focusedNodeId
        ? visibleNodes.findIndex((n) => n.id === focusedNodeId)
        : -1;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (currentIndex < visibleNodes.length - 1) {
            setFocusedNodeId(visibleNodes[currentIndex + 1].id);
          }
          break;

        case "ArrowUp":
          e.preventDefault();
          if (currentIndex > 0) {
            setFocusedNodeId(visibleNodes[currentIndex - 1].id);
          }
          break;

        case "ArrowRight":
          e.preventDefault();
          if (focusedNodeId) {
            const node = visibleNodes.find((n) => n.id === focusedNodeId);
            if (node?.children && !expandedNodes.has(focusedNodeId)) {
              handleToggle(focusedNodeId);
            } else if (node?.children && node.children.length > 0) {
              setFocusedNodeId(node.children[0].id);
            }
          }
          break;

        case "ArrowLeft":
          e.preventDefault();
          if (focusedNodeId && expandedNodes.has(focusedNodeId)) {
            handleToggle(focusedNodeId);
          }
          break;

        case "Home":
          e.preventDefault();
          if (visibleNodes.length > 0) {
            setFocusedNodeId(visibleNodes[0].id);
          }
          break;

        case "End":
          e.preventDefault();
          if (visibleNodes.length > 0) {
            setFocusedNodeId(visibleNodes[visibleNodes.length - 1].id);
          }
          break;
      }
    },
    [focusedNodeId, expandedNodes, getVisibleNodes, handleToggle],
  );

  // Expand all / Collapse all
  const expandAll = useCallback(() => {
    const allIds = new Set<string>();
    const traverse = (nodeList: TreeNode[]) => {
      for (const node of nodeList) {
        if (node.children) {
          allIds.add(node.id);
          traverse(node.children);
        }
      }
    };
    traverse(nodes);
    setExpandedNodes(allIds);
  }, [nodes]);

  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set());
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#2f2923] bg-[#161311]">
        <button
          type="button"
          onClick={expandAll}
          className="px-2 py-1 text-xs text-[#8e8374] hover:text-[#f3ebdd] hover:bg-[#1e1a16] rounded transition-colors"
        >
          Expand All
        </button>
        <button
          type="button"
          onClick={collapseAll}
          className="px-2 py-1 text-xs text-[#8e8374] hover:text-[#f3ebdd] hover:bg-[#1e1a16] rounded transition-colors"
        >
          Collapse All
        </button>
      </div>

      {/* Tree */}
      <div
        ref={containerRef}
        role="tree"
        aria-label="Detail tree view"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="flex-1 overflow-auto py-2 focus:outline-none"
      >
        {nodes.map((node, idx) => (
          <TreeRow
            key={node.id}
            node={node}
            depth={0}
            theme={theme}
            isLast={idx === nodes.length - 1}
            parentPath={[]}
            onToggle={handleToggle}
            expandedNodes={expandedNodes}
            focusedNodeId={focusedNodeId}
            onFocus={handleFocus}
          />
        ))}
      </div>
    </div>
  );
}
