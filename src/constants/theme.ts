/**
 * Centralized theme configuration
 * Used across components for consistent color theming
 */

export const THEME_COLORS = [
  "blue",
  "pink",
  "purple",
  "emerald",
  "violet",
] as const;
export type ThemeColor = (typeof THEME_COLORS)[number];

// Common theme types for different components
export type ListCardTheme = "blue" | "pink" | "purple" | "violet";
export type PageHeaderTheme = "blue" | "pink" | "purple" | "violet";
export type PaginationTheme = "blue" | "emerald" | "pink" | "purple" | "violet";
export type SectionTheme = "blue" | "emerald" | "pink" | "purple" | "violet";
export type DetailTreeTheme = "blue" | "purple" | "pink" | "violet";

// Shared active/status badge styles (green for active status)
export const ACTIVE_BADGE_STYLES = {
  activeBg: "bg-green-500/10",
  activeText: "text-green-400",
  activeBorder: "border-green-500/25",
} as const;

// List card theme configuration
export interface ListCardThemeConfig {
  border: string;
  gradientBg: string;
  titleHover: string;
  subtitleColor: string;
  techExtraBg: string;
  techExtraText: string;
  techExtraBorder: string;
  viewColor: string;
  activeBg: string;
  activeText: string;
  activeBorder: string;
}

export const LIST_CARD_THEME_CONFIG: Record<
  ListCardTheme,
  ListCardThemeConfig
> = {
  blue: {
    border: "hover:border-[#d9a55b]/40",
    gradientBg: "from-[#d9a55b] via-[#f3ebdd] to-[#e6b56c]",
    titleHover: "group-hover:text-[#d9a55b]",
    subtitleColor: "text-[#d9a55b]/80",
    techExtraBg: "bg-[#d9a55b]/10",
    techExtraText: "text-[#d9a55b]",
    techExtraBorder: "border-[#d9a55b]/25",
    viewColor: "text-[#d9a55b]",
    ...ACTIVE_BADGE_STYLES,
  },
  pink: {
    border: "hover:border-[#d9a55b]/40",
    gradientBg: "from-[#d9a55b] via-[#f3ebdd] to-[#e6b56c]",
    titleHover: "group-hover:text-[#d9a55b]",
    subtitleColor: "text-[#d9a55b]/80",
    techExtraBg: "bg-[#d9a55b]/10",
    techExtraText: "text-[#d9a55b]",
    techExtraBorder: "border-[#d9a55b]/25",
    viewColor: "text-[#d9a55b]",
    ...ACTIVE_BADGE_STYLES,
  },
  purple: {
    border: "hover:border-[#d9a55b]/40",
    gradientBg: "from-[#d9a55b] via-[#f3ebdd] to-[#e6b56c]",
    titleHover: "group-hover:text-[#d9a55b]",
    subtitleColor: "text-[#d9a55b]/80",
    techExtraBg: "bg-[#d9a55b]/10",
    techExtraText: "text-[#d9a55b]",
    techExtraBorder: "border-[#d9a55b]/25",
    viewColor: "text-[#d9a55b]",
    ...ACTIVE_BADGE_STYLES,
  },
  violet: {
    border: "hover:border-[#d9a55b]/40",
    gradientBg: "from-[#d9a55b] via-[#f3ebdd] to-[#e6b56c]",
    titleHover: "group-hover:text-[#d9a55b]",
    subtitleColor: "text-[#d9a55b]/80",
    techExtraBg: "bg-[#d9a55b]/10",
    techExtraText: "text-[#d9a55b]",
    techExtraBorder: "border-[#d9a55b]/25",
    viewColor: "text-[#d9a55b]",
    ...ACTIVE_BADGE_STYLES,
  },
};

export interface PageHeaderThemeConfig {
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  focusBorder: string;
  focusRing: string;
  hoverBorder: string;
  hoverText: string;
}

export const PAGE_HEADER_THEME_CONFIG: Record<
  PageHeaderTheme,
  PageHeaderThemeConfig
