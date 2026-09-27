import { Award, Briefcase, FolderGit2, Heart } from "lucide-react";
import type { PageHeaderTheme } from "@/constants/theme";
import type { SearchResultType } from "@/static/api/api.types";

export const FILTER_CONFIG = {
  project: {
    icon: FolderGit2,
    label: "Projects",
    color: "text-[#d9a55b]",
    bgColor: "bg-[#d9a55b]/15",
    borderColor: "border-[#d9a55b]/50",
  },
  experience: {
    icon: Briefcase,
    label: "Experience",
    color: "text-[#4caf7d]",
    bgColor: "bg-[#4caf7d]/15",
    borderColor: "border-[#4caf7d]/50",
  },
  certificate: {
    icon: Award,
    label: "Certificates",
    color: "text-[#e6b56c]",
    bgColor: "bg-[#e6b56c]/15",
    borderColor: "border-[#e6b56c]/50",
  },
  volunteer: {
    icon: Heart,
    label: "Volunteer",
    color: "text-[#e8893f]",
    bgColor: "bg-[#e8893f]/15",
    borderColor: "border-[#e8893f]/50",
  },
} as const;

export const FILTER_TYPES = Object.keys(FILTER_CONFIG) as SearchResultType[];

export function getPageFilter(pathname: string): SearchResultType | undefined {
  if (pathname.startsWith("/projects")) return "project";
  if (pathname.startsWith("/experiences")) return "experience";
  if (pathname.startsWith("/certificates")) return "certificate";
  if (pathname.startsWith("/volunteer")) return "volunteer";
  return undefined;
}

export const THEME_TO_SEARCH_FILTER: Record<PageHeaderTheme, SearchResultType> =
  {
    blue: "experience",
    pink: "volunteer",
    purple: "certificate",
    violet: "project",
  };
