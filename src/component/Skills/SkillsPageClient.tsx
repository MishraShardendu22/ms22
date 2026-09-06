"use client";

import { ArrowUpRight, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { GitHubIcon } from "@/component/Icons";
import { EmptyState, ListCard } from "@/component/Section";
import type { AgentSkill, AgentSkillsData } from "@/lib/agentSkills";

interface SkillsPageClientProps {
  initialData: AgentSkillsData;
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
      {/* Header matching portfolio standard */}
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
              : ` across ${categories.length} categories`}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/skills/cli"
            className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-900/80 hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white transition-all text-xs font-medium"
          >
            <span>skills-sync CLI</span>
          </Link>
          <a
            href="https://github.com/MishraShardendu22/agent-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 text-violet-300 hover:text-white transition-all text-xs font-medium"
          >
            <GitHubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-violet-400" />
          </a>
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

      {/* Skills Grid - Using portfolio canonical ListCard component */}
      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
          {filteredSkills.map((skill) => (
            <ListCard
              key={skill.name}
              id={skill.name}
              href={`/skills/${skill.name}`}
              theme="violet"
              title={skill.name}
              subtitle={skill.category.replace(/^\d+\.\s*/, "")}
              description={skill.description}
              technologies={[
                "SKILL.md",
                skill.category.replace(/^\d+\.\s*/, ""),
              ]}
              links={[
                { label: "GitHub", url: skill.githubUrl },
                { label: "Raw", url: skill.rawUrl },
              ]}
              maxTechDisplay={2}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No matching skills found"
          description="Try adjusting your search query or selecting another category."
          theme="violet"
          hasFilters={true}
          onClearFilters={() => {
            setSearchQuery("");
            setSelectedCategory("all");
          }}
        />
      )}
    </div>
  );
}