> = {
  blue: {
    accentColor: "text-[#d9a55b]",
    accentBg: "bg-[#d9a55b]/10",
    accentBorder: "border-[#d9a55b]/40",
    focusBorder: "focus:border-[#d9a55b]/50",
    focusRing: "focus:ring-[#d9a55b]/20",
    hoverBorder: "hover:border-[#d9a55b]/30",
    hoverText: "hover:text-[#e6b56c]",
  },
  pink: {
    accentColor: "text-[#d9a55b]",
    accentBg: "bg-[#d9a55b]/10",
    accentBorder: "border-[#d9a55b]/40",
    focusBorder: "focus:border-[#d9a55b]/50",
    focusRing: "focus:ring-[#d9a55b]/20",
    hoverBorder: "hover:border-[#d9a55b]/30",
    hoverText: "hover:text-[#e6b56c]",
  },
  purple: {
    accentColor: "text-[#d9a55b]",
    accentBg: "bg-[#d9a55b]/10",
    accentBorder: "border-[#d9a55b]/40",
    focusBorder: "focus:border-[#d9a55b]/50",
    focusRing: "focus:ring-[#d9a55b]/20",
    hoverBorder: "hover:border-[#d9a55b]/30",
    hoverText: "hover:text-[#e6b56c]",
  },
  violet: {
    accentColor: "text-[#d9a55b]",
    accentBg: "bg-[#d9a55b]/10",
    accentBorder: "border-[#d9a55b]/40",
    focusBorder: "focus:border-[#d9a55b]/50",
    focusRing: "focus:ring-[#d9a55b]/20",
    hoverBorder: "hover:border-[#d9a55b]/30",
    hoverText: "hover:text-[#e6b56c]",
  },
};

// Empty state theme configuration
export const EMPTY_STATE_THEME_CONFIG: Record<ListCardTheme, string> = {
  blue: "bg-[#d9a55b]/10 text-[#d9a55b] border-[#d9a55b]/30 hover:bg-[#d9a55b]/20",
  pink: "bg-[#d9a55b]/10 text-[#d9a55b] border-[#d9a55b]/30 hover:bg-[#d9a55b]/20",
  purple:
    "bg-[#d9a55b]/10 text-[#d9a55b] border-[#d9a55b]/30 hover:bg-[#d9a55b]/20",
  violet:
    "bg-[#d9a55b]/10 text-[#d9a55b] border-[#d9a55b]/30 hover:bg-[#d9a55b]/20",
};

export const EMPTY_STATE_DEFAULT_ICONS: Record<ListCardTheme, string> = {
  blue: "💼",
  pink: "❤️",
  purple: "🏆",
  violet: "✨",
};

// Error state theme configuration
export type ErrorStateTheme = "red" | "orange" | "yellow";

export interface ErrorStateThemeConfig {
  bg: string;
  ring: string;
  icon: string;
  button: string;
  shadow: string;
  border: string;
  text: string;
}

export const ERROR_STATE_THEME_CONFIG: Record<
  ErrorStateTheme,
  ErrorStateThemeConfig
> = {
  red: {
    bg: "from-red-500/20 to-orange-500/20",
    ring: "ring-red-500/30",
    icon: "text-red-400",
    button:
      "from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600",
    shadow: "shadow-orange-500/30",
    border: "border-red-900/30",
    text: "text-red-400",
  },
  orange: {
    bg: "from-orange-500/20 to-yellow-500/20",
    ring: "ring-orange-500/30",
    icon: "text-orange-400",
    button:
      "from-orange-500 via-yellow-500 to-amber-500 hover:from-orange-600 hover:via-yellow-600 hover:to-amber-600",
    shadow: "shadow-orange-500/30",
    border: "border-orange-900/30",
    text: "text-orange-400",
  },
  yellow: {
    bg: "from-yellow-500/20 to-amber-500/20",
    ring: "ring-yellow-500/30",
    icon: "text-yellow-400",
    button:
      "from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600",
    shadow: "shadow-yellow-500/30",
    border: "border-yellow-900/30",
    text: "text-yellow-400",
  },
};

export interface PaginationThemeConfig {
  hoverBorder: string;
  hoverText: string;
  activeText: string;
}

export const PAGINATION_THEME_CONFIG: Record<
  PaginationTheme,
  PaginationThemeConfig
> = {
  blue: {
    hoverBorder: "hover:border-[#d9a55b]/30",
    hoverText: "hover:text-[#d9a55b]",
    activeText: "text-[#d9a55b]",
  },
  emerald: {
    hoverBorder: "hover:border-[#d9a55b]/30",
    hoverText: "hover:text-[#d9a55b]",
    activeText: "text-[#d9a55b]",
  },
  pink: {
    hoverBorder: "hover:border-[#d9a55b]/30",
    hoverText: "hover:text-[#d9a55b]",
    activeText: "text-[#d9a55b]",
  },
  purple: {
    hoverBorder: "hover:border-[#d9a55b]/30",
    hoverText: "hover:text-[#d9a55b]",
    activeText: "text-[#d9a55b]",
  },
  violet: {
    hoverBorder: "hover:border-[#d9a55b]/30",
    hoverText: "hover:text-[#d9a55b]",
    activeText: "text-[#d9a55b]",
  },
};

