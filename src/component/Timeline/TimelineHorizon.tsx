"use client";

import { AlignJustify, Calendar, Clock, Layers, Tag, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ProcessedExperience, ProcessedTimelineData } from "./types";
import { formatDateSpan, getCompanyColor } from "./utils";

interface TimelineHorizonProps {
  experiences: ProcessedExperience[];
  timelineData: ProcessedTimelineData;
  isMobile: boolean;
}

interface LayoutTrackItem {
  exp: ProcessedExperience;
  left: number;
  width: number;
  trackIndex: number;
  spanText: string;
  isCurrent: boolean;
  durationText: string;
  companyColor: string;
}

/**
 * Greedy interval track assignment (coloring)
 * Guarantees that items that overlap in time are placed into separate logical tracks.
 * Track 0 is assigned to the one that started earliest.
 */
function computeTrackLayout(
  roles: ProcessedExperience[],
  getCapsuleLayout: (exp: ProcessedExperience) => {
    left: number;
    width: number;
  },
): { items: LayoutTrackItem[]; trackCount: number } {
  // Sort chronologically: earliest start date first.
  // If start dates are identical, longer duration comes first on Track 0.
  const sorted = [...roles].sort((a, b) => {
    const startDiff = a.startMonth.getTime() - b.startMonth.getTime();
    if (startDiff !== 0) return startDiff;
    return b.endMonth.getTime() - a.endMonth.getTime();
  });

  const tracksEnd: number[] = [];
  const items: LayoutTrackItem[] = [];
  const MIN_HORIZONTAL_GAP = 12;

  for (const exp of sorted) {
    const { left, width } = getCapsuleLayout(exp);
    const right = left + width;

    // Find the first track where this item fits without overlapping
    let assignedTrack = -1;
    for (let t = 0; t < tracksEnd.length; t++) {
      if (left >= tracksEnd[t] + MIN_HORIZONTAL_GAP) {
        assignedTrack = t;
        tracksEnd[t] = right;
        break;
      }
    }

    // If no existing track fits, allocate a new track
    if (assignedTrack === -1) {
      assignedTrack = tracksEnd.length;
      tracksEnd.push(right);
    }

    const { spanText, isCurrent, durationText } = formatDateSpan(
      exp.start_date,
      exp.end_date,
    );
    const companyColor = getCompanyColor(exp.name, exp.type);

    items.push({
      exp,
      left,
      width,
      trackIndex: assignedTrack,
      spanText,
      isCurrent,
      durationText,
      companyColor,
    });
  }

  return {
    items,
    trackCount: Math.max(1, tracksEnd.length),
  };
}

