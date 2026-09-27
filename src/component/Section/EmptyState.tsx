import Link from "next/link";
import {
  EMPTY_STATE_DEFAULT_ICONS,
  type ListCardTheme,
} from "@/constants/theme";

type ThemeType = ListCardTheme;

export interface EmptyStateProps {
  title: string;
  description: string;
  hasFilters?: boolean;
  onClearFilters?: () => void;
  clearFiltersHref?: string;
  theme: ThemeType;
  icon?: string;
}

const defaultIcons = EMPTY_STATE_DEFAULT_ICONS;

export function EmptyState({
  title,
  description,
  hasFilters = false,
  onClearFilters,
  clearFiltersHref,
  theme,
  icon,
}: EmptyStateProps) {
  const displayIcon = icon ?? defaultIcons[theme];

  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#161311] border border-[#2f2923] mb-4 shadow-sm">
        <span className="text-2xl">{displayIcon}</span>
      </div>
      <h3 className="text-lg font-bold text-[#f3ebdd] mb-2">{title}</h3>
      <p className="text-[#8e8374] text-sm mb-4">{description}</p>
      {hasFilters && clearFiltersHref && (
        <Link
          href={clearFiltersHref}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#d9a55b] hover:bg-[#e6b56c] text-[#0e0c0a] font-semibold rounded-xl text-sm transition-all shadow-md"
        >
          Clear filters
        </Link>
      )}
      {hasFilters && onClearFilters && !clearFiltersHref && (
        <button
          type="button"
          onClick={onClearFilters}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#d9a55b] hover:bg-[#e6b56c] text-[#0e0c0a] font-semibold rounded-xl text-sm transition-all shadow-md cursor-pointer"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
