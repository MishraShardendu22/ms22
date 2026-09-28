"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { ProcessedExperience, ProcessedTimelineData } from "./types";
import { formatDateSpan, getCompanyColor } from "./utils";

interface TimelineHorizonProps {
  experiences: ProcessedExperience[];
  timelineData: ProcessedTimelineData;
  isMobile: boolean;
}

export const TimelineHorizon = ({
  experiences,
  timelineData,
  isMobile,
}: TimelineHorizonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const now = new Date();

  // Sort chronologically (oldest to newest for horizontal roadmap flow)
  const sortedExperiences = [...experiences].sort(
    (a, b) => a.startMonth.getTime() - b.startMonth.getTime(),
  );

  const workRoles = sortedExperiences.filter((e) => e.type === "work");
  const volunteerRoles = sortedExperiences.filter(
    (e) => e.type === "volunteer",
  );

  const monthWidth = isMobile ? 90 : 130;
  const totalMonths = timelineData.months.length;
  const boardWidth = Math.max(totalMonths * monthWidth, 900);

  const getMonthIndex = (date: Date) => {
    return timelineData.months.findIndex(
      (m) => m.year === date.getFullYear() && m.month === date.getMonth(),
    );
  };

  const getCapsuleLayout = (exp: ProcessedExperience) => {
    const startIndex = getMonthIndex(exp.startMonth);
    const effectiveEnd = exp.end_date ? exp.endMonth : now;
    const endIndex = getMonthIndex(effectiveEnd);

    const safeStart = startIndex >= 0 ? startIndex : 0;
    const safeEnd = endIndex >= 0 ? endIndex : totalMonths - 1;

    const left = safeStart * monthWidth + 12;
    const durationMonths = Math.max(1, safeEnd - safeStart + 1);
    const width = Math.max(durationMonths * monthWidth - 24, monthWidth * 1.5);

    return { left, width };
  };

  // Auto-scroll to Current Month on mount
  useEffect(() => {
    if (!containerRef.current || totalMonths === 0) return;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentIndex = timelineData.months.findIndex(
      (m) => m.year === currentYear && m.month === currentMonth,
    );
    if (currentIndex !== -1 && containerRef.current) {
      const scrollPos = Math.max(
        0,
        currentIndex * monthWidth - containerRef.current.clientWidth / 2,
      );
      containerRef.current.scrollLeft = scrollPos;
    }
  }, [totalMonths, monthWidth, timelineData.months]);

  return (
    <div className="relative rounded-2xl border border-[#2f2923] bg-[#161311] overflow-hidden shadow-2xl">
      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-visible p-6 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-[#161311] [&::-webkit-scrollbar-thumb]:bg-[#2f2923] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-[#d9a55b]/50"
      >
        <div style={{ width: `${boardWidth}px` }} className="relative">
          {/* Timeline Months/Quarters Header Track */}
          <div className="relative h-14 border-b border-[#2f2923] mb-8 flex items-center">
            {timelineData.months.map((m, idx) => {
              const isCurrent =
                m.year === now.getFullYear() && m.month === now.getMonth();
              return (
                <div
                  key={`${m.year}-${m.month}`}
                  style={{
                    left: `${idx * monthWidth}px`,
                    width: `${monthWidth}px`,
                  }}
                  className="absolute flex flex-col items-center"
                >
                  <div
                    className={`text-[11px] font-mono font-medium transition-colors ${
                      isCurrent
                        ? "text-[#d9a55b] font-bold"
                        : m.isYearStart
                          ? "text-[#f3ebdd] font-semibold"
                          : "text-[#8e8374]"
                    }`}
                  >
                    {m.monthName} {m.isYearStart && m.year}
                  </div>

                  {/* Tick marker */}
                  <div
                    className={`mt-2 w-1.5 h-1.5 rounded-full ${
                      isCurrent
                        ? "bg-[#d9a55b] ring-4 ring-[#d9a55b]/20"
                        : "bg-[#2f2923]"
                    }`}
                  />

                  {isCurrent && (
                    <span className="absolute -top-5 px-1.5 py-0.5 rounded bg-[#d9a55b] text-[#0e0c0a] text-[9px] font-mono font-bold uppercase tracking-wider">
                      Now
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Work Roles Lane */}
          {workRoles.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#d9a55b]" />
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#d9a55b] font-bold">
                  Work Experience
                </h4>
              </div>

              <div className="relative h-32 bg-[#100d0b] rounded-xl border border-[#2f2923]/60 p-2">
                {workRoles.map((exp) => {
                  const { left, width } = getCapsuleLayout(exp);
                  const { spanText, isCurrent, durationText } = formatDateSpan(
                    exp.start_date,
                    exp.end_date,
                  );
                  const companyColor = getCompanyColor(exp.name, exp.type);

                  return (
                    <div
                      key={`${exp.name}-${exp.position}`}
                      style={{
                        left: `${left}px`,
                        width: `${width}px`,
                      }}
                      className="absolute top-3 bottom-3 rounded-xl border border-[#2f2923] bg-[#161311] p-3 flex flex-col justify-between hover:border-[#d9a55b]/60 transition-colors shadow-lg overflow-hidden group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-[#1e1a16] border border-[#2f2923] flex items-center justify-center p-1">
                          {exp.logo ? (
                            <Image
                              src={exp.logo}
                              alt={exp.name}
                              width={24}
                              height={24}
                              className="object-contain"
                              sizes="24px"
                            />
                          ) : (
                            <span
                              className="text-[10px] font-bold"
                              style={{ color: companyColor }}
                            >
                              {exp.name.slice(0, 2)}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-[#f3ebdd] truncate">
                            {exp.position}
                          </p>
                          <p className="text-[11px] font-mono text-[#d9a55b] truncate">
                            {exp.name}
                          </p>
                        </div>

                        {isCurrent && (
                          <span className="shrink-0 w-2 h-2 rounded-full bg-[#d9a55b] animate-pulse" />
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-[#8e8374] mt-1 pt-1 border-t border-[#2f2923]/40">
                        <span>{spanText}</span>
                        {durationText && <span>{durationText}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Volunteer Roles Lane */}
          {volunteerRoles.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#4caf7d]" />
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#4caf7d] font-bold">
                  Open Source &amp; Community
                </h4>
              </div>

              <div className="relative h-32 bg-[#100d0b] rounded-xl border border-[#2f2923]/60 p-2">
                {volunteerRoles.map((exp) => {
                  const { left, width } = getCapsuleLayout(exp);
                  const { spanText, isCurrent, durationText } = formatDateSpan(
                    exp.start_date,
                    exp.end_date,
                  );
                  const companyColor = getCompanyColor(exp.name, exp.type);

                  return (
                    <div
                      key={`${exp.name}-${exp.position}`}
                      style={{
                        left: `${left}px`,
                        width: `${width}px`,
                      }}
                      className="absolute top-3 bottom-3 rounded-xl border border-[#2f2923] bg-[#161311] p-3 flex flex-col justify-between hover:border-[#4caf7d]/60 transition-colors shadow-lg overflow-hidden group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-[#1e1a16] border border-[#2f2923] flex items-center justify-center p-1">
                          {exp.logo ? (
                            <Image
                              src={exp.logo}
                              alt={exp.name}
                              width={24}
                              height={24}
                              className="object-contain"
                              sizes="24px"
                            />
                          ) : (
                            <span
                              className="text-[10px] font-bold"
                              style={{ color: companyColor }}
                            >
                              {exp.name.slice(0, 2)}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-[#f3ebdd] truncate">
                            {exp.position}
                          </p>
                          <p className="text-[11px] font-mono text-[#4caf7d] truncate">
                            {exp.name}
                          </p>
                        </div>

                        {isCurrent && (
                          <span className="shrink-0 w-2 h-2 rounded-full bg-[#4caf7d] animate-pulse" />
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-[#8e8374] mt-1 pt-1 border-t border-[#2f2923]/40">
                        <span>{spanText}</span>
                        {durationText && <span>{durationText}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trajectory Navigation Footer Tip */}
      <div className="px-6 py-3 border-t border-[#2f2923] bg-[#100d0b] flex items-center justify-between text-xs font-mono text-[#8e8374]">
        <span>← Scroll horizontally to explore timeline →</span>
        <span className="text-[#d9a55b]">Active Horizon: 2025 — Present</span>
      </div>
    </div>
  );
};
