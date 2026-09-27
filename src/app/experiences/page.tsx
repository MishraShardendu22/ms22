import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingStateLight } from "@/component/Loading";
import { EmptyState, ListCard, ServerPageHeader } from "@/component/Section";
import { generatePageMetadata } from "@/lib/metadata";
import { experiencesAPI } from "@/static/api/api.request";
import type { Experience } from "@/static/api/api.types";
import { PAGE_ITEMS_PER_PAGE } from "@/static/pagination";

export const revalidate = 3600;

const EXPERIENCES_METADATA = {
  title: "Work Experience",
  description:
    "Professional work experience as a Software Developer and Engineer. Explore my career journey, roles, responsibilities, and technical achievements in software development.",
  path: "/experiences",
  keywords: [
    "work experience",
    "professional experience",
    "software engineer experience",
    "developer career",
    "employment history",
    "professional journey",
    "tech career",
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
    ...EXPERIENCES_METADATA,
    noIndex: isPaginated,
  });
}

interface PageProps {
  searchParams: Promise<{
    page?: string;
    filter?: string;
  }>;
}

async function ExperiencesContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number.parseInt(params.page || "1", 10));

  let experiences: Experience[] = [];
  let totalPages = 1;
  let total = 0;

  try {
    // Fetch all experiences for pagination
    const allResponse = await experiencesAPI.getAllExperiences(1, 500);
    if (allResponse.status === 200 && allResponse.data) {
      const allExperiences = allResponse.data?.experiences || [];

      // Calculate pagination
      total = allExperiences.length;
      totalPages = Math.max(1, Math.ceil(total / PAGE_ITEMS_PER_PAGE));

      // Get current page slice
      const startIndex = (currentPage - 1) * PAGE_ITEMS_PER_PAGE;
      experiences = allExperiences.slice(
        startIndex,
        startIndex + PAGE_ITEMS_PER_PAGE,
      );
    }
  } catch (error) {
    console.error("Error fetching experiences:", error);
  }

  return (
    <div className="w-full relative z-10">
      {/* Server-rendered Header with Link-based pagination */}
      <ServerPageHeader
        title="Work Experience"
        theme="blue"
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/experiences"
        resultCount={total}
        resultLabel="experiences"
      />

      {/* Experiences List Surface */}
      {experiences.length > 0 ? (
        <div className="bg-[#161311] border border-[#2f2923] rounded-2xl overflow-hidden divide-y divide-[#2f2923] shadow-xl">
          {experiences.map((experience) => {
            const experienceId = experience.inline?.id as string;
            if (!experienceId) return null;

            const latestPosition = experience.experience_time_line?.[0];
            const position = latestPosition?.position;
            const startDate = latestPosition?.start_date;
            const endDate = latestPosition?.end_date;
            const dateRange = startDate
              ? `${startDate} - ${endDate || "Present"}`
              : undefined;

            return (
              <ListCard
                key={experienceId}
                id={experienceId}
                href={`/experiences/${experienceId}`}
                theme="blue"
                logo={experience.company_logo}
                title={experience.company_name}
                subtitle={position}
                description={experience.description}
                dateRange={dateRange}
                technologies={experience.technologies}
                maxTechDisplay={5}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No experiences found"
          description="No work experiences available at the moment"
          theme="blue"
        />
      )}
    </div>
  );
}

export default async function ExperiencesPage({ searchParams }: PageProps) {
  return (
    <main className="flex-1 min-h-screen bg-[#0e0c0a] relative overflow-hidden">
      {/* Subtle Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-[#d9a55b]/5 rounded-full filter blur-3xl" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-[#4caf7d]/3 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10 max-w-400">
        <Suspense
          fallback={
            <LoadingStateLight
              message="Loading experiences..."
              variant="blue"
            />
          }
        >
          <ExperiencesContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
