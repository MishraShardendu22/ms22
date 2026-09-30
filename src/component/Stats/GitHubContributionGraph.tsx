"use client";

import { Award, Calendar, ExternalLink, Flame, GitCommit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FALLBACK_GITHUB_CALENDAR,
  GITHUB_ORGANIZATIONS,
  type GitHubCalendarDay,
  type GitHubCalendarResponse,
} from "@/static/githubData";

interface GitHubContributionGraphProps {
  calendar?: GitHubCalendarResponse | null;
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAY_LABELS = [
  { id: "sun", label: "" },
  { id: "mon", label: "Mon" },
  { id: "tue", label: "" },
  { id: "wed", label: "Wed" },
  { id: "thu", label: "" },
  { id: "fri", label: "Fri" },
  { id: "sat", label: "" },
];

// Authentic GitHub Green Color Palette
const LEVEL_CLASSES: Record<number, string> = {
  0: "bg-[#181512] border border-[#2f2923]/60 hover:border-[#8e8374]/60",
  1: "bg-[#0e4429] border border-[#006d32]/40 hover:border-[#26a641]",
  2: "bg-[#006d32] border border-[#26a641]/50 hover:border-[#39d353]",
  3: "bg-[#26a641] border border-[#39d353]/60 hover:brightness-125",
  4: "bg-[#39d353] border border-[#39d353] shadow-[0_0_8px_rgba(57,211,83,0.4)] hover:brightness-125",
};

interface HoveredCell {
  date: string;
  count: number;
  x: number;
  y: number;
}

interface GridCell {
  id: string;
  date: string;
  count: number;
  level: number;
  dayOfWeek: number;
  inCurrentYear: boolean;
}

interface GridWeek {
  id: string;
  days: GridCell[];
}

export function GitHubContributionGraph({
  calendar,
}: GitHubContributionGraphProps) {
  const activeCalendar = calendar?.contributions?.length
    ? calendar
    : FALLBACK_GITHUB_CALENDAR;

  const availableYears = useMemo(() => {
    const yearsSet = new Set<string>();
    for (const c of activeCalendar.contributions) {
      if (c.date) {
        yearsSet.add(c.date.slice(0, 4));
      }
    }
    // Return descending (2026, 2025, 2024)
    return Array.from(yearsSet).sort((a, b) => Number(b) - Number(a));
  }, [activeCalendar]);

  const [selectedYear, setSelectedYear] = useState<string>(
    availableYears[0] || "2026",
  );
  const [hoveredCell, setHoveredCell] = useState<HoveredCell | null>(null);

  // Filter contributions for selected year
  const yearContributions = useMemo(() => {
    const map = new Map<string, GitHubCalendarDay>();
    for (const c of activeCalendar.contributions) {
      if (c.date?.startsWith(selectedYear)) {
        map.set(c.date, c);
      }
    }
    return map;
  }, [activeCalendar, selectedYear]);

  // Compute total contributions for the year
  const totalYearContributions = useMemo(() => {
    if (activeCalendar.total?.[selectedYear] !== undefined) {
      return activeCalendar.total[selectedYear];
    }
    let sum = 0;
    yearContributions.forEach((val) => {
      sum += val.count;
    });
    return sum;
  }, [activeCalendar, selectedYear, yearContributions]);

  // Calculate streaks & stats
  const stats = useMemo(() => {
    const days = Array.from(yearContributions.values()).sort((a, b) =>
      a.date.localeCompare(b.date),
    );
    let maxStreak = 0;
    let currentStreak = 0;
    let maxCount = 0;
    let activeDays = 0;

    for (const d of days) {
      if (d.count > 0) {
        activeDays++;
        currentStreak++;
        if (currentStreak > maxStreak) maxStreak = currentStreak;
        if (d.count > maxCount) maxCount = d.count;
      } else {
        currentStreak = 0;
      }
    }

    return {
      maxStreak,
      activeDays,
      maxCount,
    };
  }, [yearContributions]);

  // Build grid weeks: 53 columns, 7 rows (Sunday to Saturday)
  const { weeks, monthHeaders } = useMemo(() => {
    const yearNum = Number.parseInt(selectedYear, 10);
    const startDate = new Date(Date.UTC(yearNum, 0, 1));
    const startDayOfWeek = startDate.getUTCDay(); // 0 = Sun, 1 = Mon ...
    const endDate = new Date(Date.UTC(yearNum, 11, 31));

    const cols: GridWeek[] = [];
    let currentWeekDays: GridCell[] = [];
    let weekIndex = 0;

    // Pad beginning of week 0 with days before Jan 1
    for (let i = 0; i < startDayOfWeek; i++) {
      const padDate = new Date(Date.UTC(yearNum, 0, 1 - (startDayOfWeek - i)));
      const dateStr = padDate.toISOString().slice(0, 10);
      currentWeekDays.push({
        id: `pad-start-${dateStr}`,
        date: dateStr,
        count: 0,
        level: 0,
        dayOfWeek: i,
        inCurrentYear: false,
      });
    }

    // Populate actual days of the year
    const curr = new Date(startDate);
    while (curr <= endDate) {
      const dateStr = curr.toISOString().slice(0, 10);
      const contrib = yearContributions.get(dateStr);
      const count = contrib?.count || 0;
      const level = contrib?.level ?? (count > 0 ? 1 : 0);

      currentWeekDays.push({
        id: `day-${dateStr}`,
        date: dateStr,
        count,
        level,
        dayOfWeek: curr.getUTCDay(),
        inCurrentYear: true,
      });

      if (currentWeekDays.length === 7) {
        cols.push({
          id: `week-${selectedYear}-${weekIndex}`,
          days: currentWeekDays,
        });
        weekIndex++;
        currentWeekDays = [];
      }

      curr.setUTCDate(curr.getUTCDate() + 1);
    }

    // Pad remaining of last week if incomplete
    if (currentWeekDays.length > 0) {
      while (currentWeekDays.length < 7) {
        currentWeekDays.push({
          id: `pad-end-${selectedYear}-${currentWeekDays.length}`,
          date: "",
          count: 0,
          level: 0,
          dayOfWeek: currentWeekDays.length,
          inCurrentYear: false,
        });
      }
      cols.push({
        id: `week-${selectedYear}-${weekIndex}`,
        days: currentWeekDays,
      });
    }

    // Compute month label start weeks
    const months: { label: string; weekIdx: number }[] = [];
    let lastMonth = -1;
    cols.forEach((week, wIdx) => {
      const firstValidDay = week.days.find((d) => d.inCurrentYear && d.date);
      if (firstValidDay) {
        const m = Number.parseInt(firstValidDay.date.slice(5, 7), 10) - 1;
        if (
          m !== lastMonth &&
          (wIdx === 0 ||
            wIdx - (months[months.length - 1]?.weekIdx ?? -10) >= 3)
        ) {
          months.push({ label: MONTH_NAMES[m], weekIdx: wIdx });
          lastMonth = m;
        }
      }
    });

    return { weeks: cols, monthHeaders: months };
  }, [selectedYear, yearContributions]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  };

  return (
    <div className="bg-[#161311] border border-[#2f2923] rounded-2xl p-5 sm:p-6 hover:border-[#d9a55b]/40 transition-all duration-300">
      {/* Top Header & Year Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 pb-5 border-b border-[#2f2923]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#d9a55b]/10 rounded-xl border border-[#d9a55b]/30">
            <GitCommit className="w-5 h-5 text-[#d9a55b]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#f3ebdd] font-heading">
              Contribution Activity
            </h3>
            <p className="text-xs text-[#8e8374] mt-0.5">
              <span className="text-[#f3ebdd] font-semibold text-sm">
                {totalYearContributions.toLocaleString()}
              </span>{" "}
              contributions in {selectedYear}
            </p>
          </div>
        </div>

        {/* Year Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#1e1a16] rounded-xl border border-[#2f2923] shrink-0">
          {availableYears.map((year) => {
            const isActive = year === selectedYear;
            return (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#d9a55b] text-[#0e0c0a] font-bold shadow-sm"
                    : "text-[#8e8374] hover:text-[#f3ebdd] hover:bg-[#25201b]"
                }`}
              >
                {year}
              </button>
            );
          })}
        </div>
      </div>

      {/* Telemetry Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="p-3 bg-[#1e1a16] rounded-xl border border-[#2f2923]">
          <div className="flex items-center gap-2 text-xs text-[#8e8374] mb-1">
            <Calendar className="w-3.5 h-3.5 text-[#d9a55b]" />
            <span>Total Year</span>
          </div>
          <p className="text-xl font-bold text-[#f3ebdd]">
            {totalYearContributions.toLocaleString()}
          </p>
        </div>

        <div className="p-3 bg-[#1e1a16] rounded-xl border border-[#2f2923]">
          <div className="flex items-center gap-2 text-xs text-[#8e8374] mb-1">
            <Flame className="w-3.5 h-3.5 text-[#e6b56c]" />
            <span>Longest Streak</span>
          </div>
          <p className="text-xl font-bold text-[#e6b56c]">
            {stats.maxStreak}{" "}
            <span className="text-xs font-normal text-[#8e8374]">days</span>
          </p>
        </div>

        <div className="p-3 bg-[#1e1a16] rounded-xl border border-[#2f2923]">
          <div className="flex items-center gap-2 text-xs text-[#8e8374] mb-1">
            <Award className="w-3.5 h-3.5 text-[#39d353]" />
            <span>Active Days</span>
          </div>
          <p className="text-xl font-bold text-[#39d353]">
            {stats.activeDays}{" "}
            <span className="text-xs font-normal text-[#8e8374]">days</span>
          </p>
        </div>

        <div className="p-3 bg-[#1e1a16] rounded-xl border border-[#2f2923]">
          <div className="flex items-center gap-2 text-xs text-[#8e8374] mb-1">
            <GitCommit className="w-3.5 h-3.5 text-[#d9a55b]" />
            <span>Max in a Day</span>
          </div>
          <p className="text-xl font-bold text-[#d9a55b]">
            {stats.maxCount}{" "}
            <span className="text-xs font-normal text-[#8e8374]">commits</span>
          </p>
        </div>
      </div>

      {/* Calendar Heatmap Container */}
      <div className="relative w-full overflow-x-auto pb-2 scrollbar-thin">
        <div className="w-full select-none" style={{ minWidth: "640px" }}>
          {/* Months Header */}
          <div className="flex text-[11px] text-[#8e8374] font-mono mb-2 pl-8">
            <div className="grid grid-flow-col auto-cols-[13px] gap-[3px] w-full relative h-4">
              {monthHeaders.map((m) => (
                <span
                  key={`${m.label}-${m.weekIdx}`}
                  className="absolute"
                  style={{ left: `${m.weekIdx * 16}px` }}
                >
                  {m.label}
                </span>
              ))}
            </div>
          </div>

          {/* Days Grid with Weekday Labels on Left */}
          <div className="flex gap-2 items-start w-full">
            {/* Weekday labels */}
            <div className="grid grid-rows-7 gap-[3px] text-[10px] text-[#8e8374] font-mono pt-[1px] select-none w-6 shrink-0">
              {DAY_LABELS.map((day) => (
                <span key={day.id} className="h-[13px] leading-[13px]">
                  {day.label}
                </span>
              ))}
            </div>

            {/* Weeks columns — fill remaining width */}
            <div className="flex gap-[3px] flex-1">
              {weeks.map((week) => (
                <div
                  key={week.id}
                  className="grid grid-rows-7 gap-[3px] flex-1"
                >
                  {week.days.map((day) => {
                    const isHovered =
                      hoveredCell?.date === day.date && day.date !== "";
                    return (
                      // biome-ignore lint/a11y/useSemanticElements: custom CSS grid calendar heatmap
                      <div
                        key={day.id}
                        role="gridcell"
                        tabIndex={day.inCurrentYear ? 0 : -1}
                        aria-label={
                          day.date
                            ? `${day.count} contributions on ${formatDate(day.date)}`
                            : undefined
                        }
                        className={`w-full aspect-square rounded-[2px] transition-transform duration-100 ${
                          day.inCurrentYear
                            ? LEVEL_CLASSES[day.level] || LEVEL_CLASSES[0]
                            : "bg-transparent pointer-events-none"
                        } ${isHovered ? "scale-125 z-20 ring-1 ring-[#f3ebdd]" : ""}`}
                        onMouseEnter={(e) => {
                          if (!day.date) return;
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredCell({
                            date: day.date,
                            count: day.count,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          });
                        }}
                        onMouseLeave={() => setHoveredCell(null)}
                        onFocus={(e) => {
                          if (!day.date) return;
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredCell({
                            date: day.date,
                            count: day.count,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          });
                        }}
                        onBlur={() => setHoveredCell(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Hover Tooltip */}
      {hoveredCell && (
        <div
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full mb-2 px-3 py-1.5 rounded-lg bg-[#1e1a16] border border-[#2f2923] shadow-2xl text-xs text-[#f3ebdd] font-mono whitespace-nowrap animate-in fade-in zoom-in-95 duration-150"
          style={{
            left: `${hoveredCell.x}px`,
            top: `${hoveredCell.y - 8}px`,
          }}
        >
          <span className="font-semibold text-[#39d353]">
            {hoveredCell.count === 0 ? "No" : hoveredCell.count} contribution
            {hoveredCell.count === 1 ? "" : "s"}
          </span>{" "}
          on {formatDate(hoveredCell.date)}
        </div>
      )}

      {/* Footer Info: Organizations & Legend */}
      <div className="mt-6 pt-5 border-t border-[#2f2923] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-[#8e8374]">
        {/* Organizations contributed to */}
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-[#8e8374]">Contributed to:</span>
          {GITHUB_ORGANIZATIONS.map((org) => (
            <Link
              key={org.login}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#1e1a16] hover:bg-[#25201b] border border-[#2f2923] text-[#b9ae9d] hover:text-[#f3ebdd] transition-colors"
            >
              <Image
                src={org.avatarUrl}
                alt={org.name}
                width={14}
                height={14}
                className="w-3.5 h-3.5 rounded-full"
                unoptimized
              />
              <span className="font-mono text-[11px]">@{org.login}</span>
              <ExternalLink className="w-2.5 h-2.5 text-[#8e8374]" />
            </Link>
          ))}
        </div>

        {/* Less -> More Legend */}
        <div className="flex items-center gap-3 self-end md:self-auto font-mono text-[11px]">
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#39d353]/10 text-[#39d353] border border-[#39d353]/30">
            Verified GitHub
          </span>
          <div className="flex items-center gap-1.5">
            <span>Less</span>
            <div className="flex gap-[3px]">
              <div
                className={`w-[11px] h-[11px] rounded-[2px] ${LEVEL_CLASSES[0]}`}
              />
              <div
                className={`w-[11px] h-[11px] rounded-[2px] ${LEVEL_CLASSES[1]}`}
              />
              <div
                className={`w-[11px] h-[11px] rounded-[2px] ${LEVEL_CLASSES[2]}`}
              />
              <div
                className={`w-[11px] h-[11px] rounded-[2px] ${LEVEL_CLASSES[3]}`}
              />
              <div
                className={`w-[11px] h-[11px] rounded-[2px] ${LEVEL_CLASSES[4]}`}
              />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
