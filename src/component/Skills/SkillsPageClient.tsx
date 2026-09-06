"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Bot,
  Check,
  CheckCircle2,
  Copy,
  Cpu,
  GitBranch,
  GitCommit,
  Layers,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wrench,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { GitHubIcon } from "@/component/Icons";
import type {
  AgentRepoCommit,
  AgentSkill,
  AgentSkillsData,
} from "@/lib/agentSkills";
import { SkillDetailModal } from "./SkillDetailModal";

const INSTALL_CMD =
  "curl -fsSL https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/scripts/install.sh | bash";

// Category icon & accent mapping
function getCategoryMeta(categoryName: string) {
  const lower = categoryName.toLowerCase();
  if (lower.includes("communication")) {
    return {
      icon: Sparkles,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
      border: "border-pink-500/20",
      hoverBorder: "hover:border-pink-500/40",
      pill: "bg-pink-500/10 text-pink-300 border-pink-500/20",
    };
  }
  if (lower.includes("git")) {
    return {
      icon: GitBranch,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      hoverBorder: "hover:border-amber-500/40",
      pill: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    };
  }
  if (lower.includes("ai") || lower.includes("review")) {
    return {
      icon: Bot,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
      hoverBorder: "hover:border-violet-500/40",
      pill: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    };
  }
  if (
    lower.includes("devops") ||
    lower.includes("ci/cd") ||
    lower.includes("tooling")
  ) {
    return {
      icon: Wrench,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      hoverBorder: "hover:border-blue-500/40",
      pill: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    };
  }
  if (lower.includes("quality") || lower.includes("test")) {
    return {
      icon: ShieldCheck,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      hoverBorder: "hover:border-emerald-500/40",
      pill: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    };
  }
  if (lower.includes("architecture") || lower.includes("saas")) {
    return {
      icon: Layers,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      hoverBorder: "hover:border-cyan-500/40",
      pill: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    };
  }

  return {
    icon: Cpu,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    hoverBorder: "hover:border-violet-500/40",
    pill: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  };
}

interface SkillsPageClientProps {
  initialData: AgentSkillsData;
}

