"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "./EmptyState";
import { TimelineHorizon } from "./TimelineHorizon";
import { type TimelineFilter, TimelineToolbar } from "./TimelineToolbar";
import type { TimelineDisplayProps } from "./types";
import { useIsMobile } from "./useIsMobile";
import { processTimelineData } from "./utils";

export const TimelineDisplay = ({
  experiences,
  volunteerExperiences: volunteerExpProps,
}: TimelineDisplayProps) => {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState<TimelineFilter>("all");

  const processedData = useMemo(
    () => processTimelineData(experiences, volunteerExpProps),
    [experiences, volunteerExpProps],
  );

  const filteredExperiences = useMemo(() => {
    if (filter === "work") {
      return processedData.allExperiences.filter((e) => e.type === "work");
    }
    if (filter === "volunteer") {
      return processedData.allExperiences.filter((e) => e.type === "volunteer");
    }
    return processedData.allExperiences;
  }, [filter, processedData.allExperiences]);

  const counts = useMemo(
    () => ({
      all: processedData.allExperiences.length,
      work: processedData.allExperiences.filter((e) => e.type === "work")
        .length,
      volunteer: processedData.allExperiences.filter(
        (e) => e.type === "volunteer",
      ).length,
    }),
    [processedData.allExperiences],
  );

  const earliestYear =
    processedData.months.length > 0 ? processedData.months[0].year : 2024;
  const currentYear = new Date().getFullYear();
  const horizonRange = `${earliestYear} — ${currentYear}`;

  if (processedData.allExperiences.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 bg-transparent">
      <div className="container mx-auto max-w-7xl w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2f2923] bg-[#161311] text-[11px] font-mono font-bold tracking-[0.14em] text-[#d9a55b] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d9a55b] animate-pulse" />
            <span>{"Trajectory Registry // Career Chronology"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal font-serif text-[#f3ebdd] tracking-tight">
            Experience &amp;{" "}
            <em className="italic text-[#d9a55b]">Engineering</em> Timeline.
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#8e8374] max-w-2xl mx-auto leading-relaxed">
            A comprehensive chronological roadmap of professional software
            engineering, systems architecture, and open source leadership over
            time.
          </p>
        </div>

        {/* Interactive Toolbar: Filter Pills */}
        <TimelineToolbar
          filter={filter}
          setFilter={setFilter}
          counts={counts}
          horizonRange={horizonRange}
        />

        {/* Timeline Content Area: Roadmap Horizon */}
        {filteredExperiences.length === 0 ? (
          <div className="rounded-2xl border border-[#2f2923] bg-[#161311] p-12 text-center my-6">
            <p className="text-sm text-[#8e8374] font-mono">
              No milestones found for the selected filter.
            </p>
            <button
              type="button"
              onClick={() => setFilter("all")}
              className="mt-4 px-4 py-2 rounded-lg bg-[#d9a55b] text-[#0e0c0a] font-semibold text-xs transition-colors hover:bg-[#e6b56c] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="pt-2 pb-8">
            <TimelineHorizon
              experiences={filteredExperiences}
              timelineData={processedData}
              isMobile={isMobile}
            />
          </div>
        )}

        {/* Telemetry Status Strip / Legend */}
        <div className="mt-8 pt-6 border-t border-[#2f2923]/60 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#8e8374]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d9a55b]" />
              <span>Work Roles</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4caf7d]" />
              <span>Open Source / Community</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d9a55b] animate-pulse" />
              <span className="text-[#f3ebdd]">Active / Present Roles</span>
            </div>
          </div>

          <div className="text-[#8e8374]">
            <span>Active Trajectory: {horizonRange}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
