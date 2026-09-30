import { cache } from "react";
import { ErrorState } from "@/component/Error";
import { TimelineAPI } from "@/static/api/api.request";
import { TimelineDisplay } from "./TimelineDisplay";
import type { ExperienceInput, VolunteerInput } from "./types";

interface TimelineApiItem {
  company_name?: string;
  company_logo?: string;
  organisation?: string;
  organisation_logo?: string;
  description?: string;
  technologies?: string[];
  position: string;
  start_date: string;
  end_date?: string;
}

interface TimelineApiResponse {
  experience_timeline?: TimelineApiItem[];
  volunteer_experience_timeline?: TimelineApiItem[];
}

// Cache timeline data with 5-minute revalidation
const getTimelineData = cache(async () => {
  const res = await TimelineAPI.getAllEndpoints();
  return res.data as TimelineApiResponse | null;
});

export const Time = async () => {
  try {
    const data = await getTimelineData();
    const experienceTimeline = data?.experience_timeline || [];
    const volunteerTimeline = data?.volunteer_experience_timeline || [];

    const experiences: ExperienceInput[] = experienceTimeline.map((item) => ({
      company_name: item.company_name || "",
      company_logo: item.company_logo,
      description: item.description,
      technologies: item.technologies || [],
      experience_time_line: [
        {
          position: item.position,
          start_date: item.start_date,
          end_date: item.end_date || "",
        },
      ],
    }));

    const volunteerExperiences: VolunteerInput[] = volunteerTimeline.map(
      (item) => ({
        organisation: item.organisation || "",
        organisation_logo: item.organisation_logo,
        description: item.description,
        technologies: item.technologies || [],
        volunteer_time_line: [
          {
            position: item.position,
            start_date: item.start_date,
            end_date: item.end_date || "",
          },
        ],
      }),
    );

    const hasData = experiences.length > 0 || volunteerExperiences.length > 0;

    if (!hasData) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">No timeline data available</p>
        </div>
      );
    }

    return (
      <TimelineDisplay
        experiences={experiences}
        volunteerExperiences={volunteerExperiences}
      />
    );
  } catch (err) {
    console.error("Timeline fetch error:", err);
    return (
      <ErrorState
        title="Timeline Error"
        message={err instanceof Error ? err.message : "Failed to load timeline"}
        variant="red"
      />
    );
  }
};
