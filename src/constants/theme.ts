/**
 * Centralized theme configuration
 * Used across components for consistent color theming
 */

// Common theme types for different components
export type ListCardTheme = "blue" | "pink" | "purple" | "violet";
export type PageHeaderTheme = "blue" | "pink" | "purple" | "violet";
export type PaginationTheme = "blue" | "emerald" | "pink" | "purple" | "violet";
export type SectionTheme = "blue" | "emerald" | "pink" | "purple" | "violet";

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

// Section header theme configuration
export const SECTION_HEADER_GRADIENTS: Record<SectionTheme, string> = {
  pink: "from-[#f3ebdd] via-[#d9a55b] to-[#b9ae9d]",
  blue: "from-[#f3ebdd] via-[#d9a55b] to-[#b9ae9d]",
  emerald: "from-[#f3ebdd] via-[#d9a55b] to-[#b9ae9d]",
  purple: "from-[#f3ebdd] via-[#d9a55b] to-[#b9ae9d]",
  violet: "from-[#f3ebdd] via-[#d9a55b] to-[#b9ae9d]",
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
