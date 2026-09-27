import Link from "next/link";
import type { ReactNode } from "react";
import { HeaderSearchButton, SearchModalContent } from "@/component/Search";
import type { PageHeaderTheme } from "@/constants/theme";
import { THEME_TO_SEARCH_FILTER } from "@/static/search";

export type { PageHeaderTheme } from "@/constants/theme";

interface ServerPageHeaderProps {
  title: string;
  theme: PageHeaderTheme;
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string>;
  resultCount: number;
  resultLabel: string;
  children?: ReactNode;
}

function buildUrl(
  basePath: string,
  params: Record<string, string>,
  updates: Record<string, string | undefined>,
): string {
  const newParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value) newParams.set(key, value);
  }

  for (const [key, value] of Object.entries(updates)) {
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
  }

  const queryString = newParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

export function ServerPageHeader({
  title,
  theme,
  currentPage,
  totalPages,
  basePath,
  searchParams = {},
  resultCount,
  resultLabel,
  children,
}: ServerPageHeaderProps) {
  const prevPageUrl = buildUrl(basePath, searchParams, {
    page: String(currentPage - 1),
  });
  const nextPageUrl = buildUrl(basePath, searchParams, {
    page: String(currentPage + 1),
  });

  const searchFilterType = THEME_TO_SEARCH_FILTER[theme];

  return (
    <div className="mb-6 space-y-4">
      {/* Header Row */}
      <div className="flex flex-col gap-4">
        {/* Title, Search, and Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#f3ebdd]">{title}</h1>
            <p className="text-sm text-[#8e8374] mt-1">
              <span className="text-[#d9a55b] font-semibold">
                {resultCount}
              </span>{" "}
              {resultLabel}
              {totalPages > 1 && (
                <span className="ml-2 text-[#8e8374]">
                  • Page {currentPage} of {totalPages}
                </span>
              )}
            </p>
          </div>

          {/* Search and Pagination */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search Button */}
            <HeaderSearchButton
              filterType={searchFilterType}
              label={`Search ${title}`}
              theme={theme}
            />

            {/* Pagination */}
            <div className="flex items-center gap-2">
              {currentPage > 1 ? (
                <Link
                  href={prevPageUrl}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161311] border border-[#2f2923] hover:border-[#413930] hover:bg-[#1e1a16] text-[#b9ae9d] hover:text-[#f3ebdd] transition-all duration-200"
                >
                  <span className="text-xs font-medium">← Prev</span>
                </Link>
              ) : (
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161311]/40 border border-[#2f2923] text-[#8e8374] cursor-not-allowed opacity-40">
                  <span className="text-xs font-medium">← Prev</span>
                </span>
              )}

              <span className="text-[#8e8374] text-xs font-medium px-2">
                <span className="text-[#d9a55b] font-bold">{currentPage}</span>
                {" / "}
                <span className="text-[#d9a55b] font-bold">{totalPages}</span>
              </span>

              {currentPage < totalPages ? (
                <Link
                  href={nextPageUrl}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161311] border border-[#2f2923] hover:border-[#413930] hover:bg-[#1e1a16] text-[#b9ae9d] hover:text-[#f3ebdd] transition-all duration-200"
                >
                  <span className="text-xs font-medium">Next →</span>
                </Link>
              ) : (
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161311]/40 border border-[#2f2923] text-[#8e8374] cursor-not-allowed opacity-40">
                  <span className="text-xs font-medium">Next →</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModalContent />

      {children}
    </div>
  );
}
