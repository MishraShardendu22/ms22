"use client";

import {
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  Copy,
  Cpu,
  FileCode2,
  GitBranch,
  Layers,
  Palette,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { AgentSkill } from "@/lib/agentSkills";

interface AgentSkillCardProps {
  skill: AgentSkill;
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "Protocols":
      return ShieldCheck;
    case "Git Ops":
      return GitBranch;
    case "AI Engineering":
      return Cpu;
    case "DevOps & CI":
      return Terminal;
    case "Code Quality":
      return Code2;
    case "Architecture":
      return Layers;
    case "UI Design":
      return Palette;
    default:
      return FileCode2;
  }
}

function getScopeBadge(scope?: string) {
  if (!scope || scope === "generic") {
    return {
      label: "Standard Protocol",
      className: "bg-[#d9a55b]/10 text-[#d9a55b] border-[#d9a55b]/30",
    };
  }
  if (scope.startsWith("codebase-")) {
    return {
      label: "Engine Spec",
      className: "bg-[#38bdf8]/10 text-[#38bdf8] border-[#38bdf8]/30",
    };
  }
  return {
    label: "Governance",
    className: "bg-[#4caf7d]/10 text-[#4caf7d] border-[#4caf7d]/30",
  };
}

export function AgentSkillCard({ skill }: AgentSkillCardProps) {
  const [copied, setCopied] = useState(false);
  const CategoryIcon = getCategoryIcon(skill.category);
  const scopeBadge = getScopeBadge(skill.scope);
  const cliPullCommand = `skills-sync pull ${skill.name}`;

  const handleCopyCli = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(cliPullCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group relative rounded-2xl transition-all duration-300 hover:border-[#d9a55b]/40 h-full">
      {/* Ambient Starlight Glow on Hover */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#d9a55b]/15 via-[rgba(217,165,91,0.04)] to-transparent blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative h-full p-5 bg-[#161311] border border-[#2f2923] rounded-2xl flex flex-col justify-between overflow-hidden shadow-lg group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)] group-hover:border-[#d9a55b]/40 transition-all duration-300">
        <div>
          {/* Header Row: Category Badge & Scope Tag */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#1e1a16] text-[#b9ae9d] border border-[#2f2923]">
              <CategoryIcon className="w-3 h-3 text-[#d9a55b]" />
              <span>{skill.category}</span>
            </span>

            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-medium border ${scopeBadge.className}`}
            >
              {scopeBadge.label}
            </span>
          </div>

          {/* Skill Title: Clean Monospace without Truncation */}
          <Link
            href={`/skills/${skill.name}`}
            className="block mb-2.5 group/link"
          >
            <h2 className="text-sm sm:text-base font-bold font-mono text-[#f3ebdd] group-hover/link:text-[#d9a55b] transition-colors leading-snug break-words">
              {skill.name}
            </h2>
          </Link>

          {/* Target Compatibility Agents */}
          <div className="flex items-center gap-1.5 flex-wrap mb-3">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#1e1a16] text-[10px] text-[#8e8374] border border-[#2f2923]">
              <Bot className="w-2.5 h-2.5 text-[#d9a55b]" />
              <span>AGY</span>
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#1e1a16] text-[10px] text-[#8e8374] border border-[#2f2923]">
              Claude Code
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#1e1a16] text-[10px] text-[#8e8374] border border-[#2f2923]">
              Cursor
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-[#b9ae9d] leading-relaxed line-clamp-3 mb-4">
            {skill.description}
          </p>
        </div>

        {/* Action Strip: 1-Click CLI Pull & Runbook Link */}
        <div className="pt-3.5 border-t border-[#2f2923] mt-2">
          {/* CLI Pull Command Pill */}
          <div className="flex items-center justify-between gap-1.5 px-2.5 py-1 rounded-lg bg-[#1e1a16] border border-[#2f2923] mb-3 group-hover:border-[#413930] transition-colors">
            <span className="text-[11px] font-mono text-[#d9a55b] truncate select-all">
              {cliPullCommand}
            </span>
            <button
              type="button"
              onClick={handleCopyCli}
              className="text-[#8e8374] hover:text-[#f3ebdd] p-0.5 cursor-pointer shrink-0 transition-colors"
              title="Copy CLI command"
            >
              {copied ? (
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                  <Check className="w-3 h-3" />
                  <span>Copied</span>
                </div>
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          </div>

          {/* Direct Link to Runbook */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#8e8374]">
              SKILL.md
            </span>
            <Link
              href={`/skills/${skill.name}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#d9a55b] group-hover:text-[#f3ebdd] transition-colors"
            >
              <span>Inspect Runbook</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
