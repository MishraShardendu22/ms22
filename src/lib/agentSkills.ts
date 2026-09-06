/**
 * Agent Skills fetching, parsing, and caching utilities.
 * Connects directly to https://github.com/MishraShardendu22/agent-skills
 */

export interface AgentSkill {
  name: string;
  category: string;
  description: string;
  link: string;
  rawUrl: string;
  githubUrl: string;
}

export interface AgentSkillsCategory {
  name: string;
  skills: AgentSkill[];
}

export interface AgentRepoCommit {
  sha: string;
  shortSha: string;
  message: string;
  author: string;
  date: string;
  relativeTime: string;
  verified: boolean;
  htmlUrl: string;
}

export interface AgentSkillsData {
  skills: AgentSkill[];
  categories: AgentSkillsCategory[];
  totalSkills: number;
  commit: AgentRepoCommit | null;
  lastSyncedAt: string;
  isLive: boolean;
}

export const AGENT_SKILLS_REPO = "MishraShardendu22/agent-skills";
export const AGENT_SKILLS_RAW_BASE =
  "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main";
export const AGENT_SKILLS_GITHUB_BASE =
  "https://github.com/MishraShardendu22/agent-skills/tree/main";

// Comprehensive fallback dataset ensures 100% uptime even if GitHub API is offline or rate-limited
export const FALLBACK_SKILLS: AgentSkill[] = [
  // 1. Communication Standards & Core Protocols
  {
    name: "professional-communication-standard",
    category: "Communication Standards & Core Protocols",
    description:
      "Enforces strictly emoji-free, concise, objective, and technically rigorous responses without fluff or conversational preambles.",
    link: ".agents/skills/professional-communication-standard/SKILL.md",
    rawUrl: `${AGENT_SKILLS_RAW_BASE}/.agents/skills/professional-communication-standard/SKILL.md`,
    githubUrl: `${AGENT_SKILLS_GITHUB_BASE}/.agents/skills/professional-communication-standard`,
  },

  // 2. Autonomous Git & Version Control
  {
    name: "git-branch-management",
    category: "Autonomous Git & Version Control",
    description:
      "Rules and procedures for creating, naming, structuring, and navigating Git branches.",
    link: ".agents/skills/git-branch-management/SKILL.md",
    rawUrl: `${AGENT_SKILLS_RAW_BASE}/.agents/skills/git-branch-management/SKILL.md`,
    githubUrl: `${AGENT_SKILLS_GITHUB_BASE}/.agents/skills/git-branch-management`,
  },
  {
    name: "git-commit-workflow",
    category: "Autonomous Git & Version Control",
    description:
      "Commit design taxonomy, semantic commit formatting, and mandatory GPG signing.",
    link: ".agents/skills/git-commit-workflow/SKILL.md",
    rawUrl: `${AGENT_SKILLS_RAW_BASE}/.agents/skills/git-commit-workflow/SKILL.md`,
    githubUrl: `${AGENT_SKILLS_GITHUB_BASE}/.agents/skills/git-commit-workflow`,
  },
  {
    name: "pull-request-management",
    category: "Autonomous Git & Version Control",
    description:
      "Runbooks for authoring and managing clean PRs targeting main with PR consolidation.",
    link: ".agents/skills/pull-request-management/SKILL.md",
    rawUrl: `${AGENT_SKILLS_RAW_BASE}/.agents/skills/pull-request-management/SKILL.md`,
    githubUrl: `${AGENT_SKILLS_GITHUB_BASE}/.agents/skills/pull-request-management`,
  },
  {
    name: "github-pr-issue-automation",
    category: "Autonomous Git & Version Control",
    description:
      "Auto-assignment, conventional label categorization, and GitHub markdown standards.",
    link: ".agents/skills/github-pr-issue-automation/SKILL.md",
    rawUrl: `${AGENT_SKILLS_RAW_BASE}/.agents/skills/github-pr-issue-automation/SKILL.md`,
    githubUrl: `${AGENT_SKILLS_GITHUB_BASE}/.agents/skills/github-pr-issue-automation`,
  },
  {
    name: "git-post-merge-cleanup",
    category: "Autonomous Git & Version Control",
    description:
      "Post-merge branch synchronization, stale branch pruning, and repository garbage collection.",
    link: ".agents/skills/git-post-merge-cleanup/SKILL.md",
    rawUrl: `${AGENT_SKILLS_RAW_BASE}/.agents/skills/git-post-merge-cleanup/SKILL.md`,
    githubUrl: `${AGENT_SKILLS_GITHUB_BASE}/.agents/skills/git-post-merge-cleanup`,
  },

  // 3. AI Engineering & Autonomous Review
  {
    name: "jules-ai-engineering-workflow",
    category: "AI Engineering & Autonomous Review",
    description:
      "Autonomous Jules AI review loop across 38 architectural dimensions for Tech Lead delegation.",
    link: ".agents/skills/jules-ai-engineering-workflow/SKILL.md",
    rawUrl: `${AGENT_SKILLS_RAW_BASE}/.agents/skills/jules-ai-engineering-workflow/SKILL.md`,
    githubUrl: `${AGENT_SKILLS_GITHUB_BASE}/.agents/skills/jules-ai-engineering-workflow`,
  },
  {
    name: "agent-observatory-workflow",
    category: "AI Engineering & Autonomous Review",
    description:
      "LangChain tool-calling, Tool-Calling RAG workflows, pgvector search, and HITL protocols.",
    link: ".agents/skills/agent-observatory-workflow/SKILL.md",
    rawUrl: `${AGENT_SKILLS_RAW_BASE}/.agents/skills/agent-observatory-workflow/SKILL.md`,
    githubUrl: `${AGENT_SKILLS_GITHUB_BASE}/.agents/skills/agent-observatory-workflow`,
  },
  {
    name: "doc-synchronization",
    category: "AI Engineering & Autonomous Review",
    description:
      "Autonomous synchronization of documentation, changelogs, and skills without human prompting.",
    link: ".agents/skills/doc-synchronization/SKILL.md",
    rawUrl: `${AGENT_SKILLS_RAW_BASE}/.agents/skills/doc-synchronization/SKILL.md`,
    githubUrl: `${AGENT_SKILLS_GITHUB_BASE}/.agents/skills/doc-synchronization`,
  },

  // 4. DevOps, Tooling & CI/CD Pipelines
  {
    name: "docker-first-architecture",
    category: "DevOps, Tooling & CI/CD Pipelines",
    description:
      "Enforces multi-stage production Dockerfiles, optimal toolchains (pnpm, uv, static Go), and Docker Hub automation.",
    link: ".agents/skills/docker-first-architecture/SKILL.md",
    rawUrl: `${AGENT_SKILLS_RAW_BASE}/.agents/skills/docker-first-architecture/SKILL.md`,
    githubUrl: `${AGENT_SKILLS_GITHUB_BASE}/.agents/skills/docker-first-architecture`,
  },
  {
    name: "ci-cd-workflow",
    category: "DevOps, Tooling & CI/CD Pipelines",
    description:
      "Multi-environment CI/CD workflows, Docker Hub publishing, Render & Vercel deployments.",
    link: ".agents/skills/ci-cd-workflow/SKILL.md",
    rawUrl: `${AGENT_SKILLS_RAW_BASE}/.agents/skills/ci-cd-workflow/SKILL.md`,
    githubUrl: `${AGENT_SKILLS_GITHUB_BASE}/.agents/skills/ci-cd-workflow`,
  },
  {
    name: "cli-tooling-guide",
    category: "DevOps, Tooling & CI/CD Pipelines",
    description:
      "Standard operating guide for authenticated CLI tools (gh, jules, vercel, neonctl, docker).",
    link: ".agents/skills/cli-tooling-guide/SKILL.md",
    rawUrl: `${AGENT_SKILLS_RAW_BASE}/.agents/skills/cli-tooling-guide/SKILL.md`,
    githubUrl: `${AGENT_SKILLS_GITHUB_BASE}/.agents/skills/cli-tooling-guide`,
  },
  {
    name: "modern-toolchain-standard",
    category: "DevOps, Tooling & CI/CD Pipelines",
    description:
      "Standard operating specification: mandatory pnpm over npm, mandatory uv over bare pip, Biome, and Vitest.",
    link: ".agents/skills/modern-toolchain-standard/SKILL.md",
    rawUrl: `${AGENT_SKILLS_RAW_BASE}/.agents/skills/modern-toolchain-standard/SKILL.md`,
    githubUrl: `${AGENT_SKILLS_GITHUB_BASE}/.agents/skills/modern-toolchain-standard`,
  },
  {
    name: "precommit-workflow-management",
    category: "DevOps, Tooling & CI/CD Pipelines",
    description:
      "Maintain, configure, and execute intelligent multi-language pre-commit hook suites.",
    link: ".agents/skills/precommit-workflow-management/SKILL.md",
    rawUrl: `${AGENT_SKILLS_RAW_BASE}/.agents/skills/precommit-workflow-management/SKILL.md`,
    githubUrl: `${AGENT_SKILLS_GITHUB_BASE}/.agents/skills/precommit-workflow-management`,
  },

  // 5. Code Quality, Testing & Simplification
  {
    name: "code-quality-and-validation",
    category: "Code Quality, Testing & Simplification",
    description:
      "Standards, formatters, linters, and static type checking for Go, Python, and TypeScript.",
    link: ".agents/skills/code-quality-and-validation/SKILL.md",
    rawUrl: `${AGENT_SKILLS_RAW_BASE}/.agents/skills/code-quality-and-validation/SKILL.md`,
    githubUrl: `${AGENT_SKILLS_GITHUB_BASE}/.agents/skills/code-quality-and-validation`,
  },
  {
    name: "codebase-simplification-guide",
    category: "Code Quality, Testing & Simplification",
    description:
      "Architecture minimalism, dead code elimination, and abstraction reduction.",
    link: ".agents/skills/codebase-simplification-guide/SKILL.md",
    rawUrl: `${AGENT_SKILLS_RAW_BASE}/.agents/skills/codebase-simplification-guide/SKILL.md`,
    githubUrl: `${AGENT_SKILLS_GITHUB_BASE}/.agents/skills/codebase-simplification-guide`,
  },
  {
    name: "test-creation-and-execution",
    category: "Code Quality, Testing & Simplification",
    description:
      "Multi-layer test creation, mocks, integration testing, and agent eval test suites.",
    link: ".agents/skills/test-creation-and-execution/SKILL.md",
    rawUrl: `${AGENT_SKILLS_RAW_BASE}/.agents/skills/test-creation-and-execution/SKILL.md`,
    githubUrl: `${AGENT_SKILLS_GITHUB_BASE}/.agents/skills/test-creation-and-execution`,
  },
  {
    name: "repository-maintenance",
    category: "Code Quality, Testing & Simplification",
    description:
      "Database integrity, idempotent migrations, backup verification, and dependency management.",
    link: ".agents/skills/repository-maintenance/SKILL.md",
    rawUrl: `${AGENT_SKILLS_RAW_BASE}/.agents/skills/repository-maintenance/SKILL.md`,
    githubUrl: `${AGENT_SKILLS_GITHUB_BASE}/.agents/skills/repository-maintenance`,
  },

  // 6. System Architecture & SaaS Systems
  {
    name: "saas-and-mcp-architecture",
    category: "System Architecture & SaaS Systems",
    description:
      "SaaS Connector Hub, encrypted secret vaults, cloud storage, and MCP tool expansions.",
    link: ".agents/skills/saas-and-mcp-architecture/SKILL.md",
    rawUrl: `${AGENT_SKILLS_RAW_BASE}/.agents/skills/saas-and-mcp-architecture/SKILL.md`,
    githubUrl: `${AGENT_SKILLS_GITHUB_BASE}/.agents/skills/saas-and-mcp-architecture`,
  },
  {
    name: "polyglot-microservice-architecture",
    category: "System Architecture & SaaS Systems",
    description:
      "Polyglot architecture guidelines, service boundaries, pgvector hybrid search, and cloud deployments.",
    link: ".agents/skills/polyglot-microservice-architecture/SKILL.md",
    rawUrl: `${AGENT_SKILLS_RAW_BASE}/.agents/skills/polyglot-microservice-architecture/SKILL.md`,
    githubUrl: `${AGENT_SKILLS_GITHUB_BASE}/.agents/skills/polyglot-microservice-architecture`,
  },
];