export interface DetailTreeThemeConfig {
  text: string;
  textHover: string;
  border: string;
  bg: string;
  bgHover: string;
  bullet: string;
  line: string;
}

export const DETAIL_TREE_THEME_CONFIG: Record<
  DetailTreeTheme,
  DetailTreeThemeConfig
> = {
  blue: {
    text: "text-[#d9a55b]",
    textHover: "hover:text-[#e6b56c]",
    border: "border-[#2f2923]",
    bg: "bg-[#161311]",
    bgHover: "hover:bg-[#1e1a16]",
    bullet: "bg-[#d9a55b]",
    line: "border-[#2f2923]",
  },
  purple: {
    text: "text-[#d9a55b]",
    textHover: "hover:text-[#e6b56c]",
    border: "border-[#2f2923]",
    bg: "bg-[#161311]",
    bgHover: "hover:bg-[#1e1a16]",
    bullet: "bg-[#d9a55b]",
    line: "border-[#2f2923]",
  },
  pink: {
    text: "text-[#d9a55b]",
    textHover: "hover:text-[#e6b56c]",
    border: "border-[#2f2923]",
    bg: "bg-[#161311]",
    bgHover: "hover:bg-[#1e1a16]",
    bullet: "bg-[#d9a55b]",
    line: "border-[#2f2923]",
  },
  violet: {
    text: "text-[#d9a55b]",
    textHover: "hover:text-[#e6b56c]",
    border: "border-[#2f2923]",
    bg: "bg-[#161311]",
    bgHover: "hover:bg-[#1e1a16]",
    bullet: "bg-[#d9a55b]",
    line: "border-[#2f2923]",
  },
};

// Detail tree view theme configuration (for detail pages)
export interface DetailTreeViewThemeConfig {
  accent: string;
  border: string;
  bg: string;
  hover: string;
  gradient: string;
  glow: string;
  linkBg: string;
  linkBorder: string;
  linkHover: string;
  headerBg: string;
  headerBorder: string;
}

export const DETAIL_TREE_VIEW_THEME_CONFIG: Record<
  DetailTreeTheme,
  DetailTreeViewThemeConfig
> = {
  blue: {
    accent: "text-[#d9a55b]",
    border: "border-[#2f2923]",
    bg: "bg-[#161311]",
    hover: "hover:border-[#d9a55b]/50",
    gradient: "from-[#d9a55b] via-[#f3ebdd] to-[#e6b56c]",
    glow: "from-[#d9a55b]/10 to-[#d9a55b]/5",
    linkBg: "bg-linear-to-r from-[#1e1a16] to-[#161311]",
    linkBorder: "border-[#2f2923]",
    linkHover: "hover:border-[#d9a55b]/40",
    headerBg: "bg-[#161311]/80",
    headerBorder: "border-[#2f2923]",
  },
  purple: {
    accent: "text-[#d9a55b]",
    border: "border-[#2f2923]",
    bg: "bg-[#161311]",
    hover: "hover:border-[#d9a55b]/50",
    gradient: "from-[#d9a55b] via-[#f3ebdd] to-[#e6b56c]",
    glow: "from-[#d9a55b]/10 to-[#d9a55b]/5",
    linkBg: "bg-linear-to-r from-[#1e1a16] to-[#161311]",
    linkBorder: "border-[#2f2923]",
    linkHover: "hover:border-[#d9a55b]/40",
    headerBg: "bg-[#161311]/80",
    headerBorder: "border-[#2f2923]",
  },
  pink: {
    accent: "text-[#d9a55b]",
    border: "border-[#2f2923]",
    bg: "bg-[#161311]",
    hover: "hover:border-[#d9a55b]/50",
    gradient: "from-[#d9a55b] via-[#f3ebdd] to-[#e6b56c]",
    glow: "from-[#d9a55b]/10 to-[#d9a55b]/5",
    linkBg: "bg-linear-to-r from-[#1e1a16] to-[#161311]",
    linkBorder: "border-[#2f2923]",
    linkHover: "hover:border-[#d9a55b]/40",
    headerBg: "bg-[#161311]/80",
    headerBorder: "border-[#2f2923]",
  },
  violet: {
    accent: "text-[#d9a55b]",
    border: "border-[#2f2923]",
    bg: "bg-[#161311]",
    hover: "hover:border-[#d9a55b]/50",
    gradient: "from-[#d9a55b] via-[#f3ebdd] to-[#e6b56c]",
    glow: "from-[#d9a55b]/10 to-[#d9a55b]/5",
    linkBg: "bg-linear-to-r from-[#1e1a16] to-[#161311]",
    linkBorder: "border-[#2f2923]",
    linkHover: "hover:border-[#d9a55b]/40",
    headerBg: "bg-[#161311]/80",
    headerBorder: "border-[#2f2923]",
  },
};

