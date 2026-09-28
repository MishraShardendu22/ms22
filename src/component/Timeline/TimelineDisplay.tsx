"use client";

import { useEffect, useRef, useState } from "react";
import { EmptyState } from "./EmptyState";
import { ExperienceSection } from "./ExperienceSection";
import { MonthMarker } from "./MonthMarker";
import { TimelineControls } from "./TimelineControls";
import { TimelineLegend } from "./TimelineLegend";
import type {
  ExperiencePosition,
  ProcessedExperience,
  TimelineDisplayProps,
} from "./types";
import { useIsMobile } from "./useIsMobile";
import { arrangeExperiences, processTimelineData } from "./utils";

export const TimelineDisplay = ({
  experiences,
  volunteerExperiences: volunteerExpProps,
}: TimelineDisplayProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const processedData = processTimelineData(experiences, volunteerExpProps);

  const getMonthPosition = (date: Date) => {
    const monthIndex = processedData.months.findIndex(
      (m) =>
        m.date.getFullYear() === date.getFullYear() &&
        m.date.getMonth() === date.getMonth(),
    );
    return monthIndex >= 0 ? monthIndex * (isMobile ? 80 : 120) + 24 : 24;
  };

  const getExperiencePosition = (
    exp: ProcessedExperience,
  ): ExperiencePosition => {
    const monthWidth = isMobile ? 80 : 120;
    const startPos = getMonthPosition(exp.startMonth);

    const now = new Date();
    const currentMonthDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const effectiveEndMonth =
      exp.endMonth > currentMonthDate ? currentMonthDate : exp.endMonth;

    const endPos = getMonthPosition(effectiveEndMonth);

    return {
      left: startPos,
      width: Math.max(endPos - startPos + monthWidth, monthWidth),
    };
  };

  useEffect(() => {
    if (!scrollContainerRef.current || processedData.months.length === 0)
      return;

    requestAnimationFrame(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const now = new Date();
      const currentMonthIndex = processedData.months.findIndex(
        (m) => m.year === now.getFullYear() && m.month === now.getMonth(),
      );

      const monthWidth = isMobile ? 80 : 120;
      const scrollTo =
        currentMonthIndex !== -1
          ? Math.max(
              0,
              currentMonthIndex * monthWidth - container.clientWidth / 2 + 60,
            )
          : Math.max(0, container.scrollWidth - container.clientWidth - 200);

      container.scrollLeft = scrollTo;
    });
  }, [processedData.months, isMobile]);

  const { workExperiences, volunteerExperiences } = arrangeExperiences(
    processedData.allExperiences,
  );

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = isMobile ? 300 : 500;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (processedData.allExperiences.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-[#161311]/40 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none will-change-auto">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d9a55b]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#e6b56c]/3 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-grid-lines"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal font-serif">
            <span className="bg-linear-to-r from-[#f3ebdd] via-[#d9a55b] to-[#e6b56c] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(217,165,91,0.25)]">
              Experience Timeline
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#8e8374] max-w-2xl mx-auto leading-relaxed">
            A comprehensive timeline of my professional journey and volunteer
            contributions, continuously updated to reflect my current roles
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-visible pb-6 pt-8 mx-4 lg:mx-12 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-[#161311] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d9a55b]/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-[#d9a55b]/60"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#d9a55b #161311",
              scrollBehavior: "smooth",
            }}
          >
            <div
              className="relative bg-[#161311] border border-[#2f2923] rounded-3xl pt-12 pb-8 px-8 shadow-xl min-h-[500px] overflow-visible"
              style={{
                width: `${Math.max(processedData.months.length * (isMobile ? 80 : 120), 800)}px`,
                minWidth: "100%",
              }}
            >
              <div className="relative mb-8" style={{ height: "120px" }}>
                {processedData.months.map((month, index) => (
                  <MonthMarker
                    key={`${month.year}-${month.month}`}
                    month={month}
                    index={index}
                    isMobile={isMobile}
                  />
                ))}
                <div className="absolute top-16 left-0 right-0 h-1 bg-linear-to-r from-[#d9a55b]/30 via-[#e6b56c]/30 to-[#d9a55b]/30 rounded-full shadow-lg shadow-[#d9a55b]/10" />
              </div>

              <div className="space-y-8 min-h-[350px]">
                <ExperienceSection
                  experiences={workExperiences}
                  type="work"
                  isMobile={isMobile}
                  hoveredCard={hoveredCard}
                  setHoveredCard={setHoveredCard}
                  getExperiencePosition={getExperiencePosition}
                />

                <ExperienceSection
                  experiences={volunteerExperiences}
                  type="volunteer"
                  isMobile={isMobile}
                  hoveredCard={hoveredCard}
                  setHoveredCard={setHoveredCard}
                  getExperiencePosition={getExperiencePosition}
                />
              </div>
            </div>
          </div>

          <TimelineControls isMobile={isMobile} onScroll={scroll} />
          <TimelineLegend />
        </div>
      </div>
    </section>
  );
};
