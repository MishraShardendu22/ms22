export const BADGE_VARIANTS = {
  default: "bg-gray-500/10 border-gray-500/20 text-gray-400",
  success: "bg-green-500/10 border-green-500/20 text-green-400",
  info: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
} as const;

export const GRID_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

export const BUTTON_LABELS: Record<string, string> = {
  GitHub: "@MishraShardendu22",
  LinkedIn: "@shardendumishra22",
  Instagram: "@mishrashardendu22",
  Twitter: "@Shardendu_M",
  resume: "View Resume",
};