export function SkillsPageClient({ initialData }: SkillsPageClientProps) {
  const [skills, setSkills] = useState<AgentSkill[]>(initialData.skills);
  const [commit, setCommit] = useState<AgentRepoCommit | null>(
    initialData.commit,
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<AgentSkill | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    setSyncMessage(null);

    try {
      // Trigger cache revalidation
      await fetch("/api/skills/revalidate", { method: "POST" }).catch(() => {});

      // Refetch latest commit directly from GitHub
      const commitRes = await fetch(
        "https://api.github.com/repos/MishraShardendu22/agent-skills/commits/main",
        { cache: "no-store" },
      );

      if (commitRes.ok) {
        const data = await commitRes.json();
        const sha = data.sha || "";
        setCommit({
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
        });
      }

      // Refetch raw README for any newly committed skills
      const readmeRes = await fetch(
        `https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/README.md?t=${Date.now()}`,
        { cache: "no-store" },
      );

      if (readmeRes.ok) {
        const text = await readmeRes.text();
        const { parseSkillsFromReadme } = await import("@/lib/agentSkills");
        const parsed = parseSkillsFromReadme(text);
        if (parsed.length > 0) {
          setSkills(parsed);
        }
      }

      setSyncMessage("Synchronized with GitHub!");
      setTimeout(() => setSyncMessage(null), 3500);
    } catch {
      setSyncMessage("Sync failed. Check network connection.");
      setTimeout(() => setSyncMessage(null), 3000);
    } finally {
      setIsSyncing(false);
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Top Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center justify-between mb-8"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gray-900/60 hover:bg-gray-800/80 border border-gray-800 text-gray-400 hover:text-white transition-all text-sm font-medium group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Home</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/skills/cli"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 text-violet-300 hover:text-white transition-all text-sm font-medium"
          >
            <Terminal className="w-4 h-4" />
            <span>CLI Guide</span>
          </Link>
          <a
            href="https://github.com/MishraShardendu22/agent-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gray-900/60 hover:bg-gray-800/80 border border-gray-800 text-gray-300 hover:text-white transition-all text-sm font-medium"
          >
            <GitHubIcon className="w-4 h-4" />
            <span>View Repository</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-gradient-to-b from-gray-900/90 via-gray-900/50 to-gray-950/80 border border-gray-800/80 rounded-3xl p-6 sm:p-8 md:p-10 mb-10 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300 mb-4">
              <Bot className="w-3.5 h-3.5 text-violet-400" />
              <span>Autonomous AI Engineering Catalog</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
              Agent Skills & Runbooks
            </h1>
            <p className="text-base sm:text-lg text-gray-300 font-medium mb-3">
              Production-grade skills, guardrails, and deterministic workflows
              for AI coding agents.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              A centralized library of modular skills adhering to the open{" "}
              <code className="text-violet-300 font-mono bg-violet-950/60 px-1.5 py-0.5 rounded border border-violet-800/40">
                SKILL.md
              </code>{" "}
              specification. Enforces non-negotiable boundaries, pre-commit
              reflexes, and bi-directional cross-repo sync for Google
              Antigravity, Claude Code, Google Jules, and Cursor.
            </p>

            {/* Metrics Pills */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-gray-300">
              <div className="px-3 py-1 rounded-lg bg-gray-800/60 border border-gray-700/50 flex items-center gap-1.5">
                <span className="font-bold text-violet-400">
                  {skills.length}
                </span>
                <span>Active Skills</span>
              </div>
              <div className="px-3 py-1 rounded-lg bg-gray-800/60 border border-gray-700/50 flex items-center gap-1.5">
                <span className="font-bold text-cyan-400">
                  {categories.length}
                </span>
                <span>Domains</span>
              </div>
              <div className="px-3 py-1 rounded-lg bg-gray-800/60 border border-gray-700/50 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>CI Validated Schema</span>
              </div>
              <div className="px-3 py-1 rounded-lg bg-gray-800/60 border border-gray-700/50 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                <span>Hub & Spoke Sync</span>
              </div>
            </div>
          </div>

          {/* GitHub Live Sync Status Card */}
          <div className="w-full lg:w-96 shrink-0 bg-gray-950/90 border border-gray-800/90 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-gray-800/70">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-bold text-gray-200">
                  Live GitHub Sync
                </span>
              </div>
              <button
                type="button"
                onClick={handleManualSync}
                disabled={isSyncing}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-xs font-medium transition-all cursor-pointer disabled:opacity-50"
                title="Sync latest commits from GitHub"
              >
                <RefreshCw
                  className={`w-3 h-3 ${isSyncing ? "animate-spin text-violet-400" : ""}`}
                />
                <span>{isSyncing ? "Syncing..." : "Sync"}</span>
              </button>
            </div>

            {syncMessage && (
              <div className="mb-3 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-medium">
                {syncMessage}
              </div>
            )}

            {commit ? (
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-gray-400">
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <GitCommit className="w-3.5 h-3.5 text-violet-400" />
                    <a
                      href={commit.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-300 hover:underline hover:text-violet-200"
                    >
                      {commit.shortSha}
                    </a>
                  </div>
                  <span className="text-gray-500 text-[11px]">
                    {commit.relativeTime}
                  </span>
                </div>
                <p className="text-gray-300 line-clamp-2 text-xs leading-relaxed font-mono">
                  {commit.message}
                </p>
                <div className="flex items-center justify-between pt-1 text-[11px] text-gray-400">
                  <span>Author: {commit.author}</span>
                  {commit.verified && (
                    <span className="inline-flex items-center gap-1 text-emerald-400">
                      <Check className="w-3 h-3" />
                      <span>Verified GPG</span>
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-xs text-gray-400">
                Connected to upstream repository:
                <br />
                <code className="text-violet-300 font-mono">
                  MishraShardendu22/agent-skills
                </code>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* One-Line CLI Install Box */}
      <section
        aria-label="CLI Install instructions"
        className="mb-10 p-4 sm:p-5 rounded-2xl bg-gray-900/60 border border-gray-800/80 backdrop-blur-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
            <Terminal className="w-5 h-5 text-violet-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Install skills-sync CLI
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20">
                Global
              </span>
            </div>
            <p className="text-xs text-gray-400 truncate mt-0.5">
              Installs portable sync engine into ~/.local/bin to pull/push
              skills across your repos.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex-1 md:w-80 px-3 py-2 rounded-xl bg-gray-950 border border-gray-800 font-mono text-xs text-gray-300 truncate select-all">
              {INSTALL_CMD}
            </div>
            <button
              type="button"
              onClick={() => handleCopy(INSTALL_CMD, "install-cmd")}
              className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              title="Copy install command"
            >
              {copiedKey === "install-cmd" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <Link
            href="/skills/cli"
            className="px-3.5 py-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 border border-gray-700/60 text-gray-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shrink-0"
          >
            <Terminal className="w-3.5 h-3.5 text-violet-400" />
            <span>Full CLI Guide</span>
            <ArrowUpRight className="w-3 h-3 text-gray-400" />
          </Link>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section
        aria-label="Filter skills"
        className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === "all"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25 border border-violet-500"
                : "bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800 hover:bg-gray-800/60"
            }`}
          >
            All Skills ({skills.length})
          </button>
          {categories.map((cat) => {
            const count = skills.filter((s) => s.category === cat).length;
            const shortName = cat.replace(/^\d+\.\s*/, "");
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25 border border-violet-500"
                    : "bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800 hover:bg-gray-800/60"
                }`}
              >
                {shortName} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skill, command, tool..."
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-gray-900/80 border border-gray-800 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </section>

      {/* Skills Grid */}
      <section aria-label="Agent Skills Catalog" className="mb-14">
        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSkills.map((skill) => {
              const meta = getCategoryMeta(skill.category);
              const CategoryIcon = meta.icon;
              const pullCmd = `skills-sync pull ${skill.name}`;

              return (
                <div
                  key={skill.name}
                  className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-gray-900/80 hover:bg-gray-900/95 border border-gray-800/80 ${meta.hoverBorder} transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-violet-500/5`}
                >
                  <div>
                    {/* Category badge & icon */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${meta.pill}`}
                      >
                        <CategoryIcon className="w-3 h-3" />
                        <span>{skill.category.replace(/^\d+\.\s*/, "")}</span>
                      </span>

                      <a
                        href={skill.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-white transition-colors p-1"
                        title="View source on GitHub"
                        aria-label={`View ${skill.name} on GitHub`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Skill Name */}
                    <button
                      type="button"
                      onClick={() => setSelectedSkill(skill)}
                      className="block text-left text-base sm:text-lg font-mono font-bold text-white group-hover:text-violet-300 transition-colors cursor-pointer mb-2"
                    >
                      {skill.name}
                    </button>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-400 line-clamp-3 leading-relaxed mb-4">
                      {skill.description}
                    </p>
                  </div>

                  <div>
                    {/* CLI Pull Command Snippet */}
                    <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-gray-950/80 border border-gray-800/80 font-mono text-[11px] text-gray-300 mb-4">
                      <div className="flex items-center gap-1.5 truncate">
                        <Terminal className="w-3 h-3 text-violet-400 shrink-0" />
                        <span className="truncate">{pullCmd}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(pullCmd, `pull-${skill.name}`)
                        }
                        className="text-gray-400 hover:text-white transition-colors shrink-0 p-1 cursor-pointer"
                        title="Copy sync command"
                      >
                        {copiedKey === `pull-${skill.name}` ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>

                    {/* Actions: Read Runbook & View on GitHub */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedSkill(skill)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Read Runbook</span>
                      </button>
                      <a
                        href={skill.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-gray-800/80 hover:bg-gray-700 border border-gray-700/60 text-gray-300 hover:text-white text-xs font-semibold transition-colors"
                      >
                        <GitHubIcon className="w-3.5 h-3.5" />
                        <span>Repo</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-gray-900/40 border border-gray-800/60 rounded-3xl">
            <Search className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">
              No matching skills found
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Try adjusting your search query or selecting another category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Modal for full runbook view */}
      <SkillDetailModal
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
      />
    </div>
  );
}
