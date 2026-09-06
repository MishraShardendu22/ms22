"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Cpu,
  Layers,
  Play,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { GitHubIcon } from "@/component/Icons";

const INSTALL_CURL =
  "curl -fsSL https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/scripts/install.sh | bash";

const SCRIPT_RAW_URL =
  "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/scripts/skills-sync.sh";

interface CommandItem {
  id: string;
  name: string;
  syntax: string;
  badge: string;
  description: string;
  details: string[];
  mockOutput: string;
}

const COMMANDS: CommandItem[] = [
  {
    id: "pull",
    name: "skills-sync pull",
    syntax: "skills-sync pull",
    badge: "Read / Upstream",
    description:
      "Fetches and updates all skills from the upstream hub (MishraShardendu22/agent-skills) into your local .agents/skills/ directory.",
    details: [
      "Auto-detects repository root and locates .agents/skills/ or skills/ folder.",
      "Performs shallow depth-1 clone of upstream to keep bandwidth minimal.",
      "Safely merges incoming skills without clobbering untracked project files.",
    ],
    mockOutput: `[INFO] Synchronizing skills from upstream: MishraShardendu22/agent-skills (main)
[INFO] Fetching remote skill catalog...
[SUCCESS] Successfully pulled and updated 20 skills into /workspace/.agents/skills`,
  },
  {
    id: "push",
    name: "skills-sync push",
    syntax: "skills-sync push [skill-name]",
    badge: "Write / Hub",
    description:
      "Pushes newly authored or edited local skills back to the central hub repository.",
    details: [
      "Can target a single skill (e.g. skills-sync push docker-first-architecture) or all local skills.",
      "Creates a semantic commit: feat(skill): add/update <name> skill.",
      "Gracefully handles permission boundaries: if direct push lacks write access, it automatically creates a feature branch and opens a Pull Request via GitHub CLI.",
    ],
    mockOutput: `[INFO] Preparing to push skills to upstream: MishraShardendu22/agent-skills (main)
[INFO] Cloning upstream repository...
[INFO] Staging changed skills...
[INFO] Pushing commit to MishraShardendu22/agent-skills:main...
[SUCCESS] Successfully pushed skill updates upstream to MishraShardendu22/agent-skills.`,
  },
  {
    id: "sync",
    name: "skills-sync sync",
    syntax: "skills-sync sync",
    badge: "Bidirectional",
    description:
      "Runs bidirectional synchronization: first pulls latest updates from upstream, then pushes new local skills back to the hub.",
    details: [
      "Guarantees your local development branch has the newest standards before contributing back.",
      "Runs clean exit traps to prevent partial state in temporary directories.",
    ],
    mockOutput: `[INFO] Starting bidirectional skills synchronization...
[INFO] Synchronizing skills from upstream: MishraShardendu22/agent-skills (main)
[SUCCESS] Successfully pulled and updated 20 skills.
[INFO] Preparing to push skills to upstream: MishraShardendu22/agent-skills (main)
[INFO] Upstream repository is already up to date with all local skills.
[SUCCESS] Bidirectional synchronization complete.`,
  },
  {
    id: "new",
    name: "skills-sync new",
    syntax: "skills-sync new <skill-name>",
    badge: "Scaffolding",
    description:
      "Scaffolds a new standardized SKILL.md template adhering to the open specification with YAML frontmatter, directives, and runbooks.",
    details: [
      "Automatically normalizes skill names to kebab-case format.",
      "Generates frontmatter schema with name and description fields.",
      "Scaffolds sections for Overview, Core Directives (with [!IMPORTANT] alerts), and step-by-step procedures.",
    ],
    mockOutput: `[SUCCESS] Created new skill: .agents/skills/database-auto-sync/SKILL.md
[INFO] Edit this file, then run skills-sync push database-auto-sync to push it upstream.`,
  },
  {
    id: "list",
    name: "skills-sync list",
    syntax: "skills-sync list",
    badge: "Inspection",
    description:
      "Pretty-prints a tabular overview of all skills currently installed in your repository, displaying their names and brief descriptions.",
    details: [
      "Parses YAML frontmatter descriptions in real time from each local SKILL.md.",
      "Counts total active skills and verifies directory structure.",
    ],
    mockOutput: `Installed Skills in /workspace/.agents/skills:

  SKILL NAME                           DESCRIPTION
  ------------------------------------ --------------------------------------------------
  agent-observatory-workflow           LangChain tool-calling, Tool-Calling RAG workflows...
  ci-cd-workflow                       Multi-environment CI/CD workflows, Docker Hub...
  docker-first-architecture            Rules, architectures, multi-stage Dockerfile...
  git-commit-workflow                  Commit design taxonomy, semantic commit formatting...
  jules-ai-engineering-workflow        Autonomous Jules AI review loop across 38...
  modern-toolchain-standard            Standard operating specification: mandatory pnpm...

Total: 20 skills installed.`,
  },
  {
    id: "validate",
    name: "skills-sync validate",
    syntax: "skills-sync validate",
    badge: "CI / Quality",
    description:
      "Lints and verifies all local SKILL.md files for schema compliance, required frontmatter fields, and formatting rules.",
    details: [
      "Leverages validate-skills.py if available, or falls back to fast native bash validation.",
      "Checks for mandatory YAML frontmatter (name, description).",
      "Ensures zero trailing whitespace and valid UTF-8 markdown formatting.",
    ],
    mockOutput: `[INFO] Validating skills schema across 20 files...
[PASS] .agents/skills/docker-first-architecture/SKILL.md
[PASS] .agents/skills/git-branch-management/SKILL.md
[PASS] .agents/skills/jules-ai-engineering-workflow/SKILL.md
[SUCCESS] All 20 skills successfully passed schema validation.`,
  },
];

