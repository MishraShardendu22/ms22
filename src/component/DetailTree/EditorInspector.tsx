"use client";

import {
  Activity,
  Code2,
  Cpu,
  ExternalLink,
  Globe,
  Layers,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import { GitHubIcon } from "@/component/Icons";
import { BADGE_VARIANTS } from "@/static/ui";
import type { DetailTreeData } from "@/types/detailTree";
import { getLinkLabel } from "@/utils/linkDetection";

interface EditorInspectorProps {
  data: DetailTreeData;
  isOpen: boolean;
  onToggle: () => void;
}

export function EditorInspector({
  data,
  isOpen,
  onToggle,
}: EditorInspectorProps) {
  if (!isOpen) return null;

  // Find primary external links
  const repoLink = data.links.find(
    (l) =>
      l.type === "github" ||
      l.label.toLowerCase().includes("code") ||
      l.label.toLowerCase().includes("repo"),
  );
  const liveDemoLink = data.links.find(
    (l) =>
      l.type === "live-demo" ||
      l.type === "certificate" ||
      l.label.toLowerCase().includes("live") ||
      l.label.toLowerCase().includes("demo") ||
      l.label.toLowerCase().includes("preview"),
  );

  return (
    <aside
      className="w-72 xl:w-80 shrink-0 flex flex-col border-l border-[#2f2923] bg-[#120f0d] select-none h-full overflow-hidden transition-all duration-200"
      aria-label="Inspector Panel"
    >
      {/* Panel Header */}
      <div className="shrink-0 h-9 px-3 flex items-center justify-between border-b border-[#2f2923] bg-[#161311]">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-[#d9a55b]" />
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#b9ae9d]">
            Telemetry & Specs
          </span>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="p-1 rounded hover:bg-[#1e1a16] text-[#8e8374] hover:text-[#f3ebdd] transition-colors"
          title="Close Inspector"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#2f2923] [&::-webkit-scrollbar-thumb]:rounded-full">
        {/* Live Status Beacon */}
        <div className="p-3 rounded-lg bg-[#161311] border border-[#2f2923] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-mono font-medium text-[#f3ebdd]">
                System Active
              </span>
              <span className="text-[10px] font-mono text-[#8e8374]">
                Observatory v4.1 • Verified
              </span>
            </div>
          </div>
          {data.badge && (
            <span
              className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold border rounded-full ${BADGE_VARIANTS[data.badge.variant]}`}
            >
              {data.badge.label}
            </span>
          )}
        </div>

        {/* Primary Action Buttons */}
        {(liveDemoLink || repoLink) && (
          <div className="space-y-2">
            {liveDemoLink && (
              <a
                href={liveDemoLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-[#d9a55b] hover:bg-[#e6b56c] text-[#0e0c0a] font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-[#d9a55b]/10 transition-all cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">
                  {liveDemoLink.label || "Launch Live System"}
                </span>
                <ExternalLink className="w-3 h-3 shrink-0 ml-auto opacity-70" />
              </a>
            )}

            {repoLink && (
              <a
                href={repoLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-[#1e1a16] hover:bg-[#25201b] border border-[#2f2923] hover:border-[#d9a55b]/40 text-[#f3ebdd] font-mono text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <GitHubIcon className="w-3.5 h-3.5 shrink-0 text-[#b9ae9d]" />
                <span className="truncate">
                  {repoLink.label || "Source Code"}
                </span>
                <ExternalLink className="w-3 h-3 shrink-0 ml-auto text-[#8e8374]" />
              </a>
            )}
          </div>
        )}

        {/* Quick Meta Specifications */}
        {data.quickMeta && data.quickMeta.length > 0 && (
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-[#8e8374] uppercase">
              <Cpu className="w-3 h-3 text-[#d9a55b]" />
              <span>System Metadata</span>
            </div>
            <div className="rounded-lg border border-[#2f2923] bg-[#161311] divide-y divide-[#2f2923]/60 text-xs font-mono">
              {data.quickMeta.map((meta) => (
                <div
                  key={meta.label}
                  className="px-3 py-2 flex items-center justify-between gap-2"
                >
                  <span className="text-[#8e8374] truncate">{meta.label}</span>
                  <span className="text-[#f3ebdd] font-medium text-right truncate">
                    {meta.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies / Stack Chips */}
        {data.technologies && data.technologies.length > 0 && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-[#8e8374] uppercase">
                <Layers className="w-3 h-3 text-[#58a6ff]" />
                <span>Tech Stack</span>
              </div>
              <span className="text-[10px] font-mono text-[#8e8374]">
                {data.technologies.length} modules
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {data.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-[#1a1613] text-[#b9ae9d] border border-[#2f2923] hover:border-[#d9a55b]/40 hover:text-[#f3ebdd] transition-colors select-text"
                >
                  <Tag className="w-2.5 h-2.5 text-[#d9a55b]/70" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* All External Links */}
        {data.links && data.links.length > 0 && (
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-[#8e8374] uppercase">
              <Code2 className="w-3 h-3 text-[#3fb950]" />
              <span>Endpoints & Links</span>
            </div>
            <div className="space-y-1.5">
              {data.links.map((link) => {
                const label = getLinkLabel(link.type);
                return (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between px-3 py-2 rounded-lg bg-[#161311] border border-[#2f2923] hover:border-[#d9a55b]/40 transition-colors text-xs font-mono"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[#8e8374] group-hover:text-[#d9a55b] transition-colors">
                        ↗
                      </span>
                      <span className="text-[#b9ae9d] group-hover:text-[#f3ebdd] truncate">
                        {link.label || label}
                      </span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-[#8e8374] group-hover:text-[#d9a55b] shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Workspace Footnote */}
        <div className="pt-2 border-t border-[#2f2923]/60 flex items-center justify-between text-[10px] font-mono text-[#8e8374]">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#d9a55b]/70" />
            Workspace Node
          </span>
          <span className="capitalize">{data.entityType}</span>
        </div>
      </div>
    </aside>
  );
}