export function groupSkillsByCategory(
  skills: AgentSkill[],
): AgentSkillsCategory[] {
  const map = new Map<string, AgentSkill[]>();
  for (const skill of skills) {
    const list = map.get(skill.category) || [];
    list.push(skill);
    map.set(skill.category, list);
  }

  return Array.from(map.entries()).map(([name, categorySkills]) => ({
    name,
    skills: categorySkills,
  }));
}

function getRelativeTime(dateString: string): string {
  try {
    const then = new Date(dateString).getTime();
    const now = Date.now();
    const diffSeconds = Math.max(0, Math.floor((now - then) / 1000));

    if (diffSeconds < 60) return "just now";
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays}d ago`;
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths}mo ago`;
  } catch {
    return "recently";
  }
}

/**
 * Parses README.md markdown content to extract the master skills catalog.
 */
export function parseSkillsFromReadme(markdown: string): AgentSkill[] {
  const skills: AgentSkill[] = [];
  const lines = markdown.split("\n");

  let currentCategory = "General Skills";
  let inCatalogSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]?.trim() || "";

    if (line.includes("## Master Skills Catalog")) {
      inCatalogSection = true;
      continue;
    }

    if (
      inCatalogSection &&
      line.startsWith("## ") &&
      !line.includes("Master Skills Catalog")
    ) {
      // Reached next top-level section
      break;
    }

    if (!inCatalogSection) continue;

    // Check for category heading e.g. "### 1. Communication Standards & Core Protocols"
    const categoryMatch = line.match(/^###\s+(?:\d+\.\s+)?(.+)$/);
    if (categoryMatch) {
      currentCategory = categoryMatch[1]?.trim() || currentCategory;
      continue;
    }

    // Check for table row e.g. | `skill-name` | description | [`.agents/...`](...) |
    if (
      line.startsWith("|") &&
      !line.includes(":---") &&
      !line.includes("Direct Link")
    ) {
      const parts = line
        .split("|")
        .map((p) => p.trim())
        .filter(Boolean);

      if (parts.length >= 2) {
        const rawName = parts[0] || "";
        const cleanName = rawName.replace(/[`*]/g, "").trim();

        // Skip header row
        if (cleanName.toLowerCase() === "skill") continue;

        const description = parts[1] || "";
        const linkPart = parts[2] || "";

        let linkPath = `.agents/skills/${cleanName}/SKILL.md`;
        const linkMatch = linkPart.match(/\(([^)]+)\)/);
        if (linkMatch?.[1]) {
          linkPath = linkMatch[1];
        }

        if (cleanName) {
          skills.push({
            name: cleanName,
            category: currentCategory,
            description,
            link: linkPath,
            rawUrl: `${AGENT_SKILLS_RAW_BASE}/${linkPath.replace(/^\.?\//, "")}`,
            githubUrl: `${AGENT_SKILLS_GITHUB_BASE}/.agents/skills/${cleanName}`,
          });
        }
      }
    }
  }

  return skills.length > 0 ? skills : FALLBACK_SKILLS;
}

