"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Copy,
  Cpu,
  Layers,
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
      "Fetches and updates all skills from the upstream hub into your local .agents/skills/ directory.",
    details: [
      "Auto-detects repository root and locates .agents/skills/ or skills/ directory.",
      "Performs a shallow depth-1 clone of upstream to keep bandwidth minimal.",
      "Safely updates incoming skills without clobbering untracked project files.",
    ],
    mockOutput: `[INFO] Synchronizing skills from upstream: MishraShardendu22/agent-skills (main)
[INFO] Fetching remote skill catalog...
[SUCCESS] Successfully pulled and updated 30 skills into /workspace/.agents/skills`,
  },
  {
    id: "push",
    name: "skills-sync push",
    syntax: "skills-sync push [skill-name]",
    badge: "Write / Hub",
    description:
      "Pushes newly authored or edited local skills back to the central hub repository.",
    details: [
      "Target a single skill (e.g. skills-sync push docker-first-architecture) or all local skills.",
      "Creates a semantic commit: feat(skill): add/update <name> skill.",
      "If direct push lacks write access, automatically opens a Pull Request via GitHub CLI.",
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
      "Runs bidirectional synchronization: first pulls latest updates from upstream, then pushes new local skills back.",
    details: [
      "Guarantees your local development branch has the newest standards before contributing back.",
      "Runs clean exit traps to prevent partial state in temporary directories.",
    ],
    mockOutput: `[INFO] Starting bidirectional skills synchronization...
[INFO] Synchronizing skills from upstream: MishraShardendu22/agent-skills (main)
[SUCCESS] Successfully pulled and updated 30 skills.
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
      "Scaffolds a new standardized SKILL.md template adhering to the open specification.",
    details: [
      "Automatically normalizes skill names to kebab-case format.",
      "Generates frontmatter schema with name and description fields.",
      "Scaffolds sections for Overview, Directives, and Step-by-step procedures.",
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
      "Tabular overview of all skills currently installed in your repository.",
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

Total: 30 skills installed.`,
  },
  {
    id: "validate",
    name: "skills-sync validate",
    syntax: "skills-sync validate",
    badge: "CI / Quality",
    description:
      "Lints and verifies all local SKILL.md files for schema compliance and formatting.",
    details: [
      "Leverages validate-skills.py if available, or falls back to native bash validation.",
      "Checks for mandatory YAML frontmatter (name, description).",
      "Ensures zero trailing whitespace and valid markdown formatting.",
    ],
    mockOutput: `[INFO] Validating skills schema across 30 files...
[PASS] .agents/skills/docker-first-architecture/SKILL.md
[PASS] .agents/skills/git-branch-management/SKILL.md
[PASS] .agents/skills/jules-ai-engineering-workflow/SKILL.md
[SUCCESS] All 30 skills successfully passed schema validation.`,
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
    <div className="w-full relative z-10">
      {/* Observatory Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-[#2f2923]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/skills"
              className="text-xs text-[#8e8374] hover:text-[#d9a55b] transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Agent Skills Catalog</span>
            </Link>
            <span className="text-[#413930]">/</span>
            <span className="text-xs text-[#d9a55b] font-mono">CLI Guide</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#f3ebdd] font-heading tracking-tight">
            skills-sync CLI
          </h1>
          <p className="text-sm text-[#8e8374] mt-1.5">
            Lightweight POSIX synchronization engine for cross-repository agent
            skill workflows.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <Link
            href="/skills"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#161311] hover:bg-[#1e1a16] border border-[#2f2923] text-[#b9ae9d] hover:text-[#f3ebdd] hover:border-[#413930] transition-all text-xs font-medium shadow-sm"
          >
            <span>Browse Skills</span>
          </Link>
          <a
            href="https://github.com/MishraShardendu22/agent-skills/blob/main/scripts/skills-sync.sh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#d9a55b]/10 hover:bg-[#d9a55b]/20 border border-[#d9a55b]/30 text-[#d9a55b] hover:text-[#f3ebdd] transition-all text-xs font-semibold shadow-sm"
          >
            <GitHubIcon className="w-3.5 h-3.5" />
            <span>View Source</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#d9a55b]" />
          </a>
        </div>
      </div>

      {/* Quick Install Banner with Terminal Aesthetic */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#161311] border border-[#2f2923] mb-10 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#1e1a16] border border-[#2f2923] flex items-center justify-center shrink-0">
            <Terminal className="w-5 h-5 text-[#d9a55b]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#f3ebdd] tracking-tight">
                One-Line Global Install
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                POSIX
              </span>
            </div>
            <code className="text-xs font-mono text-[#d9a55b] truncate block mt-0.5 select-all">
              {INSTALL_CURL}
            </code>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleCopy(INSTALL_CURL, "hero-install")}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#d9a55b] hover:bg-[#e6b56c] text-[#0e0c0a] font-bold text-xs transition-all shadow-[0_2px_12px_rgba(217,165,91,0.25)] cursor-pointer shrink-0"
        >
          {copiedKey === "hero-install" ? (
            <>
              <Check className="w-4 h-4 text-[#0e0c0a]" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-[#0e0c0a]" />
              <span>Copy Install Command</span>
            </>
          )}
        </button>
      </div>

      {/* Hub & Spoke Architecture */}
      <section aria-label="Architecture" className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-4 rounded-full bg-[#d9a55b]" />
          <h2 className="text-lg font-bold text-[#f3ebdd] font-heading">
            Hub &amp; Spoke Architecture
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Hub */}
          <div className="group relative p-6 bg-[#161311] border border-[#2f2923] hover:border-[#d9a55b]/40 rounded-2xl flex flex-col justify-between shadow-lg transition-all duration-300">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1e1a16] border border-[#2f2923] flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5 text-[#d9a55b]" />
              </div>
              <span className="px-2.5 py-0.5 bg-[#1e1a16] text-[#d9a55b] text-[10px] font-mono font-medium rounded-md border border-[#2f2923] inline-block mb-2">
                CENTRAL HUB
              </span>
              <h3 className="text-sm font-bold text-[#f3ebdd] font-mono mb-2">
                MishraShardendu22/agent-skills
              </h3>
              <p className="text-xs text-[#b9ae9d] leading-relaxed">
                Canonical upstream repository hosting 30 production agent
                skills, test suites, and automated release tags.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-[#2f2923] text-[11px] text-[#8e8374] font-mono">
              Enforces SKILL.md specification
            </div>
          </div>

          {/* Card 2: Sync Engine */}
          <div className="group relative p-6 bg-[#161311] border border-[#2f2923] hover:border-[#d9a55b]/40 rounded-2xl flex flex-col justify-between shadow-lg transition-all duration-300">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1e1a16] border border-[#2f2923] flex items-center justify-center mb-4">
                <Terminal className="w-5 h-5 text-[#d9a55b]" />
              </div>
              <span className="px-2.5 py-0.5 bg-[#1e1a16] text-[#d9a55b] text-[10px] font-mono font-medium rounded-md border border-[#2f2923] inline-block mb-2">
                SYNC ENGINE
              </span>
              <h3 className="text-sm font-bold text-[#f3ebdd] font-mono mb-2">
                skills-sync CLI
              </h3>
              <p className="text-xs text-[#b9ae9d] leading-relaxed">
                Portable bash script with zero external dependencies. Executes
                safe git-level synchronization and branch management.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-[#2f2923] text-[11px] text-[#d9a55b] font-mono">
              Bidirectional pull &amp; push
            </div>
          </div>

          {/* Card 3: Downstream Spokes */}
          <div className="group relative p-6 bg-[#161311] border border-[#2f2923] hover:border-[#d9a55b]/40 rounded-2xl flex flex-col justify-between shadow-lg transition-all duration-300">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1e1a16] border border-[#2f2923] flex items-center justify-center mb-4">
                <Layers className="w-5 h-5 text-[#d9a55b]" />
              </div>
              <span className="px-2.5 py-0.5 bg-[#1e1a16] text-[#d9a55b] text-[10px] font-mono font-medium rounded-md border border-[#2f2923] inline-block mb-2">
                DOWNSTREAM SPOKES
              </span>
              <h3 className="text-sm font-bold text-[#f3ebdd] font-mono mb-2">
                Project Repositories
              </h3>
              <p className="text-xs text-[#b9ae9d] leading-relaxed">
                Run{" "}
                <code className="text-[#d9a55b] font-mono">
                  skills-sync pull
                </code>{" "}
                in any repository to inject engineering standards into{" "}
                <code className="text-[#f3ebdd] font-mono">
                  .agents/skills/
                </code>
                .
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-[#2f2923] text-[11px] text-[#8e8374] font-mono">
              Zero configuration required
            </div>
          </div>
        </div>
      </section>

      {/* Installation Tabs */}
      <section aria-label="Installation" className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-[#d9a55b]" />
            <h2 className="text-lg font-bold text-[#f3ebdd] font-heading">
              Installation Methods
            </h2>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setInstallTab("global")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                installTab === "global"
                  ? "bg-[#d9a55b] text-[#0e0c0a] font-semibold shadow-[0_2px_12px_rgba(217,165,91,0.25)]"
                  : "bg-[#161311] text-[#b9ae9d] hover:text-[#f3ebdd] border border-[#2f2923]"
              }`}
            >
              Global POSIX
            </button>
            <button
              type="button"
              onClick={() => setInstallTab("project")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                installTab === "project"
                  ? "bg-[#d9a55b] text-[#0e0c0a] font-semibold shadow-[0_2px_12px_rgba(217,165,91,0.25)]"
                  : "bg-[#161311] text-[#b9ae9d] hover:text-[#f3ebdd] border border-[#2f2923]"
              }`}
            >
              Per-Project
            </button>
            <button
              type="button"
              onClick={() => setInstallTab("manual")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                installTab === "manual"
                  ? "bg-[#d9a55b] text-[#0e0c0a] font-semibold shadow-[0_2px_12px_rgba(217,165,91,0.25)]"
                  : "bg-[#161311] text-[#b9ae9d] hover:text-[#f3ebdd] border border-[#2f2923]"
              }`}
            >
              Manual Git
            </button>
          </div>
        </div>

        <div className="p-6 bg-[#161311] border border-[#2f2923] rounded-2xl shadow-xl">
          {installTab === "global" && (
            <div className="space-y-5">
              <div>
                <span className="text-xs font-bold text-[#f3ebdd] block mb-1.5">
                  1. Run the one-line installer
                </span>
                <p className="text-xs text-[#8e8374] mb-2.5">
                  Installs binary to{" "}
                  <code className="text-[#b9ae9d] font-mono">
                    ~/.local/bin/skills-sync
                  </code>{" "}
                  and sets executable permissions.
                </p>
                <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-[#0e0c0a] border border-[#2f2923] font-mono text-xs text-[#d9a55b]">
                  <span className="truncate select-all">{INSTALL_CURL}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(INSTALL_CURL, "tab-curl")}
                    className="p-1.5 rounded-lg bg-[#1e1a16] hover:bg-[#27221c] border border-[#2f2923] text-[#b9ae9d] hover:text-[#f3ebdd] transition-colors cursor-pointer shrink-0"
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

              <div className="pt-4 border-t border-[#2f2923]">
                <span className="text-xs font-bold text-[#f3ebdd] block mb-1.5">
                  2. Ensure ~/.local/bin is in PATH
                </span>
                <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-[#0e0c0a] border border-[#2f2923] font-mono text-xs text-[#b9ae9d]">
                  <span className="select-all">
                    export PATH=&quot;$HOME/.local/bin:$PATH&quot;
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        'export PATH="$HOME/.local/bin:$PATH"',
                        "tab-path",
                      )
                    }
                    className="p-1.5 rounded-lg bg-[#1e1a16] hover:bg-[#27221c] border border-[#2f2923] text-[#b9ae9d] hover:text-[#f3ebdd] transition-colors cursor-pointer shrink-0"
                    title="Copy path export"
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
          )}

          {installTab === "project" && (
            <div className="space-y-4">
              <p className="text-xs text-[#b9ae9d]">
                Embed the script directly into a project repository without
                system-wide installation:
              </p>
              <div className="p-4 rounded-xl bg-[#0e0c0a] border border-[#2f2923] font-mono text-xs space-y-2 text-[#b9ae9d]">
                <p className="text-[#8e8374]">
                  # 1. Download script into scripts/
                </p>
                <p className="text-[#f3ebdd] select-all">
                  mkdir -p scripts &amp;&amp; curl -fsSL {SCRIPT_RAW_URL} -o
                  scripts/skills-sync.sh
                </p>
                <p className="text-[#8e8374]"># 2. Make executable &amp; run</p>
                <p className="text-[#d9a55b] select-all">
                  chmod +x scripts/skills-sync.sh &amp;&amp;
                  ./scripts/skills-sync.sh pull
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    `mkdir -p scripts && curl -fsSL ${SCRIPT_RAW_URL} -o scripts/skills-sync.sh && chmod +x scripts/skills-sync.sh && ./scripts/skills-sync.sh pull`,
                    "project-cmd",
                  )
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1e1a16] hover:bg-[#27221c] border border-[#2f2923] text-[#f3ebdd] text-xs font-semibold transition-colors cursor-pointer"
              >
                {copiedKey === "project-cmd" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#d9a55b]" />
                    <span>Copy Commands</span>
                  </>
                )}
              </button>
            </div>
          )}

          {installTab === "manual" && (
            <div className="space-y-4">
              <p className="text-xs text-[#b9ae9d]">
                Clone the repository and symlink the executable into your local
                path:
              </p>
              <div className="p-4 rounded-xl bg-[#0e0c0a] border border-[#2f2923] font-mono text-xs space-y-2 text-[#b9ae9d]">
                <p className="text-[#f3ebdd] select-all">
                  git clone
                  https://github.com/MishraShardendu22/agent-skills.git
                </p>
                <p className="text-[#f3ebdd] select-all">
                  cd agent-skills &amp;&amp; chmod +x scripts/skills-sync.sh
                </p>
                <p className="text-[#d9a55b] select-all">
                  mkdir -p ~/.local/bin &amp;&amp; ln -sf
                  &quot;$(pwd)/scripts/skills-sync.sh&quot;
                  ~/.local/bin/skills-sync
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Command Reference & Terminal Window */}
      <section aria-label="Command Reference" className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-4 rounded-full bg-[#d9a55b]" />
          <h2 className="text-lg font-bold text-[#f3ebdd] font-heading">
            Command Reference &amp; Terminal Engine
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Command selector list (left) */}
          <div className="lg:col-span-4 space-y-2.5">
            {COMMANDS.map((cmd) => {
              const active = cmd.id === activeCommand;
              return (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={() => setActiveCommand(cmd.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    active
                      ? "bg-[#1e1a16] border-[#d9a55b]/60 text-[#f3ebdd] shadow-[0_4px_20px_rgba(217,165,91,0.12)]"
                      : "bg-[#161311] border-[#2f2923] hover:bg-[#1a1613] text-[#8e8374] hover:text-[#f3ebdd]"
                  }`}
                >
                  <div className="min-w-0">
                    <span
                      className={`font-mono text-xs font-bold block truncate ${active ? "text-[#d9a55b]" : "text-[#f3ebdd]"}`}
                    >
                      {cmd.name}
                    </span>
                    <span className="text-[11px] text-[#8e8374] line-clamp-1 mt-0.5">
                      {cmd.description}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border shrink-0 ${
                      active
                        ? "bg-[#d9a55b]/10 text-[#d9a55b] border-[#d9a55b]/30"
                        : "bg-[#1e1a16] text-[#8e8374] border-[#2f2923]"
                    }`}
                  >
                    {cmd.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Observatory Terminal Window (right) */}
          <div className="lg:col-span-8 rounded-2xl bg-[#0e0c0a] border border-[#2f2923] flex flex-col justify-between shadow-2xl overflow-hidden">
            {/* Terminal Window Chrome */}
            <div className="flex items-center justify-between px-5 py-3 bg-[#161311] border-b border-[#2f2923]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ef4444]/80" />
                <div className="w-3 h-3 rounded-full bg-[#f59e0b]/80" />
                <div className="w-3 h-3 rounded-full bg-[#10b981]/80" />
                <span className="ml-3 text-xs font-mono text-[#8e8374]">
                  skills-sync ~ zsh ({selectedCmd.id})
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(selectedCmd.syntax, selectedCmd.id)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1e1a16] hover:bg-[#27221c] border border-[#2f2923] text-[#b9ae9d] hover:text-[#f3ebdd] text-xs font-medium transition-colors cursor-pointer"
              >
                {copiedKey === selectedCmd.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 text-[11px]">
                      Copied!
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#8e8374]" />
                    <span className="text-[11px]">Copy Command</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-6">
              {/* Command Syntax & Purpose */}
              <div className="mb-5 pb-4 border-b border-[#2f2923]">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-[#4caf7d] font-mono text-sm font-bold">
                    ❯
                  </span>
                  <code className="text-sm font-mono font-bold text-[#d9a55b] select-all">
                    {selectedCmd.syntax}
                  </code>
                </div>
                <p className="text-xs text-[#b9ae9d] leading-relaxed">
                  {selectedCmd.description}
                </p>
              </div>

              {/* Execution Directives */}
              <div className="mb-6">
                <span className="text-[11px] font-mono font-bold text-[#8e8374] uppercase tracking-wider block mb-2">
                  Operational Mechanics:
                </span>
                <ul className="space-y-1.5 list-none text-xs text-[#b9ae9d] leading-relaxed">
                  {selectedCmd.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span className="text-[#d9a55b] font-bold mt-0.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mock Terminal Output */}
              <div>
                <span className="text-[11px] font-mono text-[#8e8374] block mb-2">
                  Simulated Terminal Output:
                </span>
                <div className="p-4 rounded-xl bg-[#141210] border border-[#2f2923] font-mono text-xs text-[#d0c6b6] overflow-x-auto leading-relaxed select-all">
                  <pre className="whitespace-pre">{selectedCmd.mockOutput}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environment Variables Reference */}
      <section aria-label="Environment Variables" className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-4 rounded-full bg-[#d9a55b]" />
          <h2 className="text-lg font-bold text-[#f3ebdd] font-heading">
            Environment Variables
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#2f2923] bg-[#161311] shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#2f2923] text-[#d9a55b] bg-[#1e1a16]">
                <th className="py-3 px-5 font-mono font-semibold">VARIABLE</th>
                <th className="py-3 px-5 font-mono font-semibold">DEFAULT</th>
                <th className="py-3 px-5 font-semibold">DESCRIPTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2f2923]/60 text-[#b9ae9d]">
              <tr className="hover:bg-[#1e1a16]/50 transition-colors">
                <td className="py-3.5 px-5 font-mono font-bold text-[#f3ebdd]">
                  AGENT_SKILLS_REPO
                </td>
                <td className="py-3.5 px-5 font-mono text-[#8e8374]">
                  MishraShardendu22/agent-skills
                </td>
                <td className="py-3.5 px-5 text-[#b9ae9d]">
                  The central upstream GitHub repository where skills are pulled
                  from and pushed to.
                </td>
              </tr>
              <tr className="hover:bg-[#1e1a16]/50 transition-colors">
                <td className="py-3.5 px-5 font-mono font-bold text-[#f3ebdd]">
                  AGENT_SKILLS_BRANCH
                </td>
                <td className="py-3.5 px-5 font-mono text-[#8e8374]">main</td>
                <td className="py-3.5 px-5 text-[#b9ae9d]">
                  Target git branch for upstream pull/push operations.
                </td>
              </tr>
              <tr className="hover:bg-[#1e1a16]/50 transition-colors">
                <td className="py-3.5 px-5 font-mono font-bold text-[#f3ebdd]">
                  GITHUB_TOKEN
                </td>
                <td className="py-3.5 px-5 font-mono text-[#8e8374]">
                  (optional)
                </td>
                <td className="py-3.5 px-5 text-[#b9ae9d]">
                  GitHub Personal Access Token for authenticated clones or
                  automated CI PR creation.
                </td>
              </tr>
              <tr className="hover:bg-[#1e1a16]/50 transition-colors">
                <td className="py-3.5 px-5 font-mono font-bold text-[#f3ebdd]">
                  AGENT_SKILLS_DIR
                </td>
                <td className="py-3.5 px-5 font-mono text-[#8e8374]">
                  Auto-detected (.agents/skills)
                </td>
                <td className="py-3.5 px-5 text-[#b9ae9d]">
                  Override path where local skills are populated on the host
                  filesystem.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Automating with GitHub Actions */}
      <section aria-label="GitHub Actions Integration" className="mb-16">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#161311] border border-[#2f2923] shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-4 rounded-full bg-[#d9a55b]" />
                <h2 className="text-lg font-bold text-[#f3ebdd] font-heading">
                  Automate Upstream Sync via GitHub Actions
                </h2>
              </div>
              <p className="text-xs text-[#8e8374]">
                Add to{" "}
                <code className="text-[#d9a55b] font-mono">
                  .github/workflows/sync-skills-upstream.yml
                </code>{" "}
                in any downstream repository.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(GITHUB_ACTIONS_RECIPE, "gha-recipe")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d9a55b] hover:bg-[#e6b56c] text-[#0e0c0a] text-xs font-bold transition-all shadow-[0_2px_12px_rgba(217,165,91,0.25)] cursor-pointer shrink-0 self-start sm:self-center"
            >
              {copiedKey === "gha-recipe" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#0e0c0a]" />
                  <span>Workflow YAML Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#0e0c0a]" />
                  <span>Copy Workflow YAML</span>
                </>
              )}
            </button>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#2f2923] bg-[#0e0c0a] font-mono text-xs shadow-inner">
            <div className="flex items-center justify-between px-4 py-2 bg-[#161311] border-b border-[#2f2923] text-[#8e8374]">
              <span className="text-[11px] font-mono">
                sync-skills-upstream.yml
              </span>
            </div>
            <pre className="p-4 sm:p-5 overflow-x-auto text-[#b9ae9d] leading-relaxed select-all">
              <code>{GITHUB_ACTIONS_RECIPE}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
