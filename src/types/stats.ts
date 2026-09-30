// GitHub Types
export interface GitHubData {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
}

// LeetCode Types
export interface LeetCodeData {
  profile: {
    realName: string;
    ranking: number;
    userAvatar: string;
  };
  submitStats: {
    acSubmissionNum: Array<{
      difficulty: string;
      count: number;
      submissions: number;
    }>;
  };
}
