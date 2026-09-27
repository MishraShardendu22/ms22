"use client";

import { ArrowLeft } from "lucide-react";

export function BackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-[#161311] hover:bg-[#1e1a16] border border-[#2f2923] hover:border-[#d9a55b]/40 text-[#f3ebdd] hover:text-[#d9a55b] font-semibold text-lg transition-all hover:scale-105"
    >
      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      <span>Go Back</span>
    </button>
  );
}
