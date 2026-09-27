import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PaginationLinks } from "@/component/Pagination";
import {
  ContentGrid,
  SectionHeader,
  SectionWrapper,
} from "@/component/Section";
import { UnifiedCard } from "@/component/UnifiedCard";
import { projectsAPI } from "@/static/api/api.request";
import type { Project } from "@/static/api/api.types";
import { PROJECTS_PER_PAGE } from "@/static/pagination";
import { stripMarkdown } from "@/utils/text";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const headerActions = (
    <div className="flex items-center gap-1.5 shrink-0">
      {project.project_repository && (
        <Link
          href={project.project_repository}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-[#1e1a16] hover:bg-[#d9a55b]/20 text-[#b9ae9d] hover:text-[#d9a55b] rounded-md border border-[#2f2923] hover:border-[#d9a55b]/40 transition-all duration-200"
          aria-label="View repository"
        >
          <span>Code</span>
        </Link>
      )}
      {project.project_live_link && (
        <Link
          href={project.project_live_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-[#1e1a16] hover:bg-[#d9a55b]/20 text-[#b9ae9d] hover:text-[#d9a55b] rounded-md border border-[#2f2923] hover:border-[#d9a55b]/40 transition-all duration-200"
          aria-label="View live project"
        >
          <span>Live</span>
        </Link>
      )}
      {project.project_video && (
        <Link
          href={project.project_video}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-[#1e1a16] hover:bg-[#d9a55b]/20 text-[#b9ae9d] hover:text-[#d9a55b] rounded-md border border-[#2f2923] hover:border-[#d9a55b]/40 transition-all duration-200"
          aria-label="Watch video"
        >
          <span>Demo</span>
        </Link>
      )}
    </div>
  );

  const displayDescription = stripMarkdown(
    project.small_description || project.description || "",
  );
  const projectId = project.inline?.id;

  return (
    <UnifiedCard
      index={index}
      theme="violet"
      title={project.project_name}
      description={displayDescription}
      technologies={project.skills}
      headerActions={headerActions}
      href={projectId ? `/projects/${projectId}` : undefined}
      maxTechDisplay={3}
    />
  );
};

const sortByOrder = (items: Project[]) =>
  [...items].sort((a, b) => a.order - b.order);

// Mobile-optimized server component
export async function ProjectsDisplayMobile() {
  let projects: Project[] = [];

  try {
    const response = await projectsAPI.getAllProjects(1, 4);
    projects = sortByOrder(response.data?.projects || []);
  } catch (error) {
    console.error("Error loading mobile projects:", error);
    // Fallback to empty state when backend is rate-limited or unavailable.
  }

  if (projects.length === 0) {
    return (
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold text-[#f3ebdd] mb-4">Projects</h2>
        <p className="text-[#8e8374] text-sm">No projects available</p>
      </section>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#f3ebdd]">Projects</h2>
        <Link
          href="/projects"
          className="text-sm text-[#b9ae9d] hover:text-[#d9a55b] transition-colors"
        >
          View All →
        </Link>
      </div>
      <p className="text-[#8e8374] text-sm mb-4">
        A showcase of my work and open-source contributions
      </p>
      <div className="space-y-3">
        {projects.map((project) => {
          const projectId = project.inline?.id;
          return (
            <div
              key={projectId}
              className="group relative bg-[#161311] border border-[#2f2923] rounded-xl p-4 hover:border-[#d9a55b]/40 transition-colors duration-200"
            >
              {projectId && (
                <Link
                  href={`/projects/${projectId}`}
                  className="absolute inset-0 z-0"
                  aria-label={`View ${project.project_name}`}
                />
              )}
              <div className="flex items-start justify-between gap-2 mb-2 relative z-10">
                <h3 className="text-base font-bold text-[#f3ebdd] line-clamp-1 group-hover:text-[#d9a55b] transition-colors">
                  {project.project_name}
                </h3>
                <div className="flex items-center gap-1.5 shrink-0">
                  {project.project_repository && (
                    <Link
                      href={project.project_repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 text-xs font-medium bg-[#1e1a16] text-[#b9ae9d] border border-[#2f2923] rounded hover:border-[#d9a55b]/40 hover:text-[#d9a55b] transition-colors"
                    >
                      Code
                    </Link>
                  )}
                  {project.project_live_link && (
                    <Link
                      href={project.project_live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 text-xs font-medium bg-[#1e1a16] text-[#b9ae9d] border border-[#2f2923] rounded hover:border-[#d9a55b]/40 hover:text-[#d9a55b] transition-colors"
                    >
                      Live
                    </Link>
                  )}
                </div>
              </div>
              <p className="text-[#8e8374] text-xs leading-relaxed mb-3 line-clamp-2">
                {stripMarkdown(
                  project.small_description || project.description || "",
                )}
              </p>
              <div className="flex items-center justify-between gap-2 relative z-10 pt-1">
                <div className="flex flex-wrap items-center gap-1.5 text-xs min-w-0 flex-1">
                  {project.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-xs bg-[#1e1a16] text-[#b9ae9d] border border-[#2f2923] rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {project.skills.length > 3 && (
                    <span className="px-2 py-0.5 text-xs bg-[#d9a55b]/10 text-[#d9a55b] border border-[#d9a55b]/20 rounded">
                      +{project.skills.length - 3}
                    </span>
                  )}
                </div>
                {projectId && (
                  <Link
                    href={`/projects/${projectId}`}
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

interface ProjectsDisplayServerProps {
  searchParams?: Promise<{ projectsPage?: string }>;
}

export async function ProjectsDisplayServer({
  searchParams,
}: ProjectsDisplayServerProps) {
  const params = await searchParams;
  const page = Number(params?.projectsPage) || 1;

  let projects: Project[] = [];
  let totalPages = 1;
  let hasNext = false;
  let hasPrevious = false;

  try {
    const response = await projectsAPI.getAllProjects(page, PROJECTS_PER_PAGE);
    projects = sortByOrder(response.data?.projects || []);
    totalPages = response.data?.total_pages || 1;
    hasNext = response.data?.has_next || false;
    hasPrevious = response.data?.has_previous || false;
  } catch (error) {
    console.error("Error loading projects:", error);
    // Fallback to empty state when backend is rate-limited or unavailable.
  }

  const headerContent = (
    <SectionHeader
      title="Projects"
      description="A curated showcase of my work, from scalable web applications to innovative open-source contributions"
      theme="violet"
    >
      <PaginationLinks
        currentPage={page}
        totalPages={totalPages}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        baseHref="/#projects"
        theme="violet"
        viewAllHref="/projects"
        pageParam="projectsPage"
      />
    </SectionHeader>
  );

  if (projects.length === 0) {
    return (
      <SectionWrapper theme="violet">
        {headerContent}
        <div className="py-12 flex items-center justify-center">
          <p className="text-lg text-gray-400">
            No projects available to display
          </p>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper theme="violet">
      {headerContent}
      <ContentGrid columns={2}>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.inline?.id ?? String(index)}
            project={project}
            index={index}
          />
        ))}
      </ContentGrid>
    </SectionWrapper>
  );
}
