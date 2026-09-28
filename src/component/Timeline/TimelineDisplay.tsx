"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "./EmptyState";
import { TimelineHorizon } from "./TimelineHorizon";
import { TimelineMilestoneCard } from "./TimelineMilestoneCard";
import {
  type TimelineFilter,
  TimelineToolbar,
  type TimelineViewMode,
} from "./TimelineToolbar";
import type { TimelineDisplayProps } from "./types";
import { useIsMobile } from "./useIsMobile";
import { processTimelineData } from "./utils";

export const TimelineDisplay = ({
  experiences,
  volunteerExperiences: volunteerExpProps,
}: TimelineDisplayProps) => {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState<TimelineFilter>("all");
  const [viewMode, setViewMode] = useState<TimelineViewMode>("stream");

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

  if (processedData.allExperiences.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-[#161311]/40 to-transparent overflow-hidden">
      {/* Ambient Starlight Glow & Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none will-change-auto">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d9a55b]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#e6b56c]/3 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-lines" />
      </div>

      <div className="container mx-auto max-w-400 relative z-10">
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
            A comprehensive chronological registry of professional software
            engineering, systems architecture, and open source leadership over
            time.
          </p>
        </div>

        {/* Interactive Toolbar: Filter Pills + View Switcher */}
        <TimelineToolbar
          filter={filter}
          setFilter={setFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
          counts={counts}
        />

        {/* Timeline Content Area */}
        {filteredExperiences.length === 0 ? (
          <div className="rounded-2xl border border-[#2f2923] bg-[#161311] p-12 text-center my-6">
            <p className="text-sm text-[#8e8374] font-mono">
              No milestones found for the selected filter.
            </p>
            <button
              type="button"
              onClick={() => setFilter("all")}
              className="mt-4 px-4 py-2 rounded-lg bg-[#d9a55b] text-[#0e0c0a] font-semibold text-xs transition-colors hover:bg-[#e6b56c]"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "stream" ? (
          /* Stream View: Connected Milestone Cards with Vertical Spine */
          <div className="max-w-4xl mx-auto pt-4 pb-8">
            {filteredExperiences.map((exp, index) => {
              const prevExp = index > 0 ? filteredExperiences[index - 1] : null;
              const currentYear = exp.startMonth.getFullYear();
              const prevYear = prevExp
                ? prevExp.startMonth.getFullYear()
                : null;
              const isNewYear = prevYear !== currentYear;
              const isLast = index === filteredExperiences.length - 1;

              return (
                <div key={`${exp.name}-${exp.position}-${exp.start_date}`}>
                  {/* Year Breakpoint Marker */}
                  {isNewYear && (
                    <div className="flex items-center gap-4 mb-6 mt-4 first:mt-0">
                      <div className="px-3 py-1 rounded-full bg-[#1e1a16] border border-[#2f2923] text-xs font-mono font-bold text-[#d9a55b] tracking-wider">
                        {currentYear}
                      </div>
                      <div className="h-px flex-1 bg-linear-to-r from-[#2f2923] to-transparent" />
                    </div>
                  )}

                  <TimelineMilestoneCard exp={exp} isLast={isLast} />
                </div>
              );
            })}
          </div>
        ) : (
          /* Roadmap Horizon: Dense Horizontal View */
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
            <span>Active Trajectory: 2025 — Present</span>
          </div>
        </div>
      </div>
    </section>
  );
};