const GITHUB_ACTIONS_RECIPE = `name: Sync Skills Upstream

on:
  push:
    branches: [ main ]
    paths: [ '.agents/skills/**', 'skills/**' ]
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Push Skills Upstream to Hub
        env:
          AGENT_SKILLS_REPO: "MishraShardendu22/agent-skills"
          GITHUB_TOKEN: \${{ secrets.SKILLS_SYNC_TOKEN || secrets.GITHUB_TOKEN }}
        run: |
          curl -fsSL https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/scripts/skills-sync.sh | bash -s -- push`;

export function SkillsCliPageClient() {
  const [activeCommand, setActiveCommand] = useState<string>("pull");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [installTab, setInstallTab] = useState<"global" | "project" | "manual">(
    "global",
  );

  const handleCopy = (text: string, key: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const selectedCmd =
    COMMANDS.find((c) => c.id === activeCommand) || COMMANDS[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center justify-between mb-8"
      >
        <Link
          href="/skills"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gray-900/60 hover:bg-gray-800/80 border border-gray-800 text-gray-400 hover:text-white transition-all text-sm font-medium group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Skills Catalog</span>
        </Link>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/MishraShardendu22/agent-skills/blob/main/scripts/skills-sync.sh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gray-900/60 hover:bg-gray-800/80 border border-gray-800 text-gray-300 hover:text-white transition-all text-sm font-medium"
          >
            <GitHubIcon className="w-4 h-4" />
            <span>View CLI Source</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
          </a>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative bg-gradient-to-b from-gray-900/90 via-gray-900/50 to-gray-950/80 border border-gray-800/80 rounded-3xl p-6 sm:p-8 md:p-10 mb-10 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300">
              <Terminal className="w-3.5 h-3.5 text-violet-400" />
              <span>skills-sync CLI v1.0.0</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              Portable Bash Tooling
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              MIT License
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            Cross-Repository Skills Synchronization Engine
          </h1>
          <p className="text-base sm:text-lg text-gray-300 font-medium mb-4">
            A zero-dependency CLI tool to distribute, scaffold, validate, and
            synchronize AI agent skills across all your local repositories.
          </p>
          <p className="text-sm text-gray-400 leading-relaxed mb-8 max-w-3xl">
            Created by <strong className="text-white">Shardendu Mishra</strong>{" "}
            to solve context drift, duplicated prompts, and missed pre-commit
            checks across polyglot projects. Operates on a seamless{" "}
            <span className="text-violet-300 font-medium">
              Hub-and-Spoke architecture
            </span>
            , allowing you to pull the latest 20 skills into any codebase with
            one command, or push new skills back upstream automatically.
          </p>

          {/* Quick Copy Install Bar */}
          <div className="p-4 rounded-2xl bg-gray-950/90 border border-gray-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 max-w-3xl">
            <div className="flex items-center gap-2.5 min-w-0">
              <Terminal className="w-4 h-4 text-violet-400 shrink-0" />
              <code className="text-xs sm:text-sm font-mono text-gray-200 truncate select-all">
                {INSTALL_CURL}
              </code>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(INSTALL_CURL, "hero-install")}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
              title="Copy one-line installer"
            >
              {copiedKey === "hero-install" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Install Command</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hub & Spoke Architecture Card */}
      <section
        aria-label="Hub-and-Spoke Model"
        className="mb-12 p-6 sm:p-8 rounded-3xl bg-gray-900/60 border border-gray-800/80 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Layers className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The Hub-and-Spoke Architecture
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              How skills flow between central governance and active development
              workspaces
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {/* Card 1: Hub */}
          <div className="p-5 rounded-2xl bg-gray-950/70 border border-gray-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold font-mono text-violet-400 uppercase tracking-wider">
                  Central Hub
                </span>
                <span className="w-2 h-2 rounded-full bg-violet-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                MishraShardendu22/agent-skills
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Houses the canonical catalog of 20 verified skills, schema
                validator, CI workflows, and release tags.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-800/60 flex items-center gap-1.5 text-[11px] text-gray-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Enforces SKILL.md standards</span>
            </div>
          </div>

          {/* Card 2: Sync Engine */}
          <div className="p-5 rounded-2xl bg-violet-950/20 border border-violet-900/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider">
                  Sync Engine
                </span>
                <RefreshCw className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                skills-sync CLI
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                A standalone, portable bash script with zero external runtime
                dependencies. Executes git-level synchronization and branch
                creation.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-violet-900/40 flex items-center gap-1.5 text-[11px] text-violet-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bi-directional pull & push</span>
            </div>
          </div>

          {/* Card 3: Downstream Spokes */}
          <div className="p-5 rounded-2xl bg-gray-950/70 border border-gray-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider">
                  Downstream Spokes
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                Any Project Repository
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Whether writing Go APIs, Python ML models, or Next.js web apps,
                run <code className="text-emerald-300">skills-sync pull</code>{" "}
                to equip agents with exact team runbooks.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-800/60 flex items-center gap-1.5 text-[11px] text-gray-500">
              <Code2 className="w-3.5 h-3.5 text-gray-400" />
              <span>Stored in .agents/skills/</span>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Installation */}
      <section aria-label="Installation Methods" className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Installation & Setup
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Choose the installation method suited for your workflow
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-900 border border-gray-800 self-start">
            <button
              type="button"
              onClick={() => setInstallTab("global")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                installTab === "global"
                  ? "bg-violet-600 text-white shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Global Install (Recommended)
            </button>
            <button
              type="button"
              onClick={() => setInstallTab("project")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                installTab === "project"
                  ? "bg-violet-600 text-white shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Per-Project Script
            </button>
            <button
              type="button"
              onClick={() => setInstallTab("manual")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                installTab === "manual"
                  ? "bg-violet-600 text-white shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Manual Git Clone
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gray-900/70 border border-gray-800/80">
          {installTab === "global" && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-violet-600/20 text-violet-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    Execute the One-Line Global Installer
                  </h3>
                  <p className="text-xs text-gray-400 mb-3">
                    Downloads the latest release into{" "}
                    <code className="text-gray-300 font-mono">
                      ~/.local/bin/skills-sync
                    </code>{" "}
                    and marks it executable.
                  </p>
                  <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-gray-950 border border-gray-800 font-mono text-xs text-gray-200">
                    <span className="truncate">{INSTALL_CURL}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(INSTALL_CURL, "tab-curl")}
                      className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer shrink-0"
                      title="Copy command"
                    >
                      {copiedKey === "tab-curl" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-4 border-t border-gray-800/60">
                <span className="w-6 h-6 rounded-full bg-violet-600/20 text-violet-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    Ensure ~/.local/bin is in your PATH
                  </h3>
                  <p className="text-xs text-gray-400 mb-3">
                    If not already in your shell profile (~/.bashrc or
                    ~/.zshrc), append it:
                  </p>
                  <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-gray-950 border border-gray-800 font-mono text-xs text-gray-200">
                    <span>export PATH=&quot;$HOME/.local/bin:$PATH&quot;</span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          'export PATH="$HOME/.local/bin:$PATH"',
                          "tab-path",
                        )
                      }
                      className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer shrink-0"
                      title="Copy path command"
                    >
                      {copiedKey === "tab-path" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-4 border-t border-gray-800/60">
                <span className="w-6 h-6 rounded-full bg-violet-600/20 text-violet-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    Verify Installation
                  </h3>
                  <div className="p-3 rounded-xl bg-gray-950 border border-gray-800 font-mono text-xs text-gray-300">
                    $ skills-sync version
                    <br />
                    <span className="text-emerald-400">
                      skills-sync (v1.0.0) — Cross-Repository Synchronization
                      Engine
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {installTab === "project" && (
            <div className="space-y-4">
              <p className="text-xs text-gray-400 leading-relaxed">
                If you prefer embedding the script directly into an individual
                project repository:
              </p>
              <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 font-mono text-xs space-y-2 text-gray-300">
                <p className="text-gray-500">
                  # 1. Create scripts directory in your project root
                </p>
                <p>mkdir -p scripts</p>
                <p className="text-gray-500"># 2. Download skills-sync.sh</p>
                <p>curl -fsSL {SCRIPT_RAW_URL} -o scripts/skills-sync.sh</p>
                <p className="text-gray-500"># 3. Make executable</p>
                <p>chmod +x scripts/skills-sync.sh</p>
                <p className="text-gray-500"># 4. Run directly</p>
                <p>./scripts/skills-sync.sh pull</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    `mkdir -p scripts && curl -fsSL ${SCRIPT_RAW_URL} -o scripts/skills-sync.sh && chmod +x scripts/skills-sync.sh && ./scripts/skills-sync.sh pull`,
                    "project-cmd",
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-medium transition-colors cursor-pointer"
              >
                {copiedKey === "project-cmd" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied all 4 steps!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy All Steps</span>
                  </>
                )}
              </button>
            </div>
          )}

          {installTab === "manual" && (
            <div className="space-y-4">
              <p className="text-xs text-gray-400 leading-relaxed">
                Clone the repository and link or copy the executable:
              </p>
              <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 font-mono text-xs space-y-2 text-gray-300">
                <p>
                  git clone
                  https://github.com/MishraShardendu22/agent-skills.git
                </p>
                <p>cd agent-skills</p>
                <p>chmod +x scripts/skills-sync.sh</p>
                <p>mkdir -p ~/.local/bin</p>
                <p>
                  ln -sf &quot;$(pwd)/scripts/skills-sync.sh&quot;
                  ~/.local/bin/skills-sync
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Command Reference */}
      <section aria-label="Command Reference" className="mb-12">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Command Reference & Terminal Simulator
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Click any command to explore syntax, directives, and simulated
            output
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Command selector list (left) */}
          <div className="lg:col-span-4 space-y-2">
            {COMMANDS.map((cmd) => {
              const active = cmd.id === activeCommand;
              return (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={() => setActiveCommand(cmd.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    active
                      ? "bg-violet-600/15 border-violet-500/50 shadow-md shadow-violet-500/5"
                      : "bg-gray-900/60 border-gray-800/80 hover:bg-gray-800/60 text-gray-300"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-xs sm:text-sm font-bold ${
                          active ? "text-violet-300" : "text-white"
                        }`}
                      >
                        {cmd.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                      {cmd.description}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 ${
                      active
                        ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                        : "bg-gray-800 text-gray-400 border border-gray-700/50"
                    }`}
                  >
                    {cmd.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Command detail & Terminal Simulator (right) */}
          <div className="lg:col-span-8 p-6 rounded-3xl bg-gray-900/80 border border-gray-800/90 flex flex-col justify-between">
            <div>
              {/* Command Title Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-gray-800/70">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-mono font-bold text-white">
                      {selectedCmd.syntax}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20">
                      {selectedCmd.badge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {selectedCmd.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(selectedCmd.syntax, selectedCmd.id)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors cursor-pointer shrink-0 self-start sm:self-center"
                >
                  {copiedKey === selectedCmd.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Syntax</span>
                    </>
                  )}
                </button>
              </div>

              {/* Behind the scenes list */}
              <div className="mb-5">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-violet-400" />
                  <span>Execution Mechanics:</span>
                </h4>
                <ul className="space-y-1.5 pl-4 list-disc text-xs text-gray-400 leading-relaxed">
                  {selectedCmd.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>

              {/* Terminal Simulator Box */}
              <div>
                <div className="flex items-center justify-between px-4 py-2 rounded-t-xl bg-gray-950 border-t border-x border-gray-800 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-[11px] text-gray-400">
                      bash — terminal output
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-violet-400">
                    <Play className="w-3 h-3" />
                    <span>simulated</span>
                  </div>
                </div>
                <pre className="p-4 rounded-b-xl bg-gray-950 border border-gray-800 font-mono text-xs text-gray-200 overflow-x-auto leading-relaxed shadow-inner">
                  <code>{selectedCmd.mockOutput}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environment Variables Reference Table */}
      <section
        aria-label="Environment Variables"
        className="mb-12 p-6 sm:p-8 rounded-3xl bg-gray-900/60 border border-gray-800/80"
      >
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
            Environment Variables
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Configure default repositories, branches, and credentials via shell
            variables
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="py-3 px-4 font-mono font-semibold">VARIABLE</th>
                <th className="py-3 px-4 font-mono font-semibold">DEFAULT</th>
                <th className="py-3 px-4 font-mono font-semibold">
                  DESCRIPTION
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-gray-300">
              <tr>
                <td className="py-3 px-4 font-mono font-bold text-violet-300">
                  AGENT_SKILLS_REPO
                </td>
                <td className="py-3 px-4 font-mono text-gray-400">
                  MishraShardendu22/agent-skills
                </td>
                <td className="py-3 px-4 text-gray-300">
                  The upstream central GitHub repository where skills are pulled
                  from and pushed to.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-bold text-violet-300">
                  AGENT_SKILLS_BRANCH
                </td>
                <td className="py-3 px-4 font-mono text-gray-400">main</td>
                <td className="py-3 px-4 text-gray-300">
                  Target git branch for upstream pull/push operations.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-bold text-violet-300">
                  GITHUB_TOKEN
                </td>
                <td className="py-3 px-4 font-mono text-gray-400">
                  (optional)
                </td>
                <td className="py-3 px-4 text-gray-300">
                  GitHub Personal Access Token for authenticated clones or PR
                  creation in automated CI environments.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-bold text-violet-300">
                  AGENT_SKILLS_DIR
                </td>
                <td className="py-3 px-4 font-mono text-gray-400">
                  Auto-detected (.agents/skills)
                </td>
                <td className="py-3 px-4 text-gray-300">
                  Override path where local skills are populated on the host
                  filesystem.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Automating with GitHub Actions */}
      <section
        aria-label="GitHub Actions Integration"
        className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/90 border border-gray-800/80 shadow-2xl"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CI/CD Automation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Automate Cross-Repo Sync via GitHub Actions
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
              Add this workflow to any downstream repository at{" "}
              <code className="text-violet-300 font-mono">
                .github/workflows/sync-skills-upstream.yml
              </code>
              . When you or an AI agent creates a new skill locally, it is
              automatically pushed upstream to your hub!
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleCopy(GITHUB_ACTIONS_RECIPE, "gha-recipe")}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors cursor-pointer self-start lg:self-center shrink-0"
          >
            {copiedKey === "gha-recipe" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Workflow Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Workflow YAML</span>
              </>
            )}
          </button>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-950 font-mono text-xs">
          <div className="px-4 py-2.5 bg-gray-900/90 border-b border-gray-800 text-gray-400 flex items-center justify-between">
            <span className="text-[11px] text-violet-300 font-semibold">
              .github/workflows/sync-skills-upstream.yml
            </span>
            <span className="text-[10px] text-gray-500">yaml</span>
          </div>
          <pre className="p-4 sm:p-5 overflow-x-auto text-gray-300 leading-relaxed">
            <code>{GITHUB_ACTIONS_RECIPE}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}
