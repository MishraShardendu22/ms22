import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import Link from "next/link";
import type { PaginationTheme } from "@/constants/theme";

export type { PaginationTheme } from "@/constants/theme";

interface PaginationLinksProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  baseHref?: string;
  theme?: PaginationTheme;
  viewAllHref?: string;
  showViewAll?: boolean;
  pageParam?: string;
}

export function PaginationLinks({
  currentPage,
  totalPages,
  hasNext,
  hasPrevious,
  baseHref = "",
  theme: _theme = "violet",
  viewAllHref,
  showViewAll = true,
  pageParam = "page",
}: PaginationLinksProps) {
  if (totalPages <= 1) return null;

  // Split baseHref into path and hash (e.g., "/#experience" -> "/" + "#experience")
  const [basePath, hash] = baseHref.includes("#")
    ? baseHref.split("#")
    : [baseHref, ""];

  const prevHref = hash
    ? `${basePath}?${pageParam}=${currentPage - 1}#${hash}`
    : `${basePath}?${pageParam}=${currentPage - 1}`;
  const nextHref = hash
    ? `${basePath}?${pageParam}=${currentPage + 1}#${hash}`
    : `${basePath}?${pageParam}=${currentPage + 1}`;

  return (
    <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap shrink-0">
      {hasPrevious ? (
        <Link
          href={prevHref}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161311] border border-[#2f2923] hover:border-[#413930] hover:bg-[#1e1a16] text-[#b9ae9d] hover:text-[#f3ebdd] transition-all duration-200"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4 text-[#d9a55b]" />
          <span className="text-xs font-medium">Previous</span>
        </Link>
      ) : (
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161311]/40 border border-[#2f2923] text-[#8e8374] opacity-40 cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-xs font-medium">Previous</span>
        </span>
      )}

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

      {hasNext ? (
        <Link
          href={nextHref}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161311] border border-[#2f2923] hover:border-[#413930] hover:bg-[#1e1a16] text-[#b9ae9d] hover:text-[#f3ebdd] transition-all duration-200"
          aria-label="Next page"
        >
          <span className="text-xs font-medium">Next</span>
          <ChevronRight className="w-4 h-4 text-[#d9a55b]" />
        </Link>
      ) : (
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161311]/40 border border-[#2f2923] text-[#8e8374] opacity-40 cursor-not-allowed">
          <span className="text-xs font-medium">Next</span>
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </div>
  );
}