/**
 * Fetches the latest commit on the main branch of MishraShardendu22/agent-skills
 */
export async function fetchLatestCommit(): Promise<AgentRepoCommit | null> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "MishraShardendu22-Portfolio-Agent",
    };

    const token =
      process.env.SKILLS_SYNC_TOKEN ||
      process.env.GITHUB_TOKEN ||
      process.env.NEXT_PUBLIC_GITHUB_TOKEN;

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(
      "https://api.github.com/repos/MishraShardendu22/agent-skills/commits/main",
      {
        next: { revalidate: 60, tags: ["agent-skills-commit"] },
        headers,
      },
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    const sha = data.sha || "";
    const shortSha = sha.slice(0, 7);
    const message =
      data.commit?.message?.split("\n")[0] || "Update agent skills";
    const author =
      data.commit?.author?.name || data.author?.login || "Shardendu Mishra";
    const date = data.commit?.author?.date || new Date().toISOString();
    const verified = Boolean(data.commit?.verification?.verified);
    const htmlUrl =
      data.html_url ||
      `https://github.com/MishraShardendu22/agent-skills/commit/${sha}`;

    return {
      sha,
      shortSha,
      message,
      author,
      date,
      relativeTime: getRelativeTime(date),
      verified,
      htmlUrl,
    };
  } catch (err) {
    console.warn("Failed to fetch latest agent skills commit:", err);
    return null;
  }
}

