import { MONTH_NAMES, VOLUNTEER_COLORS, WORK_COLORS } from "@/static/timeline";
import type {
  ExperienceInput,
  MonthData,
  ProcessedExperience,
  ProcessedTimelineData,
  TimelineEntry,
  VolunteerInput,
} from "./types";

export const processTimelineData = (
  experiences: ExperienceInput[],
  volunteerExperiences: VolunteerInput[],
): ProcessedTimelineData => {
  const allExperiences: ProcessedExperience[] = [];

  experiences.forEach((exp) => {
    const timelines = exp.experience_time_line || [];
    timelines.forEach((timeline: TimelineEntry) => {
      const startDate = new Date(timeline.start_date);
      const endDate = timeline.end_date
        ? new Date(timeline.end_date)
        : new Date();

      allExperiences.push({
        type: "work",
        name: exp.company_name,
        logo: exp.company_logo || "",
        position: timeline.position,
        start_date: timeline.start_date,
        end_date: timeline.end_date || "",
        startMonth: startDate,
        endMonth: endDate,
        description: exp.description,
        technologies: exp.technologies,
      });
    });
  });

  volunteerExperiences.forEach((exp) => {
    const timelines = exp.volunteer_time_line || [];
    timelines.forEach((timeline: TimelineEntry) => {
      const startDate = new Date(timeline.start_date);
      const endDate = timeline.end_date
        ? new Date(timeline.end_date)
        : new Date();

      allExperiences.push({
        type: "volunteer",
        name: exp.organisation,
        logo: exp.organisation_logo || "",
        position: timeline.position,
        start_date: timeline.start_date,
        end_date: timeline.end_date || "",
        startMonth: startDate,
        endMonth: endDate,
        description: exp.description,
        technologies: exp.technologies,
      });
    });
  });

  allExperiences.sort(
    (a, b) => b.startMonth.getTime() - a.startMonth.getTime(),
  );

  const now = new Date();
  const currentMonthDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const earliestStart =
    allExperiences.length > 0
      ? new Date(
          Math.min(...allExperiences.map((exp) => exp.startMonth.getTime())),
        )
      : now;

  const latestEnd = currentMonthDate;

  const months: MonthData[] = [];
  const current = new Date(
    earliestStart.getFullYear(),
    earliestStart.getMonth(),
    1,
  );

  while (current <= latestEnd) {
    months.push({
      date: new Date(current),
      year: current.getFullYear(),
      month: current.getMonth(),
      monthName: MONTH_NAMES[current.getMonth()],
      isYearStart: current.getMonth() === 0,
    });
    current.setMonth(current.getMonth() + 1);
  }

  return { allExperiences, months, earliestStart, latestEnd };
};

export const getCompanyColor = (
  companyName: string,
  type: "work" | "volunteer",
): string => {
  const colors = type === "work" ? WORK_COLORS : VOLUNTEER_COLORS;

  let hash = 0;
  for (let i = 0; i < companyName.length; i++) {
    hash = companyName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export const arrangeExperiences = (allExperiences: ProcessedExperience[]) => ({
  workExperiences: allExperiences.filter((exp) => exp.type === "work"),
  volunteerExperiences: allExperiences.filter(
    (exp) => exp.type === "volunteer",
  ),
});

export const formatDuration = (startDate: string, endDate?: string): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return "";
  }

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1;
  if (months < 1) months = 1;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years > 0 && remainingMonths > 0) {
    return `${years} yr${years > 1 ? "s" : ""} ${remainingMonths} mo${remainingMonths > 1 ? "s" : ""}`;
  }
  if (years > 0) {
    return `${years} yr${years > 1 ? "s" : ""}`;
  }
  return `${months} mo${months > 1 ? "s" : ""}`;
};

export const formatDateSpan = (
  startDate: string,
  endDate?: string,
): { spanText: string; isCurrent: boolean; durationText: string } => {
  const start = new Date(startDate);
  const isCurrent = !endDate;

  const startFormatted = !Number.isNaN(start.getTime())
    ? start.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : startDate;

  let endFormatted = "Present";
  if (endDate) {
    const end = new Date(endDate);
    endFormatted = !Number.isNaN(end.getTime())
      ? end.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      : endDate;
  }

  const durationText = formatDuration(startDate, endDate);

  return {
    spanText: `${startFormatted} — ${endFormatted}`,
    isCurrent,
    durationText,
  };
};
