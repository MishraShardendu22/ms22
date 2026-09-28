"use client";

import { Calendar, Layers } from "lucide-react";

export type TimelineFilter = "all" | "work" | "volunteer";
export type TimelineViewMode = "stream" | "horizon";

interface TimelineToolbarProps {
  filter: TimelineFilter;
  setFilter: (filter: TimelineFilter) => void;
  viewMode: TimelineViewMode;
  setViewMode: (mode: TimelineViewMode) => void;
  counts: {
    all: number;
    work: number;
    volunteer: number;
  };
}

export const TimelineToolbar = ({
  filter,
  setFilter,
  viewMode,
  setViewMode,
  counts,
}: TimelineToolbarProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
      {/* Category Segment Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#161311] border border-[#2f2923]">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
            filter === "all"
              ? "bg-[#d9a55b] text-[#0e0c0a] font-bold"
              : "text-[#8e8374] hover:text-[#f3ebdd] hover:bg-[#1e1a16]"
          }`}
        >
          All Milestones ({counts.all})
        </button>

        <button
          type="button"
          onClick={() => setFilter("work")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
            filter === "work"
              ? "bg-[#d9a55b] text-[#0e0c0a] font-bold"
              : "text-[#8e8374] hover:text-[#f3ebdd] hover:bg-[#1e1a16]"
          }`}
        >
          Work Roles ({counts.work})
        </button>

        <button
          type="button"
          onClick={() => setFilter("volunteer")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
            filter === "volunteer"
              ? "bg-[#4caf7d] text-[#0e0c0a] font-bold"
              : "text-[#8e8374] hover:text-[#f3ebdd] hover:bg-[#1e1a16]"
          }`}
        >
          Open Source ({counts.volunteer})
        </button>
      </div>

      {/* View Mode Switcher Toggle */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-[#161311] border border-[#2f2923] self-start sm:self-auto">
        <button
          type="button"
          onClick={() => setViewMode("stream")}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
            viewMode === "stream"
              ? "bg-[#1e1a16] text-[#d9a55b] border border-[#2f2923]"
              : "text-[#8e8374] hover:text-[#f3ebdd]"
          }`}
          title="Chronological Milestone Stream"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Stream View</span>
        </button>

        <button
          type="button"
          onClick={() => setViewMode("horizon")}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
            viewMode === "horizon"
              ? "bg-[#1e1a16] text-[#d9a55b] border border-[#2f2923]"
              : "text-[#8e8374] hover:text-[#f3ebdd]"
          }`}
          title="Horizontal Trajectory Roadmap"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Roadmap Horizon</span>
        </button>
      </div>
    </div>
  );
};