// Loading state theme configuration
export type LoadingStateTheme = "blue" | "purple" | "pink" | "emerald";

export interface LoadingStateThemeConfig {
  gradient: string;
  text: string;
}

export const LOADING_STATE_THEME_CONFIG: Record<
  LoadingStateTheme,
  LoadingStateThemeConfig
> = {
  blue: {
    gradient: "from-[#d9a55b] via-[#f3ebdd] to-[#e6b56c]",
    text: "text-[#d9a55b]/70",
  },
  purple: {
    gradient: "from-[#d9a55b] via-[#f3ebdd] to-[#e6b56c]",
    text: "text-[#d9a55b]/70",
  },
  pink: {
    gradient: "from-[#d9a55b] via-[#f3ebdd] to-[#e6b56c]",
    text: "text-[#d9a55b]/70",
  },
  emerald: {
    gradient: "from-[#d9a55b] via-[#f3ebdd] to-[#e6b56c]",
    text: "text-[#d9a55b]/70",
  },
};

// Section header theme configuration
export const SECTION_HEADER_GRADIENTS: Record<SectionTheme, string> = {
  pink: "from-[#f3ebdd] via-[#d9a55b] to-[#b9ae9d]",
  blue: "from-[#f3ebdd] via-[#d9a55b] to-[#b9ae9d]",
  emerald: "from-[#f3ebdd] via-[#d9a55b] to-[#b9ae9d]",
  purple: "from-[#f3ebdd] via-[#d9a55b] to-[#b9ae9d]",
  violet: "from-[#f3ebdd] via-[#d9a55b] to-[#b9ae9d]",
};

// Section wrapper theme configuration
export interface SectionWrapperThemeConfig {
  primary: string;
  secondary: string;
}

export const SECTION_WRAPPER_THEME_CONFIG: Record<
  SectionTheme,
  SectionWrapperThemeConfig
> = {
  blue: { primary: "bg-[#d9a55b]/[0.02]", secondary: "bg-[#d9a55b]/[0.03]" },
  emerald: { primary: "bg-[#d9a55b]/[0.02]", secondary: "bg-[#d9a55b]/[0.03]" },
  pink: { primary: "bg-[#d9a55b]/[0.02]", secondary: "bg-[#d9a55b]/[0.03]" },
  purple: { primary: "bg-[#d9a55b]/[0.02]", secondary: "bg-[#d9a55b]/[0.03]" },
  violet: { primary: "bg-[#d9a55b]/[0.02]", secondary: "bg-[#d9a55b]/[0.03]" },
};

// Unified card theme configuration
export type UnifiedCardTheme =
  | "blue"
  | "pink"
  | "emerald"
  | "purple"
  | "violet";

export interface UnifiedCardThemeConfig {
  border: string;
  shadow: string;
  gradient: string;
  titleHover: string;
  certificateBg: string;
  certificateText: string;
  certificateBorder: string;
  techExtraBg: string;
  techExtraText: string;
  techExtraBorder: string;
}

export const UNIFIED_CARD_THEME_CONFIG: Record<
  UnifiedCardTheme,
  UnifiedCardThemeConfig
