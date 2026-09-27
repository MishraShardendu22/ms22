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
    <div className="group relative block w-full p-4 sm:p-5 hover:bg-[#1e1a16]/70 transition-all duration-200">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Stack: Leading Icon Tile + Title + Scope + Description */}
        <div className="flex items-start gap-4 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-lg bg-[#1e1a16] border border-[#2f2923] flex items-center justify-center shrink-0 text-[#d9a55b] group-hover:border-[#d9a55b]/40 transition-colors">
            <CategoryIcon className="w-5 h-5" />
          </div>

          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/skills/${skill.name}`}
                className="font-mono text-sm sm:text-base font-semibold text-[#f3ebdd] group-hover:text-[#d9a55b] transition-colors hover:underline underline-offset-4"
              >
                {skill.name}
              </Link>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${scopeBadge.className}`}
              >
                {scopeBadge.label}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#1e1a16] text-[#8e8374] border border-[#2f2923]">
                {skill.category}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#b9ae9d] leading-relaxed line-clamp-2 max-w-3xl">
              {skill.description}
            </p>

            {/* Target Agent Compatibility Chips */}
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#161311] text-[10px] font-mono text-[#8e8374] border border-[#2f2923]">
                <Bot className="w-2.5 h-2.5 text-[#d9a55b]" />
                <span>AGY</span>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#161311] text-[10px] font-mono text-[#8e8374] border border-[#2f2923]">
                Claude Code
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#161311] text-[10px] font-mono text-[#8e8374] border border-[#2f2923]">
                Cursor
              </span>
            </div>
          </div>
        </div>

        {/* Right Stack: 1-Click CLI Pull & Runbook Inspect Action */}
        <div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0 self-end lg:self-center">
          {/* CLI Pull Command Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1a16] border border-[#2f2923] group-hover:border-[#413930] transition-colors">
            <span className="text-xs font-mono text-[#d9a55b] select-all truncate max-w-[200px] sm:max-w-none">
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

          <Link
            href={`/skills/${skill.name}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1e1a16] hover:bg-[#d9a55b] text-[#d9a55b] hover:text-[#0e0c0a] border border-[#2f2923] hover:border-[#d9a55b] text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm"
          >
            <span>Runbook</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
