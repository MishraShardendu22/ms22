export interface MasterAgentSkill {
  name: string;
  category: string;
  scope: string;
  description: string;
  link: string;
  rawUrl: string;
  githubUrl: string;
}

export const MASTER_SKILLS_CATALOG: MasterAgentSkill[] = [
  {
    name: "agent-observatory-workflow",
    category: "AI Engineering",
    scope: "generic",
    description:
      "Step-by-step instructions for building and extending Python AI agent services: adding LangChain/LiteLLM tools, Tool-Calling RAG workflows, enforcing Human-in-the-Loop approvals, multi-key model failover, and pgvector embeddings.",
    link: ".agents/skills/agent-observatory-workflow/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/agent-observatory-workflow/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/agent-observatory-workflow",
  },
  {
    name: "careercafe-curiotech",
    category: "Architecture",
    scope: "codebase-curiotech-careercafe",
    description:
      "Official visual design system, typography, theme models, multi-surface UI protocols, and frozen landing page specifications for CareerCafe and CurioTech products (v3.2).",
    link: ".agents/skills/careercafe-curiotech/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/careercafe-curiotech/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/careercafe-curiotech",
  },
  {
    name: "ci-cd-workflow",
    category: "DevOps & CI",
    scope: "generic",
    description:
      "Rules, architectures, and guidelines for maintaining GitHub Actions CI/CD workflows, container image publishing (GHCR and Docker Hub), security scanning, releases, and deployments.",
    link: ".agents/skills/ci-cd-workflow/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/ci-cd-workflow/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/ci-cd-workflow",
  },
  {
    name: "cli-tooling-guide",
    category: "DevOps & CI",
    scope: "generic",
    description:
      "Standard operating guide for first-class authenticated CLI tools in the repository: GitHub CLI (gh), Google Jules CLI (jules), Vercel CLI (vercel), Neon CLI (neonctl), Docker CLI (docker), uv, and pnpm.",
    link: ".agents/skills/cli-tooling-guide/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/cli-tooling-guide/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/cli-tooling-guide",
  },
  {
    name: "code-quality-and-validation",
    category: "Code Quality",
    scope: "generic",
    description:
      "Standards, tools, and commands for code formatting, linting, and static type checking across Go, Python, and TypeScript.",
    link: ".agents/skills/code-quality-and-validation/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/code-quality-and-validation/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/code-quality-and-validation",
  },
  {
    name: "codebase-simplification-guide",
    category: "Code Quality",
    scope: "generic",
    description:
      "Rules and principles for keeping this codebase clean, minimal, maintainable, and free of unnecessary abstractions.",
    link: ".agents/skills/codebase-simplification-guide/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/codebase-simplification-guide/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/codebase-simplification-guide",
  },
  {
    name: "doc-synchronization",
    category: "AI Engineering",
    scope: "generic",
    description:
      "High-priority rules and automated procedures for continuously keeping repository documentation, API references, architecture guides, changelogs, and agent skills synchronized with code changes autonomously without requiring human reminders.",
    link: ".agents/skills/doc-synchronization/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/doc-synchronization/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/doc-synchronization",
  },
  {
    name: "docker-first-architecture",
    category: "DevOps & CI",
    scope: "generic",
    description:
      "Rules, architectures, multi-stage Dockerfile blueprints, and container-first workflows for all microservices, frontends, and backends targeting container registries, AWS ECS/EKS, and self-hosting.",
    link: ".agents/skills/docker-first-architecture/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/docker-first-architecture/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/docker-first-architecture",
  },
  {
    name: "git-branch-management",
    category: "Git Ops",
    scope: "generic",
    description:
      "Rules and procedures for creating, naming, structuring, and navigating Git branches in the repository for both human contributors and AI agents.",
    link: ".agents/skills/git-branch-management/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/git-branch-management/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/git-branch-management",
  },
  {
    name: "git-commit-workflow",
    category: "Git Ops",
    scope: "generic",
    description:
      "High-priority rules, message formats, commit design taxonomy, and strict permission boundaries for creating frequent local Git commits. Enforces that AI agents and human contributors create granular, explanatory, categorized commits at each important milestone.",
    link: ".agents/skills/git-commit-workflow/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/git-commit-workflow/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/git-commit-workflow",
  },
  {
    name: "git-post-merge-cleanup",
    category: "Git Ops",
    scope: "generic",
    description:
      "Rules, safety constraints, and automated procedures for post-merge local Git cleanup, synchronizing main with GitHub, deleting stale local branches, and performing deep repository garbage collection (git gc, reflog expire, prune) strictly upon explicit human user request.",
    link: ".agents/skills/git-post-merge-cleanup/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/git-post-merge-cleanup/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/git-post-merge-cleanup",
  },
  {
    name: "git-worktree-management",
    category: "Git Ops",
    scope: "generic",
    description:
      "Standard operating procedure for ephemeral Git worktree isolation, directory conventions, branch-to-worktree 1:1 mapping, dirty-state protection, and multi-agent safety.",
    link: ".agents/skills/git-worktree-management/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/git-worktree-management/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/git-worktree-management",
  },
  {
    name: "github-backup-automation-system",
    category: "Git Ops",
    scope: "codebase-github-backup-automation-system",
    description:
      "System architecture, inter-service topology, database schemas, and AI observatory development runbooks for the GitHub Backup Automation System monorepo.",
    link: ".agents/skills/github-backup-automation-system/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/github-backup-automation-system/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/github-backup-automation-system",
  },
  {
    name: "github-pr-issue-automation",
    category: "Git Ops",
    scope: "generic",
    description:
      "Standard operating procedures for automated PR/issue creation, auto-assignment, conventional label categorization, and professional GitHub markdown standards for AI agents and human contributors.",
    link: ".agents/skills/github-pr-issue-automation/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/github-pr-issue-automation/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/github-pr-issue-automation",
  },
  {
    name: "github-repo-metadata-rewriter",
    category: "Git Ops",
    scope: "codebase-github-repo-metadata-rewriter",
    description:
      "System architecture, microservice topology, git history rewrite pipelines, AI timestamp distribution engine, sandboxed workspaces, and Go + Templ frontend runbooks for github-repo-metadata-rewriter.",
    link: ".agents/skills/github-repo-metadata-rewriter/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/github-repo-metadata-rewriter/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/github-repo-metadata-rewriter",
  },
  {
    name: "jules-ai-engineering-workflow",
    category: "AI Engineering",
    scope: "generic",
    description:
      "Standard operating procedures for the autonomous Jules AI engineering review-improve-converge loop, evaluating code across 38 architectural dimensions and preparing merge-ready PRs for the human Technical Lead.",
    link: ".agents/skills/jules-ai-engineering-workflow/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/jules-ai-engineering-workflow/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/jules-ai-engineering-workflow",
  },
  {
    name: "kiro-puter-subagents",
    category: "AI Engineering",
    scope: "generic",
    description:
      "Use this skill to delegate subtasks, code refactoring, file analysis, or live web search to external CLI subagents (kiro-pool with multi-account rotation and puter-ai-cli/mycli). Contains model-selection strategies to minimize token/credit burn and handles quota limits.",
    link: ".agents/skills/kiro-puter-subagents/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/kiro-puter-subagents/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/kiro-puter-subagents",
  },
  {
    name: "local-webhook-automation",
    category: "DevOps & CI",
    scope: "generic",
    description:
      "Architecture and runbook for local event-driven development automation using GitHub CLI webhook relays, background daemons, cold-boot reconciliation, and safe disk cleanup.",
    link: ".agents/skills/local-webhook-automation/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/local-webhook-automation/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/local-webhook-automation",
  },
  {
    name: "modern-toolchain-standard",
    category: "DevOps & CI",
    scope: "generic",
    description:
      "Standard operating specification for modern developer toolchains across all repositories: mandatory pnpm over npm/yarn, mandatory uv over bare pip/venv, Biome formatting/linting, and Vitest test runner.",
    link: ".agents/skills/modern-toolchain-standard/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/modern-toolchain-standard/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/modern-toolchain-standard",
  },
  {
    name: "polyglot-microservice-architecture",
    category: "Architecture",
    scope: "generic",
    description:
      "Architectural patterns, service boundaries, communication protocols, database schema guidelines, and deployment targets for polyglot systems (Next.js frontend, Python AI service, Go backend/worker, PostgreSQL).",
    link: ".agents/skills/polyglot-microservice-architecture/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/polyglot-microservice-architecture/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/polyglot-microservice-architecture",
  },
  {
    name: "precommit-workflow-management",
    category: "DevOps & CI",
    scope: "generic",
    description:
      "Rules, architecture, and runbooks for configuring, updating, and operating the intelligent Git pre-commit workflow.",
    link: ".agents/skills/precommit-workflow-management/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/precommit-workflow-management/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/precommit-workflow-management",
  },
  {
    name: "professional-communication-standard",
    category: "Protocols",
    scope: "generic",
    description:
      "Enforces strictly emoji-free, concise, objective, and technically rigorous communication standards across all AI agent interactions, prohibiting decorative emojis, conversational filler, and informal preambles.",
    link: ".agents/skills/professional-communication-standard/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/professional-communication-standard/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/professional-communication-standard",
  },
  {
    name: "pull-request-management",
    category: "Git Ops",
    scope: "generic",
    description:
      "Rules and runbooks for creating and managing GitHub Pull Requests when explicitly requested by the user. Enforces that all PRs must target 'main' only and are never created automatically.",
    link: ".agents/skills/pull-request-management/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/pull-request-management/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/pull-request-management",
  },
  {
    name: "repo-transfer-automation-system",
    category: "Git Ops",
    scope: "codebase-repo-transfer-automation-system",
    description:
      "System architecture, microservice topology, GitHub REST API rate limits, exponential backoff transfer protocols, and Go + Templ frontend runbooks for repo-transfer-automation-system.",
    link: ".agents/skills/repo-transfer-automation-system/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/repo-transfer-automation-system/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/repo-transfer-automation-system",
  },
  {
    name: "repository-maintenance",
    category: "Code Quality",
    scope: "generic",
    description:
      "Procedures for database schema integrity, idempotent migrations, backup/restore execution, and dependency maintenance.",
    link: ".agents/skills/repository-maintenance/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/repository-maintenance/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/repository-maintenance",
  },
  {
    name: "saas-and-mcp-architecture",
    category: "Architecture",
    scope: "generic",
    description:
      "Architectural patterns and implementation guidelines for SaaS connector hubs, pluggable multi-cloud storage engines, and Model Context Protocol (MCP) tool integrations.",
    link: ".agents/skills/saas-and-mcp-architecture/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/saas-and-mcp-architecture/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/saas-and-mcp-architecture",
  },
  {
    name: "skill-taxonomy-and-scope-governance",
    category: "Protocols",
    scope: "generic",
    description:
      "Standard operating rules for skill scope taxonomy (generic vs codebase-{codebase-name}), directory boundary isolation, and preventing accidental cross-codebase skill contamination.",
    link: ".agents/skills/skill-taxonomy-and-scope-governance/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/skill-taxonomy-and-scope-governance/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/skill-taxonomy-and-scope-governance",
  },
  {
    name: "stacked-pr-workflow",
    category: "Git Ops",
    scope: "generic",
    description:
      "Standard operating procedure for creating, maintaining, rebasing, and merging stacked pull requests (stacked diffs) without blocking dependent features.",
    link: ".agents/skills/stacked-pr-workflow/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/stacked-pr-workflow/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/stacked-pr-workflow",
  },
  {
    name: "test-creation-and-execution",
    category: "Code Quality",
    scope: "generic",
    description:
      "Rules, patterns, and runbooks for writing and running unit, integration, and AI agent test suites across Go, Python, and TypeScript frontends.",
    link: ".agents/skills/test-creation-and-execution/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/test-creation-and-execution/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/test-creation-and-execution",
  },
  {
    name: "ui-rules",
    category: "UI Design",
    scope: "generic",
    description:
      "Frontend visual invariants for the dashboard and every app built on the Observatory design system: tokens over hardcoded values, library components over hand-styled markup, the status vocabulary, no hover levitation, no AI aesthetic bloat, device-driven theme with no toggle.",
    link: ".agents/skills/ui-rules/SKILL.md",
    rawUrl:
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/.agents/skills/ui-rules/SKILL.md",
    githubUrl:
      "https://github.com/MishraShardendu22/agent-skills/tree/main/.agents/skills/ui-rules",
  },
];
