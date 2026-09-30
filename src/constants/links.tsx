export interface SocialLink {
  url: string;
  name: string;
  color: string;
  username: string;
  description: string;
  category: "social" | "projects" | "coding";
}

export const SOCIAL_LINKS: SocialLink[] = [
  // Main Portfolio
  {
    name: "Portfolio",
    username: "@MishraShardendu22",
    url: "https://mishrashardendu22.is-a.dev",
    category: "projects",
    color: "from-violet-500 to-blue-600",
    description: "My complete portfolio showcasing projects and experience",
  },
  // Social Media
  {
    name: "GitHub",
    username: "@MishraShardendu22",
    url: "https://github.com/MishraShardendu22",
    category: "social",
    color: "from-gray-700 to-gray-900",
    description: "Open source contributions and personal projects",
  },
  {
    name: "GitHub Alt",
    username: "@ShardenduMishra22",
    url: "https://github.com/ShardenduMishra22",
    category: "social",
    color: "from-gray-600 to-gray-800",
    description: "Alternative GitHub account for collaborative work",
  },
  {
    name: "LinkedIn",
    username: "@shardendumishra22",
    url: "https://www.linkedin.com/in/shardendumishra22/",
    category: "social",
    color: "from-blue-600 to-blue-800",
    description: "Professional network and career updates",
  },
  {
    name: "Twitter / X",
    username: "@Shardendu_M",
    url: "https://x.com/Shardendu_M",
    category: "social",
    color: "from-sky-500 to-blue-600",
    description: "Tech tweets and daily coding updates",
  },
  {
    name: "Instagram",
    username: "@mishrashardendu22",
    url: "https://www.instagram.com/mishrashardendu22/",
    category: "social",
    color: "from-pink-500 via-purple-500 to-orange-500",
    description: "Personal moments and tech journey",
  },
  {
    name: "Reddit",
    username: "u/SouLVaGeTa",
    url: "https://www.reddit.com/user/SouLVaGeTa/",
    category: "social",
    color: "from-orange-500 to-red-600",
    description: "Tech discussions and community engagement",
  },
  {
    name: "Telegram",
    username: "@MishraShardendu22",
    url: "https://t.me/MishraShardendu22",
    category: "social",
    color: "from-blue-400 to-blue-600",
    description: "Direct messaging and quick updates",
  },
  {
    name: "Discord",
    username: "shardendumishra_22",
    url: "https://discord.com/users/shardendumishra_22",
    category: "social",
    color: "from-indigo-500 to-purple-600",
    description: "Gaming, tech communities, and collaboration",
  },
  {
    name: "YouTube",
    username: "@Shardendu_Mishra",
    url: "https://www.youtube.com/@Shardendu_Mishra",
    category: "social",
    color: "from-red-500 to-red-700",
    description: "Tech tutorials and coding videos",
  },
  {
    name: "Gravatar",
    username: "@personahonestly8a347f9823",
    url: "https://gravatar.com/personahonestly8a347f9823",
    category: "social",
    color: "from-blue-500 to-violet-600",
    description: "My globally recognized avatar profile",
  },
  // Coding Platforms
  {
    name: "LeetCode",
    username: "@ShardenduMishra22",
    url: "https://leetcode.com/u/ShardenduMishra22/",
    category: "coding",
    color: "from-yellow-500 to-orange-600",
    description: "Competitive programming and problem solving",
  },
  // Projects
  {
    name: "Tech Blog",
    username: "blogs.mishrashardendu22.is-a.dev",
    url: "https://blogs.mishrashardendu22.is-a.dev",
    category: "projects",
    color: "from-green-500 to-emerald-600",
    description: "Technical articles and coding tutorials",
  },
  {
    name: "Treasure Hunt Game",
    username: "treasure-hunt.mishrashardendu22.is-a.dev",
    url: "https://treasure-hunt.mishrashardendu22.is-a.dev",
    category: "projects",
    color: "from-purple-500 to-indigo-600",
    description: "Interactive treasure hunt web game",
  },
  {
    name: "Pixel Art 8-Bit",
    username: "pixel-art-8-bit.mishrashardendu22.is-a.dev",
    url: "https://pixel-art-8-bit.mishrashardendu22.is-a.dev",
    category: "projects",
    color: "from-rose-500 to-pink-600",
    description: "Retro pixel art creation tool",
  },
  {
    name: "GitHub Backup Observatory",
    username: "github.mishrashardendu22.is-a.dev",
    url: "https://github.mishrashardendu22.is-a.dev",
    category: "projects",
    color: "from-gray-600 to-gray-800",
    description: "GitHub repository backup and analytics tool",
  },
];

export const LINK_CATEGORIES = {
  projects: "My Projects",
  social: "Connect With Me",
  coding: "Coding Platforms",
} as const;
