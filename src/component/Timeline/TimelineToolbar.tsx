"use client";

export type TimelineFilter = "all" | "work" | "volunteer";

interface TimelineToolbarProps {
  filter: TimelineFilter;
  setFilter: (filter: TimelineFilter) => void;
  counts: {
    all: number;
    work: number;
    volunteer: number;
  };
  horizonRange?: string;
}

export const TimelineToolbar = ({
  filter,
  setFilter,
  counts,
  horizonRange = "2024 — Present",
}: TimelineToolbarProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
      {/* Category Segment Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#161311] border border-[#2f2923]">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
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
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
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
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
            filter === "volunteer"
              ? "bg-[#4caf7d] text-[#0e0c0a] font-bold"
              : "text-[#8e8374] hover:text-[#f3ebdd] hover:bg-[#1e1a16]"
          }`}
        >
          Open Source ({counts.volunteer})
        </button>
      </div>

      {/* Horizon Telemetry Status Badge */}
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#161311] border border-[#2f2923] text-xs font-mono text-[#8e8374] self-start sm:self-auto select-none">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d9a55b] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d9a55b]" />
        </span>
        <span className="text-[#f3ebdd] font-medium">Roadmap Horizon</span>
        <span className="text-[#413930]">|</span>
        <span className="text-[#d9a55b]">{horizonRange}</span>
      </div>
    </div>
  );
};
