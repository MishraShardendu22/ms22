import type { GitHubData } from "@/types/stats";
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
    name: "ai-needl",
    login: "ai-needl",
    url: "https://github.com/ai-needl",
    avatarUrl: "https://avatars.githubusercontent.com/u/167732448?v=4",
  },
];