export const TimelineHorizon = ({
  experiences,
  timelineData,
  isMobile,
}: TimelineHorizonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const now = useMemo(() => new Date(), []);
  const [selectedExp, setSelectedExp] = useState<ProcessedExperience | null>(
    null,
  );
  const [layoutMode, setLayoutMode] = useState<"overlap" | "expanded">(
    "overlap",
  );
  const [hoveredExpKey, setHoveredExpKey] = useState<string | null>(null);

  const workRoles = useMemo(
    () => experiences.filter((e) => e.type === "work"),
    [experiences],
  );
  const volunteerRoles = useMemo(
    () => experiences.filter((e) => e.type === "volunteer"),
    [experiences],
  );

  const monthWidth = isMobile ? 95 : 130;
  const totalMonths = timelineData.months.length;
  const boardWidth = Math.max(totalMonths * monthWidth, 960);

  const getMonthIndex = useCallback(
    (date: Date) => {
      return timelineData.months.findIndex(
        (m) => m.year === date.getFullYear() && m.month === date.getMonth(),
      );
    },
    [timelineData.months],
  );

  const getCapsuleLayout = useCallback(
    (exp: ProcessedExperience) => {
      const startIndex = getMonthIndex(exp.startMonth);
      const effectiveEnd = exp.end_date ? exp.endMonth : now;
      const endIndex = getMonthIndex(effectiveEnd);

      const safeStart = startIndex >= 0 ? startIndex : 0;
      const safeEnd = endIndex >= 0 ? endIndex : totalMonths - 1;

      const left = safeStart * monthWidth + 12;
      const durationMonths = Math.max(1, safeEnd - safeStart + 1);
      const minCardWidth = isMobile ? 180 : 220;
      const calculatedWidth = durationMonths * monthWidth - 24;
      const width = Math.max(calculatedWidth, minCardWidth);

      return { left, width };
    },
    [getMonthIndex, now, totalMonths, monthWidth, isMobile],
  );

  // Compute track layouts for work and volunteer lanes
  const workLayout = useMemo(
    () => computeTrackLayout(workRoles, getCapsuleLayout),
    [workRoles, getCapsuleLayout],
  );

  const volunteerLayout = useMemo(
    () => computeTrackLayout(volunteerRoles, getCapsuleLayout),
    [volunteerRoles, getCapsuleLayout],
  );

  const isOverlap = layoutMode === "overlap";
  const cardHeight = isMobile ? 66 : 72;
  const overlapOffset = isMobile ? 30 : 34;
  const trackGap = 8;
  const paddingY = 12;

  // Calculate dynamic container heights:
  // In overlapping mode: only small vertical step (overlapOffset) per overlapping item.
  // In expanded mode: full separate row heights with gap.
  const computeLaneHeight = (trackCount: number) => {
    if (trackCount <= 1) return paddingY * 2 + cardHeight;
    if (isOverlap) {
      return paddingY * 2 + (trackCount - 1) * overlapOffset + cardHeight;
    }
    return paddingY * 2 + trackCount * cardHeight + (trackCount - 1) * trackGap;
  };

  const workLaneHeight = computeLaneHeight(workLayout.trackCount);
  const volunteerLaneHeight = computeLaneHeight(volunteerLayout.trackCount);

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

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedExp(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const earliestYear =
    timelineData.months.length > 0 ? timelineData.months[0].year : 2024;
  const currentYear = now.getFullYear();

  return (
    <div className="relative rounded-2xl border border-[#2f2923] bg-[#161311] overflow-hidden shadow-2xl">
      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-visible p-4 sm:p-6 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-[#161311] [&::-webkit-scrollbar-thumb]:bg-[#2f2923] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-[#d9a55b]/50"
      >
        <div style={{ width: `${boardWidth}px` }} className="relative">
          {/* Timeline Months Track Header */}
          <div className="relative h-14 border-b border-[#2f2923] mb-6 flex items-center select-none">
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
                        : m.isYearStart
                          ? "bg-[#8e8374]"
                          : "bg-[#2f2923]"
                    }`}
                  />

                  {isCurrent && (
                    <span className="absolute -top-5 px-1.5 py-0.5 rounded bg-[#d9a55b] text-[#0e0c0a] text-[9px] font-mono font-bold uppercase tracking-wider shadow-sm">
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
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#d9a55b]" />
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#d9a55b] font-bold">
                    Work Experience
                  </h4>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#8e8374]">
                  <span>{workRoles.length} roles</span>
                  {workLayout.trackCount > 1 && (
                    <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#14110f] border border-[#2f2923]">
                      <button
                        type="button"
                        onClick={() => setLayoutMode("overlap")}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                          isOverlap
                            ? "bg-[#1e1a16] text-[#d9a55b] font-bold border border-[#2f2923]"
                            : "text-[#8e8374] hover:text-[#f3ebdd]"
                        }`}
                        title="Compact overlapping view"
                      >
                        <Layers className="w-3 h-3" />
                        <span>Stacked</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setLayoutMode("expanded")}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                          !isOverlap
                            ? "bg-[#1e1a16] text-[#d9a55b] font-bold border border-[#2f2923]"
                            : "text-[#8e8374] hover:text-[#f3ebdd]"
                        }`}
                        title="Expanded parallel rows"
                      >
                        <AlignJustify className="w-3 h-3" />
                        <span>Expanded</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Lane Container with Dynamic Height */}
              <div
                style={{ height: `${workLaneHeight}px` }}
                className="relative bg-[#100d0b] rounded-xl border border-[#2f2923]/60 p-2 overflow-hidden transition-all duration-300"
              >
                {/* Vertical Month Grid Guidelines */}
                {timelineData.months.map((m, idx) => (
                  <div
                    key={`work-grid-${m.year}-${m.month}`}
                    style={{ left: `${idx * monthWidth}px` }}
                    className={`absolute top-0 bottom-0 pointer-events-none transition-opacity ${
                      m.isYearStart
                        ? "border-l border-[#2f2923]/40"
                        : "border-l border-[#2f2923]/15"
                    }`}
                  />
                ))}

                {/* Work Role Capsules */}
                {workLayout.items.map((item) => {
                  const top = isOverlap
                    ? paddingY + item.trackIndex * overlapOffset
                    : paddingY + item.trackIndex * (cardHeight + trackGap);
                  const itemKey = `work-${item.exp.name}-${item.exp.position}-${item.exp.start_date}`;
                  const isHovered = hoveredExpKey === itemKey;
                  const zIndex = isHovered
                    ? 50
                    : isOverlap
                      ? 10 + item.trackIndex
                      : 10;

                  return (
                    <button
                      key={itemKey}
                      type="button"
                      onClick={() => setSelectedExp(item.exp)}
                      onMouseEnter={() => setHoveredExpKey(itemKey)}
                      onMouseLeave={() => setHoveredExpKey(null)}
                      onFocus={() => setHoveredExpKey(itemKey)}
                      onBlur={() => setHoveredExpKey(null)}
                      style={{
                        left: `${item.left}px`,
                        width: `${item.width}px`,
                        top: `${top}px`,
                        height: `${cardHeight}px`,
                        zIndex,
                        transform: isHovered ? "translateY(-4px)" : "none",
                      }}
                      className={`absolute text-left rounded-xl border bg-[#161311] px-3 py-2 flex flex-col justify-between transition-all duration-200 shadow-md overflow-hidden group cursor-pointer select-none focus:outline-none ${
                        isHovered
                          ? "border-[#d9a55b] shadow-[0_16px_36px_rgba(0,0,0,0.95),0_0_24px_rgba(217,165,91,0.28)] ring-1 ring-[#d9a55b]/40"
                          : hoveredExpKey !== null
                            ? "border-[#2f2923] opacity-70"
                            : "border-[#2f2923] hover:border-[#d9a55b]"
                      }`}
                      title={`${item.exp.position} at ${item.exp.name} (${item.spanText})`}
                    >
                      {/* Top Row: Logo, Role, Company, Duration, Status (visible in overlapping strip) */}
                      <div className="flex items-center gap-2.5 min-w-0 h-[26px]">
                        <div className="shrink-0 w-6 h-6 rounded-md bg-[#1e1a16] border border-[#2f2923] flex items-center justify-center p-0.5 overflow-hidden">
                          {item.exp.logo ? (
                            <Image
                              src={item.exp.logo}
                              alt={item.exp.name}
                              width={20}
                              height={20}
                              className="object-contain"
                              sizes="20px"
                            />
                          ) : (
                            <span
                              className="text-[9px] font-bold"
                              style={{ color: item.companyColor }}
                            >
                              {item.exp.name.slice(0, 2)}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1 leading-none">
                          <p className="text-xs font-semibold text-[#f3ebdd] truncate group-hover:text-[#f3ebdd] transition-colors">
                            {item.exp.position}
                          </p>
                          <p className="text-[10px] font-mono text-[#d9a55b] truncate mt-0.5">
                            {item.exp.name}
                          </p>
                        </div>

                        <div className="shrink-0 flex items-center gap-1.5">
                          {item.durationText && (
                            <span className="px-1.5 py-0.5 rounded bg-[#1e1a16] border border-[#2f2923]/60 text-[9px] font-mono text-[#b9ae9d] hidden sm:inline-block">
                              {item.durationText}
                            </span>
                          )}
                          {item.isCurrent && (
                            <span
                              className="w-2 h-2 rounded-full bg-[#d9a55b] animate-pulse"
                              title="Active Role"
                            />
                          )}
                        </div>
                      </div>

                      {/* Bottom Row: Date Range & Duration */}
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#8e8374] pt-1.5 border-t border-[#2f2923]/40 mt-auto">
                        <span className="truncate">{item.spanText}</span>
                        <span className="shrink-0 ml-2 text-[9px] text-[#b9ae9d] flex items-center gap-1">
                          <span>{item.durationText}</span>
                          <span className="opacity-0 group-hover:opacity-100 text-[#d9a55b] transition-opacity">
                            ↗
                          </span>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Volunteer Roles Lane */}
          {volunteerRoles.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4caf7d]" />
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#4caf7d] font-bold">
                    Open Source &amp; Community
                  </h4>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#8e8374]">
                  <span>{volunteerRoles.length} roles</span>
                  {volunteerLayout.trackCount > 1 && (
                    <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#14110f] border border-[#2f2923]">
                      <button
                        type="button"
                        onClick={() => setLayoutMode("overlap")}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                          isOverlap
                            ? "bg-[#1e1a16] text-[#4caf7d] font-bold border border-[#2f2923]"
                            : "text-[#8e8374] hover:text-[#f3ebdd]"
                        }`}
                        title="Compact overlapping view"
                      >
                        <Layers className="w-3 h-3" />
                        <span>Stacked</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setLayoutMode("expanded")}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                          !isOverlap
                            ? "bg-[#1e1a16] text-[#4caf7d] font-bold border border-[#2f2923]"
                            : "text-[#8e8374] hover:text-[#f3ebdd]"
                        }`}
                        title="Expanded parallel rows"
                      >
                        <AlignJustify className="w-3 h-3" />
                        <span>Expanded</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Lane Container with Dynamic Height */}
              <div
                style={{ height: `${volunteerLaneHeight}px` }}
                className="relative bg-[#100d0b] rounded-xl border border-[#2f2923]/60 p-2 overflow-hidden transition-all duration-300"
              >
                {/* Vertical Month Grid Guidelines */}
                {timelineData.months.map((m, idx) => (
                  <div
                    key={`volunteer-grid-${m.year}-${m.month}`}
                    style={{ left: `${idx * monthWidth}px` }}
                    className={`absolute top-0 bottom-0 pointer-events-none transition-opacity ${
                      m.isYearStart
                        ? "border-l border-[#2f2923]/40"
                        : "border-l border-[#2f2923]/15"
                    }`}
                  />
                ))}

                {/* Volunteer Role Capsules */}
                {volunteerLayout.items.map((item) => {
                  const top = isOverlap
                    ? paddingY + item.trackIndex * overlapOffset
                    : paddingY + item.trackIndex * (cardHeight + trackGap);
                  const itemKey = `volunteer-${item.exp.name}-${item.exp.position}-${item.exp.start_date}`;
                  const isHovered = hoveredExpKey === itemKey;
                  const zIndex = isHovered
                    ? 50
                    : isOverlap
                      ? 10 + item.trackIndex
                      : 10;

                  return (
                    <button
                      key={itemKey}
                      type="button"
                      onClick={() => setSelectedExp(item.exp)}
                      onMouseEnter={() => setHoveredExpKey(itemKey)}
                      onMouseLeave={() => setHoveredExpKey(null)}
                      onFocus={() => setHoveredExpKey(itemKey)}
                      onBlur={() => setHoveredExpKey(null)}
                      style={{
                        left: `${item.left}px`,
                        width: `${item.width}px`,
                        top: `${top}px`,
                        height: `${cardHeight}px`,
                        zIndex,
                        transform: isHovered ? "translateY(-4px)" : "none",
                      }}
                      className={`absolute text-left rounded-xl border bg-[#161311] px-3 py-2 flex flex-col justify-between transition-all duration-200 shadow-md overflow-hidden group cursor-pointer select-none focus:outline-none ${
                        isHovered
                          ? "border-[#4caf7d] shadow-[0_16px_36px_rgba(0,0,0,0.95),0_0_24px_rgba(76,175,125,0.28)] ring-1 ring-[#4caf7d]/40"
                          : hoveredExpKey !== null
                            ? "border-[#2f2923] opacity-70"
                            : "border-[#2f2923] hover:border-[#4caf7d]"
                      }`}
                      title={`${item.exp.position} at ${item.exp.name} (${item.spanText})`}
                    >
                      {/* Top Row: Logo, Role, Organization, Duration, Status (visible in overlapping strip) */}
                      <div className="flex items-center gap-2.5 min-w-0 h-[26px]">
                        <div className="shrink-0 w-6 h-6 rounded-md bg-[#1e1a16] border border-[#2f2923] flex items-center justify-center p-0.5 overflow-hidden">
                          {item.exp.logo ? (
                            <Image
                              src={item.exp.logo}
                              alt={item.exp.name}
                              width={20}
                              height={20}
                              className="object-contain"
                              sizes="20px"
                            />
                          ) : (
                            <span
                              className="text-[9px] font-bold"
                              style={{ color: item.companyColor }}
                            >
                              {item.exp.name.slice(0, 2)}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1 leading-none">
                          <p className="text-xs font-semibold text-[#f3ebdd] truncate group-hover:text-[#f3ebdd] transition-colors">
                            {item.exp.position}
                          </p>
                          <p className="text-[10px] font-mono text-[#4caf7d] truncate mt-0.5">
                            {item.exp.name}
                          </p>
                        </div>

                        <div className="shrink-0 flex items-center gap-1.5">
                          {item.durationText && (
                            <span className="px-1.5 py-0.5 rounded bg-[#1e1a16] border border-[#2f2923]/60 text-[9px] font-mono text-[#b9ae9d] hidden sm:inline-block">
                              {item.durationText}
                            </span>
                          )}
                          {item.isCurrent && (
                            <span
                              className="w-2 h-2 rounded-full bg-[#4caf7d] animate-pulse"
                              title="Active Role"
                            />
                          )}
                        </div>
                      </div>

                      {/* Bottom Row: Date Range & Duration */}
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#8e8374] pt-1.5 border-t border-[#2f2923]/40 mt-auto">
                        <span className="truncate">{item.spanText}</span>
                        <span className="shrink-0 ml-2 text-[9px] text-[#b9ae9d] flex items-center gap-1">
                          <span>{item.durationText}</span>
                          <span className="opacity-0 group-hover:opacity-100 text-[#4caf7d] transition-opacity">
                            ↗
                          </span>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trajectory Navigation Footer Tip */}
      <div className="px-6 py-3 border-t border-[#2f2923] bg-[#100d0b] flex items-center justify-between text-xs font-mono text-[#8e8374] select-none">
        <span>← Scroll horizontally to explore timeline →</span>
        <span className="text-[#d9a55b]">
          Active Horizon: {earliestYear} — {currentYear}
        </span>
      </div>

      {/* Interactive Milestone Detail Inspection Modal */}
      {selectedExp && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedExp(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setSelectedExp(null);
          }}
        >
          <div
            role="document"
            tabIndex={-1}
            className="w-full max-w-lg rounded-2xl border border-[#2f2923] bg-[#161311] p-6 shadow-2xl relative space-y-5 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[#1e1a16] border border-[#2f2923] flex items-center justify-center p-1.5 overflow-hidden">
                  {selectedExp.logo ? (
                    <Image
                      src={selectedExp.logo}
                      alt={selectedExp.name}
                      width={36}
                      height={36}
                      className="object-contain"
                      sizes="36px"
                    />
                  ) : (
                    <span className="text-sm font-bold text-[#d9a55b]">
                      {selectedExp.name.slice(0, 2)}
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-[#f3ebdd] font-heading truncate">
                    {selectedExp.position}
                  </h3>
                  <p
                    className="text-xs font-mono truncate"
                    style={{
                      color:
                        selectedExp.type === "work" ? "#d9a55b" : "#4caf7d",
                    }}
                  >
                    {selectedExp.name}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedExp(null)}
                className="p-1.5 rounded-lg bg-[#1e1a16] hover:bg-[#25201b] border border-[#2f2923] text-[#8e8374] hover:text-[#f3ebdd] transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Meta Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${
                  selectedExp.type === "work"
                    ? "bg-[#d9a55b]/10 text-[#d9a55b] border-[#d9a55b]/30"
                    : "bg-[#4caf7d]/10 text-[#4caf7d] border-[#4caf7d]/30"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                <span>
                  {selectedExp.type === "work"
                    ? "Work Experience"
                    : "Open Source & Community"}
                </span>
              </span>

              {formatDateSpan(selectedExp.start_date, selectedExp.end_date)
                .isCurrent && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Role
                </span>
              )}
            </div>

            {/* Tenure & Timeline Info */}
            <div className="p-3.5 rounded-xl bg-[#120f0d] border border-[#2f2923] space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between text-[#8e8374]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#d9a55b]" />
                  Tenure Period
                </span>
                <span className="text-[#f3ebdd]">
                  {
                    formatDateSpan(selectedExp.start_date, selectedExp.end_date)
                      .spanText
                  }
                </span>
              </div>
              <div className="flex items-center justify-between text-[#8e8374]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#d9a55b]" />
                  Duration
                </span>
                <span className="text-[#d9a55b]">
                  {formatDateSpan(selectedExp.start_date, selectedExp.end_date)
                    .durationText || "Present"}
                </span>
              </div>
            </div>

            {/* Description (if provided) */}
            {selectedExp.description && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8e8374]">
                  Overview
                </span>
                <p className="text-xs text-[#b9ae9d] leading-relaxed whitespace-pre-wrap bg-[#120f0d] p-3 rounded-xl border border-[#2f2923]/60 max-h-48 overflow-y-auto font-sans">
                  {selectedExp.description}
                </p>
              </div>
            )}

            {/* Technologies */}
            {selectedExp.technologies &&
              selectedExp.technologies.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8e8374]">
                    Technologies &amp; Tools
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedExp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-[#1e1a16] text-[#b9ae9d] border border-[#2f2923]"
                      >
                        <Tag className="w-2.5 h-2.5 text-[#d9a55b]/70" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {/* Close Action */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedExp(null)}
                className="px-4 py-2 rounded-lg bg-[#1e1a16] hover:bg-[#25201b] border border-[#2f2923] text-xs font-mono text-[#f3ebdd] transition-colors cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
