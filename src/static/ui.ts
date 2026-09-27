export const BADGE_VARIANTS = {
  default: "bg-[#1e1a16] border-[#2f2923] text-[#8e8374]",
  success: "bg-[#4caf7d]/10 border-[#4caf7d]/20 text-[#4caf7d]",
  info: "bg-[#d9a55b]/10 border-[#d9a55b]/20 text-[#d9a55b]",
  warning: "bg-[#e8893f]/10 border-[#e8893f]/20 text-[#e8893f]",
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