> = {
  blue: {
    border: "hover:border-[#d9a55b]/40",
    shadow: "hover:shadow-[0_4px_24px_rgba(217,165,91,0.08)]",
    gradient: "from-[#d9a55b]/5 via-transparent to-[#e6b56c]/5",
    titleHover: "group-hover:text-[#d9a55b]",
    certificateBg: "bg-[#d9a55b]/10 hover:bg-[#d9a55b]/20",
    certificateText: "text-[#d9a55b] hover:text-[#e6b56c]",
    certificateBorder: "border-[#d9a55b]/30",
    techExtraBg: "bg-[#d9a55b]/10",
    techExtraText: "text-[#d9a55b]",
    techExtraBorder: "border-[#d9a55b]/25",
  },
  pink: {
    border: "hover:border-[#d9a55b]/40",
    shadow: "hover:shadow-[0_4px_24px_rgba(217,165,91,0.08)]",
    gradient: "from-[#d9a55b]/5 via-transparent to-[#e6b56c]/5",
    titleHover: "group-hover:text-[#d9a55b]",
    certificateBg: "bg-[#d9a55b]/10 hover:bg-[#d9a55b]/20",
    certificateText: "text-[#d9a55b] hover:text-[#e6b56c]",
    certificateBorder: "border-[#d9a55b]/30",
    techExtraBg: "bg-[#d9a55b]/10",
    techExtraText: "text-[#d9a55b]",
    techExtraBorder: "border-[#d9a55b]/25",
  },
  emerald: {
    border: "hover:border-[#d9a55b]/40",
    shadow: "hover:shadow-[0_4px_24px_rgba(217,165,91,0.08)]",
    gradient: "from-[#d9a55b]/5 via-transparent to-[#e6b56c]/5",
    titleHover: "group-hover:text-[#d9a55b]",
    certificateBg: "bg-[#d9a55b]/10 hover:bg-[#d9a55b]/20",
    certificateText: "text-[#d9a55b] hover:text-[#e6b56c]",
    certificateBorder: "border-[#d9a55b]/30",
    techExtraBg: "bg-[#d9a55b]/10",
    techExtraText: "text-[#d9a55b]",
    techExtraBorder: "border-[#d9a55b]/25",
  },
  purple: {
    border: "hover:border-[#d9a55b]/40",
    shadow: "hover:shadow-[0_4px_24px_rgba(217,165,91,0.08)]",
    gradient: "from-[#d9a55b]/5 via-transparent to-[#e6b56c]/5",
    titleHover: "group-hover:text-[#d9a55b]",
    certificateBg: "bg-[#d9a55b]/10 hover:bg-[#d9a55b]/20",
    certificateText: "text-[#d9a55b] hover:text-[#e6b56c]",
    certificateBorder: "border-[#d9a55b]/30",
    techExtraBg: "bg-[#d9a55b]/10",
    techExtraText: "text-[#d9a55b]",
    techExtraBorder: "border-[#d9a55b]/25",
  },
  violet: {
    border: "hover:border-[#d9a55b]/40",
    shadow: "hover:shadow-[0_4px_24px_rgba(217,165,91,0.08)]",
    gradient: "from-[#d9a55b]/5 via-transparent to-[#e6b56c]/5",
    titleHover: "group-hover:text-[#d9a55b]",
    certificateBg: "bg-[#d9a55b]/10 hover:bg-[#d9a55b]/20",
    certificateText: "text-[#d9a55b] hover:text-[#e6b56c]",
    certificateBorder: "border-[#d9a55b]/30",
    techExtraBg: "bg-[#d9a55b]/10",
    techExtraText: "text-[#d9a55b]",
    techExtraBorder: "border-[#d9a55b]/25",
  },
};

// Search button theme configuration
export type SearchButtonTheme = "blue" | "purple" | "pink" | "violet";

export const SEARCH_BUTTON_THEME_CONFIG: Record<SearchButtonTheme, string> = {
  blue: "hover:border-[#d9a55b]/50 hover:text-[#d9a55b]",
  purple: "hover:border-[#d9a55b]/50 hover:text-[#d9a55b]",
  pink: "hover:border-[#d9a55b]/50 hover:text-[#d9a55b]",
  violet: "hover:border-[#d9a55b]/50 hover:text-[#d9a55b]",
};

export const VARIANT_COLORS = {
  blue: { gradient: "from-[#f3ebdd] to-[#d9a55b]", text: "text-[#d9a55b]" },
  purple: { gradient: "from-[#f3ebdd] to-[#d9a55b]", text: "text-[#d9a55b]" },
  pink: { gradient: "from-[#f3ebdd] to-[#d9a55b]", text: "text-[#d9a55b]" },
  emerald: {
    gradient: "from-[#f3ebdd] to-[#d9a55b]",
    text: "text-[#d9a55b]",
  },
  violet: {
    gradient: "from-[#f3ebdd] to-[#d9a55b]",
    text: "text-[#d9a55b]",
  },
};
