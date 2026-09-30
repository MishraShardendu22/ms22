import type { ReactNode } from "react";
import { LoadingStateLight } from "@/component/Loading";
import { GRID_COLS } from "@/static/ui";

interface ContentGridProps {
  minHeight?: string;
  children: ReactNode;
  isLoading?: boolean;
  columns?: 1 | 2 | 3 | 4;
  loadingMessage?: string;
  loadingVariant?: "violet" | "purple" | "emerald" | "pink" | "blue";
}

export function ContentGrid({
  children,
  isLoading = false,
  loadingMessage = "Loading...",
  loadingVariant = "violet",
  columns = 2,
  minHeight = "300px",
}: ContentGridProps) {
  return (
    <div className="mb-6 relative" style={{ minHeight }}>
      <div
        className={`flex items-center justify-center absolute inset-0 transition-opacity duration-300 ${
          isLoading ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
        }`}
        style={{ minHeight }}
      >
        <LoadingStateLight
          message={loadingMessage}
          variant={loadingVariant}
          className="min-h-0"
        />
      </div>
      <div
        className={`grid ${GRID_COLS[columns]} gap-4 md:gap-6 transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
