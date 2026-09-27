import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import Link from "next/link";
import type { PaginationTheme } from "@/constants/theme";

export type { PaginationTheme } from "@/constants/theme";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  isLoading?: boolean;
  theme?: PaginationTheme;
  viewAllHref?: string;
  showViewAll?: boolean;
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  isLoading = false,
  theme: _theme = "violet",
  viewAllHref,
  showViewAll = true,
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap shrink-0">
      <button
        type="button"
        onClick={onPrevPage}
        disabled={currentPage === 1 || isLoading}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161311] border border-[#2f2923] hover:border-[#413930] hover:bg-[#1e1a16] text-[#b9ae9d] hover:text-[#f3ebdd] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4 text-[#d9a55b]" />
        <span className="text-xs font-medium">Previous</span>
      </button>

      <span className="text-[#8e8374] text-xs font-medium px-2">
        Page <span className="text-[#d9a55b] font-bold">{currentPage}</span> of{" "}
        <span className="text-[#d9a55b] font-bold">{totalPages}</span>
      </span>

      {showViewAll && viewAllHref && (
        <Link
          href={viewAllHref}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161311] border border-[#2f2923] hover:border-[#413930] hover:bg-[#1e1a16] text-[#b9ae9d] hover:text-[#f3ebdd] transition-all duration-200"
        >
          <Eye className="w-4 h-4 text-[#d9a55b]" />
          <span className="text-xs font-medium">View All</span>
        </Link>
      )}

      <button
        type="button"
        onClick={onNextPage}
        disabled={currentPage === totalPages || isLoading}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161311] border border-[#2f2923] hover:border-[#413930] hover:bg-[#1e1a16] text-[#b9ae9d] hover:text-[#f3ebdd] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        aria-label="Next page"
      >
        <span className="text-xs font-medium">Next</span>
        <ChevronRight className="w-4 h-4 text-[#d9a55b]" />
      </button>
    </div>
  );
}