/**
 * Fetches the skills catalog from GitHub raw README or fallback.
 */
export async function getAgentSkillsData(): Promise<AgentSkillsData> {
  let skills = FALLBACK_SKILLS;
  let isLive = false;

  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/MishraShardendu22/agent-skills/main/README.md",
      {
        next: { revalidate: 60, tags: ["agent-skills"] },
      },
    );

    if (res.ok) {
      const markdown = await res.text();
      const parsed = parseSkillsFromReadme(markdown);
      if (parsed.length > 0) {
        skills = parsed;
        isLive = true;
      }
    }
  } catch (err) {
    console.warn("Failed to fetch raw README.md, using fallback dataset:", err);
  }

  const commit = await fetchLatestCommit();
  const categories = groupSkillsByCategory(skills);

  return {
    skills,
    categories,
    totalSkills: skills.length,
    commit,
    lastSyncedAt: new Date().toISOString(),
    isLive,
  };
}

/**
 * Fetches the raw SKILL.md runbook for a specific skill.
 */
export async function fetchSkillRunbook(slug: string): Promise<{
  name: string;
  markdown: string;
  githubUrl: string;
} | null> {
  const cleanSlug = slug.trim().toLowerCase();
  const url = `${AGENT_SKILLS_RAW_BASE}/.agents/skills/${cleanSlug}/SKILL.md`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 120, tags: [`skill-${cleanSlug}`] },
    });

    if (res.ok) {
      const markdown = await res.text();
      return {
        name: cleanSlug,
        markdown,
        githubUrl: `${AGENT_SKILLS_GITHUB_BASE}/.agents/skills/${cleanSlug}`,
      };
    }
  } catch (err) {
    console.warn(`Failed to fetch runbook for skill ${cleanSlug}:`, err);
  }

  return null;
}
