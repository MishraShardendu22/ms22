import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PaginationLinks } from "@/component/Pagination";
import {
  ContentGrid,
  SectionHeader,
  SectionWrapper,
} from "@/component/Section";
import { UnifiedCard } from "@/component/UnifiedCard";
import { volunteerAPI } from "@/static/api/api.request";
import type { Volunteer } from "@/static/api/api.types";
import { VOLUNTEERS_PER_PAGE } from "@/static/pagination";
import { formatDate } from "@/utils/formatDate";
import { stripMarkdown } from "@/utils/text";

interface VolunteerCardProps {
  volunteer: Volunteer;
  index: number;
}

export const VolunteerCard = ({ volunteer, index }: VolunteerCardProps) => {
  const latestTimeline =
    volunteer.volunteer_time_line?.[volunteer.volunteer_time_line.length - 1];
  const position =
    latestTimeline?.position || volunteer.position || "Volunteer";
  const startDate = formatDate(
    latestTimeline?.start_date || volunteer.start_date,
    { fallback: "" },
  );
  const endDate = latestTimeline?.end_date
    ? formatDate(latestTimeline.end_date, { fallback: "" })
    : volunteer.end_date
      ? formatDate(volunteer.end_date, { fallback: "" })
      : "Present";
  const isCurrent = !latestTimeline?.end_date && !volunteer.end_date;
  const volId = volunteer.inline?.id;

  const badges = [];
  if (isCurrent) {
    badges.push({ label: "Active" });
  }

  const extraInfo = volunteer.location ? (
    <>
      <span>•</span>
      <div className="flex items-center gap-1">
        <MapPin className="w-3.5 h-3.5" />
        <span>{volunteer.location}</span>
      </div>
    </>
  ) : null;

  return (
    <UnifiedCard
      index={index}
      theme="pink"
      logo={volunteer.organisation_logo}
      logoAlt={volunteer.organisation}
      title={position}
      subtitle={volunteer.organisation}
      startDate={startDate}
      endDate={endDate}
      description={stripMarkdown(volunteer.description || "")}
      technologies={volunteer.technologies}
      certificateUrl={volunteer.certificate_link}
      certificateLabel="Certificate"
      badges={badges}
      extraInfo={extraInfo}
      href={volId ? `/volunteer/${volId}` : undefined}
    />
  );
};

const sortByOrder = (items: Volunteer[]) =>
  [...items].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

