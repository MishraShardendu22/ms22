import type { GitHubData, Repository } from "@/types/stats";
import calendarData from "./githubCalendarData.json";

export interface GitHubCalendarDay {
  date: string;
  count: number;
  level: number;
}

export interface GitHubCalendarResponse {
  contributions: GitHubCalendarDay[];
  total: Record<string, number>;
}

export const FALLBACK_GITHUB_CALENDAR: GitHubCalendarResponse =
  calendarData as unknown as GitHubCalendarResponse;

export const FALLBACK_GITHUB_PROFILE: GitHubData = {
  login: "MishraShardendu22",
  name: "Shardendu Sankritya Mishra",
  avatar_url: "https://avatars.githubusercontent.com/u/100414963?v=4",
  bio: "Software Engineer and Life Long Science Student - Knowledge is Power but Powerless if got it but do not acknowledge it",
  location: "Kanpur, Uttar Pradesh",
  public_repos: 155,
  followers: 41,
  following: 8,
  created_at: "2022-03-24T00:00:00Z",
  html_url: "https://github.com/MishraShardendu22",
};

export const GITHUB_ORGANIZATIONS = [
  {
    name: "Career-Cafe",
    login: "Career-Cafe",
    url: "https://github.com/Career-Cafe",
    avatarUrl: "https://avatars.githubusercontent.com/u/320166382?v=4",
  },
  {
    name: "is-a-dev",
    login: "is-a-dev",
    url: "https://github.com/is-a-dev",
    avatarUrl: "https://avatars.githubusercontent.com/u/74644086?v=4",
  },
  {
    name: "ai-needl",
    login: "ai-needl",
    url: "https://github.com/ai-needl",
    avatarUrl: "https://avatars.githubusercontent.com/u/167732448?v=4",
  },
];

export const FALLBACK_PINNED_REPOSITORIES: Repository[] = [
  {
    name: "github-backup-engine",
    description:
      "Distributed GitHub backup automation & AI telemetry platform with PostgreSQL vector indexing, live WebSockets, and LangChain incident observatory. (Proprietary / Closed-Source)",
    html_url: "https://github.com/MishraShardendu22/github-backup-engine",
    stargazers_count: 6,
    language: "TypeScript",
    forks_count: 0,
    open_issues_count: 0,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2026-09-28T00:00:00Z",
  },
  {
    name: "dfs-based-repository-cleaning-engine",
    description:
      "Autonomous repository maintenance engine written in Go that traverses React codebases via depth-first search, detects unused UI components using static import analysis, verifies builds, and automates Git...",
    html_url:
      "https://github.com/MishraShardendu22/dfs-based-repository-cleaning-engine",
    stargazers_count: 11,
    language: "Go",
    forks_count: 1,
    open_issues_count: 0,
    created_at: "2024-02-01T00:00:00Z",
    updated_at: "2026-09-28T00:00:00Z",
  },
  {
    name: "git-metadata-rewriter",
    description:
      "Enterprise Git history re-anchoring & commit telemetry platform with sandboxed execution, AI diurnal timestamp modeling, and Go Templ dashboard. (Proprietary / Closed-Source)",
    html_url: "https://github.com/MishraShardendu22/git-metadata-rewriter",
    stargazers_count: 6,
    language: "Go",
    forks_count: 0,
    open_issues_count: 0,
    created_at: "2024-03-01T00:00:00Z",
    updated_at: "2026-09-28T00:00:00Z",
  },
  {
    name: "agentic-google-workspace-orchestrator",
    description:
      "Multi-service agentic orchestration platform for Gmail, Calendar, and Drive with Gemini 2.5 intent classification, Kahn's DAG execution planning, hybrid retrieval (pgvector + FTS with RRF), and safe execution.",
    html_url:
      "https://github.com/MishraShardendu22/agentic-google-workspace-orchestrator",
    stargazers_count: 6,
    language: "Python",
    forks_count: 0,
    open_issues_count: 0,
    created_at: "2024-04-01T00:00:00Z",
    updated_at: "2026-09-28T00:00:00Z",
  },
  {
    name: "repo-transfer-engine",
    description:
      "Enterprise Go microservice suite for concurrent GitHub repository transfers across organizations via GitHub REST API with adaptive rate-limit backoff and Go Templ UI. (Proprietary / Closed-Source)",
    html_url: "https://github.com/MishraShardendu22/repo-transfer-engine",
    stargazers_count: 6,
    language: "Go",
    forks_count: 0,
    open_issues_count: 0,
    created_at: "2024-05-01T00:00:00Z",
    updated_at: "2026-09-28T00:00:00Z",
  },
  {
    name: "agent-skills-engine",
    description:
      "Centralized library of modular, deterministic AI agent skills (SKILL.md) with bidirectional hub-and-spoke synchronization and pre-commit reflexes for Antigravity, Claude, and Jules. (Proprietary / Closed-Source)",
    html_url: "https://github.com/MishraShardendu22/agent-skills-engine",
    stargazers_count: 6,
    language: "TypeScript",
    forks_count: 0,
    open_issues_count: 0,
    created_at: "2024-06-01T00:00:00Z",
    updated_at: "2026-09-28T00:00:00Z",
  },
];
