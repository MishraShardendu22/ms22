import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingStateLight } from "@/component/Loading";
import { EmptyState, ListCard, ServerPageHeader } from "@/component/Section";
import { generatePageMetadata } from "@/lib/metadata";
import { volunteerAPI } from "@/static/api/api.request";
import type { Volunteer } from "@/static/api/api.types";
import { PAGE_ITEMS_PER_PAGE } from "@/static/pagination";

export const revalidate = 3600;

const VOLUNTEER_METADATA = {
  title: "Volunteer Experience",
  description:
    "Community involvement and volunteer work. Discover my contributions to open-source projects, tech communities, and social initiatives. Making a positive impact through technology.",
  path: "/volunteer",
  keywords: [
    "volunteer work",
    "community service",
    "open source contributions",
    "tech community",
    "social impact",
    "community involvement",
    "volunteer experience",
  ],
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }> | { page?: string };
}): Promise<Metadata> {
  const params = searchParams ? await searchParams : undefined;
  const pageNum = Number.parseInt(params?.page || "1", 10);
  const isPaginated = !Number.isNaN(pageNum) && pageNum > 1;
  return generatePageMetadata({
    ...VOLUNTEER_METADATA,
    noIndex: isPaginated,
  });
}

interface PageProps {
  searchParams: Promise<{
    page?: string;
    filter?: string;
  }>;
}

async function VolunteerContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number.parseInt(params.page || "1", 10));

  let volunteers: Volunteer[] = [];
  let totalPages = 1;
  let total = 0;

  try {
    // Fetch all volunteers for pagination
    const allResponse = await volunteerAPI.getAllVolunteers(1, 500);
    if (allResponse.status === 200 && allResponse.data) {
      const allVolunteers = allResponse.data?.volunteer_experiences || [];

      // Calculate pagination
      total = allVolunteers.length;
      totalPages = Math.max(1, Math.ceil(total / PAGE_ITEMS_PER_PAGE));

      // Get current page slice
      const startIndex = (currentPage - 1) * PAGE_ITEMS_PER_PAGE;
      volunteers = allVolunteers.slice(
        startIndex,
        startIndex + PAGE_ITEMS_PER_PAGE,
      );
    }
  } catch (error) {
    console.error("Error fetching volunteers:", error);
  }

  return (
    <div className="w-full relative z-10">
      {/* Server-rendered Header with Link-based pagination */}
      <ServerPageHeader
        title="Volunteer Experience"
        theme="pink"
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/volunteer"
        resultCount={total}
        resultLabel="volunteer experiences"
      />

      {/* Volunteers List Surface */}
      {volunteers.length > 0 ? (
        <div className="bg-[#161311] border border-[#2f2923] rounded-2xl overflow-hidden divide-y divide-[#2f2923] shadow-xl">
          {volunteers.map((volunteer) => {
            const volunteerId = volunteer.inline?.id;
            if (!volunteerId) return null;

            const latestFromTimeline = volunteer.volunteer_time_line?.[0];
            const position = latestFromTimeline?.position || volunteer.position;

            const startDate =
              latestFromTimeline?.start_date || volunteer.start_date;
            const endDate = latestFromTimeline?.end_date || volunteer.end_date;
            const dateRange = startDate
              ? `${startDate} - ${endDate || (volunteer.current ? "Present" : "")}`
              : undefined;

            return (
              <ListCard
                key={volunteerId}
                id={volunteerId}
                href={`/volunteer/${volunteerId}`}
                theme="pink"
                logo={volunteer.organisation_logo}
                title={volunteer.organisation}
                subtitle={position}
                description={volunteer.description}
                dateRange={dateRange}
                technologies={volunteer.technologies}
                isActive={volunteer.current}
                maxTechDisplay={5}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No volunteer experiences found"
          description="No volunteer experiences available at the moment"
          theme="pink"
        />
      )}
    </div>
  );
}

export default async function VolunteerPage({ searchParams }: PageProps) {
  return (
    <main className="flex-1 min-h-screen bg-[#0e0c0a] relative overflow-hidden">
      {/* Subtle Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-[#4caf7d]/5 rounded-full filter blur-3xl" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-[#d9a55b]/3 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10 max-w-400">
        <Suspense
          fallback={
            <LoadingStateLight
              message="Loading volunteer experiences..."
              variant="pink"
            />
          }
        >
          <VolunteerContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
