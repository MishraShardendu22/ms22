"use client";

import {
  ArrowUpRight,
  Code2,
  Cpu,
  GitBranch,
  Layers,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { GitHubIcon } from "@/component/Icons";
import { AgentSkillCard } from "@/component/Skills/AgentSkillCard";
import type { AgentSkill, AgentSkillsData } from "@/lib/agentSkills";

interface SkillsPageClientProps {
  initialData: AgentSkillsData;
}

const CATEGORY_ORDER = [
  "Protocols",
  "Git Ops",
  "AI Engineering",
  "DevOps & CI",
  "Code Quality",
  "Architecture",
  "UI Design",
];

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
      return Sparkles;
  }
}

export function SkillsPageClient({ initialData }: SkillsPageClientProps) {
  const router = useRouter();
  const [skills, setSkills] = useState<AgentSkill[]>(initialData.skills);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Sync state if server revalidates initialData
  useEffect(() => {
    setSkills(initialData.skills);
  }, [initialData]);

  // Automated silent background sync: checks for latest upstream commit and refreshes ISR cache
  useEffect(() => {
    let isMounted = true;

    fetch(
      "https://api.github.com/repos/MishraShardendu22/agent-skills/commits/main",
      { cache: "no-store" },
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted || !data?.sha) return;
        if (initialData.commit?.sha && initialData.commit.sha !== data.sha) {
          router.refresh();
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [router, initialData.commit?.sha]);

  // Unique categories ordered logically
  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const s of skills) {
      if (s.category) set.add(s.category);
    }
    const found = Array.from(set);
    return CATEGORY_ORDER.filter((c) => found.includes(c)).concat(
      found.filter((c) => !CATEGORY_ORDER.includes(c)),
    );
  }, [skills]);

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCat =
        selectedCategory === "all" || skill.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQ =
        !q ||
        skill.name.toLowerCase().includes(q) ||
        skill.description.toLowerCase().includes(q) ||
        skill.category.toLowerCase().includes(q) ||
        skill.scope?.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [skills, selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: skills.length };
    for (const s of skills) {
      counts[s.category] = (counts[s.category] || 0) + 1;
    }
    return counts;
  }, [skills]);

  return (
    <div className="w-full relative z-10">
      {/* Observatory Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-[#2f2923]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#1e1a16] text-[#d9a55b] border border-[#2f2923]">
              <Sparkles className="w-3 h-3 text-[#d9a55b]" />
              <span>Production Standards</span>
            </span>
            <span className="text-xs text-[#8e8374]">
              Autonomous Agent Directives
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#f3ebdd] font-heading tracking-tight">
            Agent Skills Hub
          </h1>
          <p className="text-sm text-[#8e8374] mt-1.5">
            Deterministic engineering runbooks, safety protocols, and CLI
            workflows for Antigravity, Claude Code, and Cursor.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <Link
            href="/skills/cli"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#161311] hover:bg-[#1e1a16] border border-[#2f2923] text-[#b9ae9d] hover:text-[#f3ebdd] hover:border-[#413930] transition-all text-xs font-medium shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5 text-[#d9a55b]" />
            <span>skills-sync CLI</span>
          </Link>
          <a
            href="https://github.com/MishraShardendu22/agent-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#d9a55b]/10 hover:bg-[#d9a55b]/20 border border-[#d9a55b]/30 text-[#d9a55b] hover:text-[#f3ebdd] transition-all text-xs font-medium shadow-sm"
          >
            <GitHubIcon className="w-3.5 h-3.5" />
            <span>GitHub Hub</span>
            <ArrowUpRight className="w-3 h-3 text-[#d9a55b]" />
          </a>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[#d9a55b] text-[#0e0c0a] font-semibold shadow-[0_2px_12px_rgba(217,165,91,0.25)]"
                : "bg-[#161311] text-[#b9ae9d] hover:text-[#f3ebdd] border border-[#2f2923] hover:bg-[#1e1a16]"
            }`}
          >
            All Runbooks ({categoryCounts.all ?? skills.length})
          </button>
          {categories.map((cat) => {
            const count = categoryCounts[cat] ?? 0;
            const isSelected = selectedCategory === cat;
            const CatIcon = getCategoryIcon(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#d9a55b] text-[#0e0c0a] font-semibold shadow-[0_2px_12px_rgba(217,165,91,0.25)]"
                    : "bg-[#161311] text-[#b9ae9d] hover:text-[#f3ebdd] border border-[#2f2923] hover:bg-[#1e1a16]"
                }`}
              >
                <CatIcon
                  className={`w-3.5 h-3.5 ${isSelected ? "text-[#0e0c0a]" : "text-[#d9a55b]"}`}
                />
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded ${isSelected ? "bg-black/20 text-[#0e0c0a]" : "bg-[#1e1a16] text-[#8e8374]"}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8374]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search runbooks, tags..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#161311] border border-[#2f2923] text-xs text-[#f3ebdd] placeholder-[#8e8374] focus:outline-none focus:border-[#d9a55b] focus:ring-1 focus:ring-[#d9a55b]/40 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8e8374] hover:text-[#f3ebdd] p-1 cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Skills Grid */}
      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          {filteredSkills.map((skill) => (
            <AgentSkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-[#161311] border border-[#2f2923] rounded-2xl mb-16">
          <Search className="w-10 h-10 text-[#8e8374] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#f3ebdd] mb-1">
            No matching runbooks found
          </h3>
          <p className="text-xs text-[#8e8374] mb-5">
            We couldn't find any agent skills matching &ldquo;{searchQuery}
            &rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="px-4 py-2 rounded-xl bg-[#d9a55b] hover:bg-[#e6b56c] text-[#0e0c0a] text-xs font-bold transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
