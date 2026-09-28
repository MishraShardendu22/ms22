import { ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageSearch } from "@/component/Search";
import { DETAIL_TREE_VIEW_THEME_CONFIG } from "@/constants/theme";
import { BADGE_VARIANTS } from "@/static/ui";
import type { DetailTreeData } from "@/types/detailTree";
import { getLinkLabel } from "@/utils/linkDetection";
import { ExpandableTreeSection } from "./ExpandableTreeSection";
import { TreeContainer } from "./TreeContainer";

interface DetailTreeViewProps {
  data: DetailTreeData;
}

export function DetailTreeView({ data }: DetailTreeViewProps) {
  const colors = DETAIL_TREE_VIEW_THEME_CONFIG[data.theme];
  const hasTree = data.tree && data.tree.length > 0;
  const hasSections = data.sections && data.sections.length > 0;

  return (
    <div className="h-screen flex flex-col relative z-10">
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-lines opacity-40" />
      {/* VS Code-style Header Bar */}
      <header
        className={`shrink-0 px-4 py-3 ${colors.headerBg} border-b ${colors.headerBorder} backdrop-blur-sm`}
      >
        <div className="max-w-screen-2xl flex items-center gap-4">
          {/* Back Navigation */}
          <Link href={data.backLink.href}>
            <button
              type="button"
              className={`flex items-center gap-2 px-3 py-1.5 text-sm bg-[#1e1a16] border border-[#2f2923] text-[#8e8374] rounded-md ${colors.hover} ${colors.accent} transition-all`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{data.backLink.label}</span>
            </button>
          </Link>

          {/* Title Block */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {data.logo && (
              <div className="w-8 h-8 rounded-md bg-[#1e1a16] border border-[#2f2923] flex items-center justify-center overflow-hidden shrink-0">
                <Image
                  src={data.logo}
                  alt={data.title}
                  width={32}
                  height={32}
                  className="object-contain p-1"
                />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg font-semibold text-[#f3ebdd] truncate">
                  {data.title}
                </h1>
                {data.badge && (
                  <span
                    className={`px-2 py-0.5 text-xs font-medium border rounded-full ${BADGE_VARIANTS[data.badge.variant]}`}
                  >
                    {data.badge.label}
                  </span>
                )}
              </div>
              {data.subtitle && (
                <p className={`text-sm ${colors.accent} truncate`}>
                  {data.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          {data.links.length > 0 && (
            <div className="hidden md:flex items-center gap-2">
              {data.links.slice(0, 3).map((link) => {
                const label = getLinkLabel(link.type);
                return (
                  <Link
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium ${colors.bg} ${colors.accent} border ${colors.border} rounded-md hover:bg-opacity-20 transition-colors`}
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>{link.label || label}</span>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Page Search Button */}
          <PageSearch defaultFilter={data.entityType} />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Tree View */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#0e0c0a]">
          {/* VS Code-style Tab Bar */}
          <div className="shrink-0 flex items-center px-3 h-9 bg-[#161311] border-b border-[#2f2923]">
            <div
              className={`flex items-center gap-2 px-3 py-1 text-sm ${colors.accent} bg-[#0e0c0a] border-t-2 border-[#d9a55b] rounded-t-sm -mb-px`}
            >
              <span className="w-3 h-3 opacity-60">
                {data.entityType === "project" && "📁"}
                {data.entityType === "certificate" && "📜"}
                {data.entityType === "experience" && "💼"}
                {data.entityType === "volunteer" && "🤝"}
              </span>
              <span className="truncate max-w-50">{data.title}</span>
            </div>
          </div>

          {/* Tree Content */}
          <div className="flex-1 overflow-hidden">
            {hasTree ? (
              <TreeContainer nodes={data.tree} theme={data.theme} />
            ) : hasSections ? (
              /* Fallback to legacy sections */
              <div className="p-4 space-y-4 overflow-auto h-full">
                {data.sections?.map((section) => (
                  <ExpandableTreeSection
                    key={section.id}
                    section={section}
                    theme={data.theme}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-[#8e8374]">
                No content available
              </div>
            )}
          </div>
        </main>

        {/* Right Panel - Sidebar (Desktop only) */}
        <aside className="hidden lg:flex w-72 xl:w-80 shrink-0 flex-col border-l border-[#2f2923] bg-[#161311]">
          <div className="shrink-0 h-9 flex items-center px-4 border-b border-[#2f2923] bg-[#1e1a16]/60">
            <span className="text-xs font-medium text-[#8e8374] uppercase tracking-wide">
              Details
            </span>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-6">
            {/* Quick Meta */}
            {data.quickMeta && data.quickMeta.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-medium text-[#8e8374] uppercase tracking-wide">
                  Summary
                </h3>
                {data.quickMeta.map((field) => (
                  <div key={field.label} className="flex flex-col gap-0.5">
                    <span className="text-xs text-[#8e8374]">
                      {field.label}
                    </span>
                    <span className="text-sm text-[#f3ebdd]">
                      {field.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Links (mobile fallback + full list) */}
            {data.links.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Links
                </h3>
                <div className="space-y-2">
                  {data.links.map((link) => {
                    const label = getLinkLabel(link.type);
                    return (
                      <Link
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-3 py-2 text-sm ${colors.bg} ${colors.accent} border ${colors.border} rounded-lg hover:bg-opacity-20 transition-colors`}
                      >
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{link.label || label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Technologies */}
            {data.technologies && data.technologies.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {data.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-1 text-xs font-medium ${colors.bg} ${colors.accent} rounded border ${colors.border}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
