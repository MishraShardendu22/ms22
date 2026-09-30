"use client";

import { ArrowUp } from "lucide-react";

interface ScrollToTopProps {
  variant?: "mobile" | "desktop";
}

export function ScrollToTop({ variant = "desktop" }: ScrollToTopProps) {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: variant === "mobile" ? "instant" : "smooth",
    });
  };

  if (variant === "mobile") {
    return (
      <button
        type="button"
        onClick={handleScrollToTop}
        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-[#161311] border border-[#2f2923] text-xs text-[#d9a55b] hover:border-[#d9a55b]/40 transition-colors"
      >
        <ArrowUp className="w-3 h-3 text-[#d9a55b]" />
        <span>Top</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      className="group flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-[#161311] hover:bg-[#1e1a16] border border-[#2f2923] hover:border-[#d9a55b]/40 text-[#d9a55b] hover:text-[#e6b56c] transition-colors duration-300 cursor-pointer"
    >
      <span className="text-base font-semibold">Back to Top</span>
      <ArrowUp className="w-4 h-4 text-[#d9a55b] group-hover:text-[#e6b56c] transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
