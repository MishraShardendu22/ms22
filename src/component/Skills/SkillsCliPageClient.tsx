"use client";

import { ArrowLeft, ArrowUpRight, Check, Copy } from "lucide-react";
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

Total: 20 skills installed.`,
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
    <div className="w-full relative z-10">
      {/* Disciplined Header matching ServerPageHeader */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/skills"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Agent Skills</span>
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-xs text-violet-400 font-mono">CLI Guide</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-heading">
            skills-sync CLI
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Lightweight POSIX synchronization engine for cross-repository agent
            skill workflows
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/skills"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900/80 hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white transition-all text-xs font-medium"
          >
            <span>Browse Skills</span>
          </Link>
          <a
            href="https://github.com/MishraShardendu22/agent-skills/blob/main/scripts/skills-sync.sh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 text-violet-300 hover:text-white transition-all text-xs font-medium"
          >
            <GitHubIcon className="w-3.5 h-3.5" />
            <span>View Source</span>
            <ArrowUpRight className="w-3 h-3 text-violet-400" />
          </a>
        </div>
      </div>

      {/* Quick Install Strip */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3 bg-gray-900/80 border border-gray-800/80 rounded-xl mb-8 text-xs text-gray-400">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-gray-300 font-medium shrink-0">
            Quick install:
          </span>
          <code className="px-2.5 py-1 rounded bg-gray-950 border border-gray-800 font-mono text-[11px] text-gray-200 select-all truncate max-w-xs sm:max-w-md lg:max-w-xl">
            {INSTALL_CURL}
          </code>
        </div>
        <button
          type="button"
          onClick={() => handleCopy(INSTALL_CURL, "hero-install")}
          className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-xs font-medium transition-colors cursor-pointer shrink-0"
        >
          {copiedKey === "hero-install" ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-gray-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Hub & Spoke Architecture - Clean cards without decorative clutter */}
      <section aria-label="Architecture" className="mb-8">
        <h2 className="text-base font-bold text-white mb-3">Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Hub */}
          <div className="relative h-full p-5 bg-gray-900/95 backdrop-blur-sm border border-gray-800/70 rounded-xl flex flex-col justify-between shadow-lg">
            <div>
              <div className="mb-2.5">
                <span className="px-2.5 py-0.5 bg-gray-800/80 text-gray-300 text-[11px] font-medium rounded-md border border-gray-700/70">
                  Central Hub
                </span>
              </div>
              <h3 className="text-sm font-bold text-white font-mono mb-1.5">
                MishraShardendu22/agent-skills
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Canonical repository of 20 verified agent skills, schema
                validator, CI workflows, and release tags.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-800/70 text-[11px] text-gray-500 font-mono">
              Enforces SKILL.md specification
            </div>
          </div>

          {/* Card 2: Sync Engine */}
          <div className="relative h-full p-5 bg-gray-900/95 backdrop-blur-sm border border-gray-800/70 rounded-xl flex flex-col justify-between shadow-lg">
            <div>
              <div className="mb-2.5">
                <span className="px-2.5 py-0.5 bg-gray-800/80 text-gray-300 text-[11px] font-medium rounded-md border border-gray-700/70">
                  Sync Engine
                </span>
              </div>
              <h3 className="text-sm font-bold text-white font-mono mb-1.5">
                skills-sync CLI
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Standalone portable bash script with zero external runtime
                dependencies. Executes git-level synchronization and branch
                creation.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-800/70 text-[11px] text-violet-400 font-mono">
              Bidirectional pull &amp; push
            </div>
          </div>

          {/* Card 3: Downstream Spokes */}
          <div className="relative h-full p-5 bg-gray-900/95 backdrop-blur-sm border border-gray-800/70 rounded-xl flex flex-col justify-between shadow-lg">
            <div>
              <div className="mb-2.5">
                <span className="px-2.5 py-0.5 bg-gray-800/80 text-gray-300 text-[11px] font-medium rounded-md border border-gray-700/70">
                  Downstream Spokes
                </span>
              </div>
              <h3 className="text-sm font-bold text-white font-mono mb-1.5">
                Local Repositories
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Run{" "}
                <code className="text-violet-300 font-mono">
                  skills-sync pull
                </code>{" "}
                in any repository to equip coding agents with standardized team
                runbooks.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-800/70 text-[11px] text-gray-500 font-mono">
              Stored in .agents/skills/
            </div>
          </div>
        </div>
      </section>

      {/* Installation Methods */}
      <section aria-label="Installation" className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <h2 className="text-base font-bold text-white">
            Installation Methods
          </h2>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setInstallTab("global")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                installTab === "global"
                  ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                  : "bg-gray-900/60 text-gray-400 hover:text-gray-200 border border-gray-800/80"
              }`}
            >
              Global
            </button>
            <button
              type="button"
              onClick={() => setInstallTab("project")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                installTab === "project"
                  ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                  : "bg-gray-900/60 text-gray-400 hover:text-gray-200 border border-gray-800/80"
              }`}
            >
              Per-Project
            </button>
            <button
              type="button"
              onClick={() => setInstallTab("manual")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                installTab === "manual"
                  ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                  : "bg-gray-900/60 text-gray-400 hover:text-gray-200 border border-gray-800/80"
              }`}
            >
              Manual Git
            </button>
          </div>
        </div>

        <div className="p-5 bg-gray-900/95 border border-gray-800/70 rounded-xl shadow-lg">
          {installTab === "global" && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-white block mb-1">
                  1. Run the one-line installer
                </span>
                <p className="text-xs text-gray-400 mb-2">
                  Installs binary to{" "}
                  <code className="text-gray-300 font-mono">
                    ~/.local/bin/skills-sync
                  </code>{" "}
                  and ensures executable permissions.
                </p>
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-gray-950 border border-gray-800 font-mono text-xs text-gray-300">
                  <span className="truncate">{INSTALL_CURL}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(INSTALL_CURL, "tab-curl")}
                    className="p-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer shrink-0"
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

              <div className="pt-3 border-t border-gray-800/70">
                <span className="text-xs font-bold text-white block mb-1">
                  2. Ensure ~/.local/bin is in PATH
                </span>
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-gray-950 border border-gray-800 font-mono text-xs text-gray-300">
                  <span>export PATH=&quot;$HOME/.local/bin:$PATH&quot;</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        'export PATH="$HOME/.local/bin:$PATH"',
                        "tab-path",
                      )
                    }
                    className="p-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer shrink-0"
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
            <div className="space-y-3">
              <p className="text-xs text-gray-400">
                Embed the script directly into a project repository without
                global installation:
              </p>
              <div className="p-3 rounded-lg bg-gray-950 border border-gray-800 font-mono text-xs space-y-1.5 text-gray-300">
                <p className="text-gray-500">
                  # 1. Download script into project scripts/
                </p>
                <p>
                  mkdir -p scripts && curl -fsSL {SCRIPT_RAW_URL} -o
                  scripts/skills-sync.sh
                </p>
                <p className="text-gray-500"># 2. Make executable & run</p>
                <p>
                  chmod +x scripts/skills-sync.sh && ./scripts/skills-sync.sh
                  pull
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
              >
                {copiedKey === "project-cmd" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Commands</span>
                  </>
                )}
              </button>
            </div>
          )}

          {installTab === "manual" && (
            <div className="space-y-3">
              <p className="text-xs text-gray-400">
                Clone the repository and symlink the executable into your local
                binary path:
              </p>
              <div className="p-3 rounded-lg bg-gray-950 border border-gray-800 font-mono text-xs space-y-1.5 text-gray-300">
                <p>
                  git clone
                  https://github.com/MishraShardendu22/agent-skills.git
                </p>
                <p>cd agent-skills && chmod +x scripts/skills-sync.sh</p>
                <p>
                  mkdir -p ~/.local/bin && ln -sf
                  &quot;$(pwd)/scripts/skills-sync.sh&quot;
                  ~/.local/bin/skills-sync
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Command Reference */}
      <section aria-label="Command Reference" className="mb-8">
        <h2 className="text-base font-bold text-white mb-3">
          Command Reference
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Command selector list (left) */}
          <div className="lg:col-span-4 space-y-2">
            {COMMANDS.map((cmd) => {
              const active = cmd.id === activeCommand;
              return (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={() => setActiveCommand(cmd.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    active
                      ? "bg-violet-500/15 border-violet-500/40 text-white"
                      : "bg-gray-900/70 border-gray-800/70 hover:bg-gray-800/60 text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <div className="min-w-0">
                    <span className="font-mono text-xs font-bold block truncate">
                      {cmd.name}
                    </span>
                    <span className="text-[11px] text-gray-500 line-clamp-1">
                      {cmd.description}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-800 text-gray-400 border border-gray-700/60 shrink-0">
                    {cmd.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Command detail & output (right) */}
          <div className="lg:col-span-8 p-5 rounded-xl bg-gray-900/95 border border-gray-800/70 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-gray-800/70">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-mono font-bold text-white truncate">
                      {selectedCmd.syntax}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-violet-500/10 text-violet-300 border border-violet-500/20 shrink-0">
                      {selectedCmd.badge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {selectedCmd.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(selectedCmd.syntax, selectedCmd.id)}
                  className="px-2.5 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-xs font-medium transition-colors cursor-pointer shrink-0"
                >
                  {copiedKey === selectedCmd.id ? (
                    <span className="text-emerald-400">Copied!</span>
                  ) : (
                    <span>Copy</span>
                  )}
                </button>
              </div>

              <div className="mb-4">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Execution Details:
                </span>
                <ul className="space-y-1 pl-4 list-disc text-xs text-gray-400 leading-relaxed">
                  {selectedCmd.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>

              {/* Terminal Output */}
              <div>
                <span className="text-[11px] font-mono text-gray-500 block mb-1.5">
                  Terminal Output:
                </span>
                <pre className="p-3 rounded-lg bg-gray-950 border border-gray-800 font-mono text-xs text-gray-300 overflow-x-auto leading-relaxed">
                  <code>{selectedCmd.mockOutput}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environment Variables Reference */}
      <section aria-label="Environment Variables" className="mb-8">
        <h2 className="text-base font-bold text-white mb-3">
          Environment Variables
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-800/70 bg-gray-900/95 shadow-lg">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 bg-gray-950/40">
                <th className="py-3 px-4 font-mono font-semibold">VARIABLE</th>
                <th className="py-3 px-4 font-mono font-semibold">DEFAULT</th>
                <th className="py-3 px-4 font-semibold">DESCRIPTION</th>
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
                  GitHub Personal Access Token for authenticated clones or
                  automated CI PR creation.
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
      <section aria-label="GitHub Actions Integration" className="mb-12">
        <div className="p-5 rounded-xl bg-gray-900/95 border border-gray-800/70 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <h2 className="text-base font-bold text-white mb-0.5">
                Automate Upstream Sync via GitHub Actions
              </h2>
              <p className="text-xs text-gray-400">
                Add to{" "}
                <code className="text-violet-300 font-mono">
                  .github/workflows/sync-skills-upstream.yml
                </code>{" "}
                in any downstream project.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(GITHUB_ACTIONS_RECIPE, "gha-recipe")}
              className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors cursor-pointer shrink-0 self-start sm:self-center"
            >
              {copiedKey === "gha-recipe" ? (
                <span className="text-emerald-200">Copied!</span>
              ) : (
                <span>Copy Workflow YAML</span>
              )}
            </button>
          </div>

          <div className="rounded-lg overflow-hidden border border-gray-800 bg-gray-950 font-mono text-xs">
            <pre className="p-4 overflow-x-auto text-gray-300 leading-relaxed">
              <code>{GITHUB_ACTIONS_RECIPE}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