export async function VolunteerDisplayMobile() {
  let volunteers: Volunteer[] = [];

  try {
    const response = await volunteerAPI.getAllVolunteers(1, 4);
    volunteers = sortByOrder(response.data?.volunteer_experiences || []);
  } catch (error) {
    console.error("Error loading mobile volunteers:", error);
    // Fallback to empty state when backend is rate-limited or unavailable.
  }

  if (volunteers.length === 0) {
    return (
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold text-[#f3ebdd] mb-4">Volunteer</h2>
        <p className="text-[#8e8374] text-sm">
          No volunteer experiences available
        </p>
      </section>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#f3ebdd]">Volunteer</h2>
        <Link
          href="/volunteer"
          className="text-sm text-[#8e8374] hover:text-[#d9a55b] transition-colors"
        >
          View All →
        </Link>
      </div>
      <p className="text-[#8e8374] text-sm mb-4">
        Community service and meaningful contributions
      </p>
      <div className="space-y-4">
        {volunteers.map((vol) => {
          const latestTimeline =
            vol.volunteer_time_line?.[vol.volunteer_time_line.length - 1];
          const position =
            latestTimeline?.position || vol.position || "Volunteer";
          const startDate = formatDate(
            latestTimeline?.start_date || vol.start_date,
            { fallback: "" },
          );
          const endDate = latestTimeline?.end_date
            ? formatDate(latestTimeline.end_date, { fallback: "" })
            : vol.end_date
              ? formatDate(vol.end_date, { fallback: "" })
              : "Present";
          const volId = vol.inline?.id;

          return (
            <div
              key={volId}
              className="group relative bg-[#161311] border border-[#2f2923] rounded-xl p-4 hover:border-[#d9a55b]/40 transition-colors duration-200"
            >
              {volId && (
                <Link
                  href={`/volunteer/${volId}`}
                  className="absolute inset-0 z-0"
                  aria-label={`View ${position}`}
                />
              )}
              <div className="flex items-start gap-3 mb-3 relative z-10">
                {vol.organisation_logo && (
                  <Image
                    src={vol.organisation_logo}
                    alt={vol.organisation}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-lg object-contain bg-white/5 p-1 shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-[#f3ebdd] line-clamp-1 group-hover:text-[#d9a55b] transition-colors">
                    {position}
                  </h3>
                  <p className="text-sm text-[#b9ae9d]">{vol.organisation}</p>
                </div>
              </div>
              <p className="text-xs text-[#8e8374] mb-2 relative z-10">
                {startDate} - {endDate}
              </p>
              <p className="text-sm text-[#8e8374] leading-relaxed mb-3 line-clamp-2 relative z-10">
                {stripMarkdown(vol.description || "")}
              </p>
              <div className="flex items-center justify-between gap-2 relative z-10 pt-1">
                <div className="flex flex-wrap items-center gap-1.5 text-xs min-w-0 flex-1">
                  {vol.technologies?.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs bg-[#1e1a16] text-[#b9ae9d] border border-[#2f2923] rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {(vol.technologies?.length ?? 0) > 3 && (
                    <span className="px-2 py-0.5 text-xs bg-[#d9a55b]/10 text-[#d9a55b] border border-[#d9a55b]/20 rounded">
                      +{(vol.technologies?.length ?? 0) - 3}
                    </span>
                  )}
                </div>
                {volId && (
                  <Link
                    href={`/volunteer/${volId}`}
                    className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-[#d9a55b]/10 text-[#d9a55b] rounded border border-[#d9a55b]/30 shrink-0 self-end ml-auto hover:bg-[#d9a55b]/20 transition-colors"
                  >
                    <span>View</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

interface VolunteerDisplayServerProps {
  searchParams?: Promise<{ volunteerPage?: string }>;
}

export async function VolunteerDisplayServer({
  searchParams,
}: VolunteerDisplayServerProps) {
  const params = await searchParams;
  const page = Number(params?.volunteerPage) || 1;

  let volunteers: Volunteer[] = [];
  let totalPages = 1;
  let hasNext = false;
  let hasPrevious = false;

  try {
    const response = await volunteerAPI.getAllVolunteers(
      page,
      VOLUNTEERS_PER_PAGE,
    );
    volunteers = sortByOrder(response.data?.volunteer_experiences || []);
    totalPages = response.data?.total_pages || 1;
    hasNext = response.data?.has_next || false;
    hasPrevious = response.data?.has_previous || false;
  } catch (error) {
    console.error("Error loading volunteers:", error);
    // Fallback to empty state when backend is rate-limited or unavailable.
  }

  const headerContent = (
    <SectionHeader
      title="Volunteer Experience"
      description="Making a difference through community service and meaningful contributions"
      theme="pink"
    >
      <PaginationLinks
        currentPage={page}
        totalPages={totalPages}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        baseHref="/#volunteer"
        theme="pink"
        viewAllHref="/volunteer"
        pageParam="volunteerPage"
      />
    </SectionHeader>
  );

  if (volunteers.length === 0) {
    return (
      <SectionWrapper theme="pink">
        {headerContent}
        <div className="py-12 flex items-center justify-center">
          <p className="text-lg text-gray-400">
            No volunteer experiences available to display
          </p>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper theme="pink">
      {headerContent}
      <ContentGrid columns={2}>
        {volunteers.map((volunteer, index) => {
          const volId = volunteer.inline?.id as string;
          return (
            <VolunteerCard key={volId} volunteer={volunteer} index={index} />
          );
        })}
      </ContentGrid>
    </SectionWrapper>
  );
}
