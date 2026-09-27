export const MONTH_NAMES = [
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
] as const;

export const WORK_COLORS = [
  "#d9a55b",
  "#e6b56c",
  "#c59146",
  "#f3ebdd",
  "#e8893f",
  "#b8822e",
  "#a05a3c",
  "#dfaa6b",
] as const;

export const VOLUNTEER_COLORS = [
  "#4caf7d",
  "#62c48f",
  "#3d9465",
  "#82c99b",
  "#d9a55b",
  "#b9ae9d",
  "#25784c",
  "#5bb887",
] as const;

export const MOBILE_QUERY = "(max-width: 767px)";

export const DATE_FORMAT_OPTIONS = {
  short: { month: "short", year: "numeric" } as Intl.DateTimeFormatOptions,
  long: { month: "long", year: "numeric" } as Intl.DateTimeFormatOptions,
} as const;
