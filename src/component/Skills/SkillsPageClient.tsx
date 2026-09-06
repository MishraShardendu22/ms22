"use client";

import { ArrowUpRight, Check, Copy, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { GitHubIcon } from "@/component/Icons";
import type {
  AgentRepoCommit,
  AgentSkill,
  AgentSkillsData,
} from "@/lib/agentSkills";
import { SkillDetailModal } from "./SkillDetailModal";

const INSTALL_CMD =
  "curl -fsSL https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/scripts/install.sh | bash";

interface SkillsPageClientProps {
  initialData: AgentSkillsData;
}

export function SkillsPageClient({ initialData }: SkillsPageClientProps) {
  const router = useRouter();
  const [skills, setSkills] = useState<AgentSkill[]>(initialData.skills);
  const [commit, setCommit] = useState<AgentRepoCommit | null>(
    initialData.commit,
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<AgentSkill | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Sync state if server revalidates initialData
  useEffect(() => {
    setSkills(initialData.skills);
    if (initialData.commit) {
      setCommit(initialData.commit);
    }
  }, [initialData]);

  // Automated silent background sync: checks for latest upstream commit without any manual button
  useEffect(() => {
    let isMounted = true;

    fetch(
      "https://api.github.com/repos/MishraShardendu22/agent-skills/commits/main",
      { cache: "no-store" },
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted || !data?.sha) return;
        const sha: string = data.sha;
        setCommit((prev) => {
          if (prev?.sha === sha) return prev;
          // Refresh server components to pull latest ISR skills payload
          router.refresh();
          return {
            sha,
            shortSha: sha.slice(0, 7),
            message:
              data.commit?.message?.split("\n")[0] || "Update agent skills",
            author:
              data.commit?.author?.name ||
              data.author?.login ||
              "Shardendu Mishra",
            date: data.commit?.author?.date || new Date().toISOString(),
            relativeTime: "just now",
            verified: Boolean(data.commit?.verification?.verified),
            htmlUrl:
              data.html_url ||
              `https://github.com/MishraShardendu22/agent-skills/commit/${sha}`,
          };
        });
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleCopy = (text: string, key: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const s of skills) {
      if (s.category) set.add(s.category);
    }
    return Array.from(set);
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
        skill.category.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [skills, selectedCategory, searchQuery]);

  return (
    <div className="w-full relative z-10">
      {/* Header matching ServerPageHeader style */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white font-heading">
            Agent Skills
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            <span className="text-violet-400 font-medium">
              {filteredSkills.length}
            </span>{" "}
            {filteredSkills.length === 1 ? "skill" : "skills"}
            {selectedCategory !== "all"
              ? ` in ${selectedCategory.replace(/^\d+\.\s*/, "")}`
              : ` across ${categories.length} categories`}{" "}
            • Upstream:{" "}
            <a
              href="https://github.com/MishraShardendu22/agent-skills"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white underline decoration-gray-700 hover:decoration-violet-400 transition-colors"
            >
              MishraShardendu22/agent-skills
            </a>
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/skills/cli"
            className="inline-flex items-center px-3 py-1.5 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 text-violet-300 hover:text-white transition-all text-xs font-medium"
          >
            <span>skills-sync CLI</span>
          </Link>
          <a
            href="https://github.com/MishraShardendu22/agent-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900/80 hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white transition-all text-xs font-medium"
          >
            <GitHubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-gray-400" />
          </a>
        </div>
      </div>

      {/* Upstream Status & One-Line Install Strip */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3 bg-gray-900/80 border border-gray-800/80 rounded-xl mb-6 text-xs text-gray-400">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <span className="text-gray-300 font-medium">Upstream commit:</span>
          {commit ? (
            <>
              <a
                href={commit.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-violet-400 hover:underline"
              >
                {commit.shortSha}
              </a>
              <span className="text-gray-500 truncate max-w-sm hidden sm:inline">
                — {commit.message}
              </span>
              <span className="text-gray-500 text-[11px]">
                ({commit.relativeTime})
              </span>
            </>
          ) : (
            <span className="font-mono text-violet-400">main</span>
          )}
          <span className="text-gray-600 hidden md:inline">•</span>
          <span className="text-[11px] text-gray-500 font-mono hidden md:inline">
            Automated sync active
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-gray-500 hidden md:inline">Install:</span>
          <code className="px-2.5 py-1 rounded bg-gray-950 border border-gray-800 font-mono text-[11px] text-gray-300 select-all truncate max-w-xs sm:max-w-md">
            {INSTALL_CMD}
          </code>
          <button
            type="button"
            onClick={() => handleCopy(INSTALL_CMD, "quick-install")}
            className="p-1.5 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer shrink-0"
            title="Copy install command"
          >
            {copiedKey === "quick-install" ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Category Filter Pills & Search Input */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === "all"
                ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                : "bg-gray-900/60 text-gray-400 hover:text-gray-200 border border-gray-800/80 hover:bg-gray-800/50"
            }`}
          >
            All ({skills.length})
          </button>
          {categories.map((cat) => {
            const count = skills.filter((s) => s.category === cat).length;
            const shortName = cat.replace(/^\d+\.\s*/, "");
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                    : "bg-gray-900/60 text-gray-400 hover:text-gray-200 border border-gray-800/80 hover:bg-gray-800/50"
                }`}
              >
                {shortName} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter skills..."
            className="w-full pl-9 pr-8 py-1.5 rounded-lg bg-gray-900/80 border border-gray-800 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/60 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 p-0.5 cursor-pointer"
              title="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Skills Grid - Styled using portfolio native ListCard structure */}
      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
          {filteredSkills.map((skill) => {
            return (
              <button
                type="button"
                key={skill.name}
                onClick={() => setSelectedSkill(skill)}
                className="group relative block h-full text-left cursor-pointer w-full"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 rounded-xl blur-sm opacity-0 group-hover:opacity-25 transition-all duration-500" />
                <div className="relative h-full p-5 bg-gray-900/95 backdrop-blur-sm border border-gray-800/70 rounded-xl group-hover:border-violet-500/40 transition-all duration-300 overflow-hidden flex flex-col shadow-lg group-hover:shadow-xl">
                  {/* Category & Spec */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 bg-gray-800/80 text-gray-300 text-[11px] font-medium rounded-md border border-gray-700/70">
                      {skill.category.replace(/^\d+\.\s*/, "")}
                    </span>
                    <span className="text-[11px] font-mono text-gray-500 group-hover:text-violet-400 transition-colors">
                      SKILL.md
                    </span>
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-base font-bold text-white font-mono group-hover:text-violet-300 transition-colors line-clamp-1 mb-2">
                    {skill.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed flex-1">
                    {skill.description}
                  </p>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-800/70 mt-auto">
                    <code className="text-[11px] font-mono text-gray-500 group-hover:text-gray-400 truncate max-w-[170px]">
                      skills-sync pull {skill.name}
                    </code>
                    <span className="text-violet-400 text-xs font-semibold group-hover:translate-x-1 transition-all duration-300 shrink-0 flex items-center gap-1">
                      Runbook →
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-gray-900/40 border border-gray-800/60 rounded-xl mb-12">
          <Search className="w-8 h-8 text-gray-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">
            No matching skills found
          </h3>
          <p className="text-xs text-gray-400 mb-4">
            Try adjusting your search query or selecting another category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Modal for full runbook view */}
      <SkillDetailModal
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
      />
    </div>
  );
}
