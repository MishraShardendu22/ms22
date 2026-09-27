import type { Metadata } from "next";
import { Suspense } from "react";
import { ErrorState } from "@/component/Error";
import { LoadingStateLight } from "@/component/Loading";
import { EmptyState, ListCard, ServerPageHeader } from "@/component/Section";
import { generatePageMetadata } from "@/lib/metadata";
import { projectsAPI } from "@/static/api/api.request";
import type { Project } from "@/static/api/api.types";
import { PAGE_ITEMS_PER_PAGE } from "@/static/pagination";

export const revalidate = 3600;

const PROJECTS_METADATA = {
  title: "Projects",
  description:
    "Explore my portfolio of software development projects including web applications, APIs, and open-source contributions. Built with Go, React, Next.js, TypeScript, and modern technologies.",
  path: "/projects",
  keywords: [
    "projects",
    "portfolio",
    "web development",
    "software projects",
    "Go projects",
    "React projects",
    "Next.js applications",
    "TypeScript projects",
    "open source",
    "GitHub projects",
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
    ...PROJECTS_METADATA,
    noIndex: isPaginated,
  });
}

interface PageProps {
  searchParams: Promise<{
    page?: string;
    filter?: string;
  }>;
}

async function ProjectsContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number.parseInt(params.page || "1", 10));

  let projects: Project[] = [];
  let totalPages = 1;
  let total = 0;
  let error: string | null = null;

  try {
    // Fetch all projects using proper pagination
    const { projects: allProjects, total: totalCount } =
      await projectsAPI.getAllProjectsPaginated();

    // Calculate pagination
    total = totalCount;
    totalPages = Math.max(1, Math.ceil(total / PAGE_ITEMS_PER_PAGE));

    // Get current page slice
    const startIndex = (currentPage - 1) * PAGE_ITEMS_PER_PAGE;
    projects = allProjects.slice(startIndex, startIndex + PAGE_ITEMS_PER_PAGE);
  } catch (err) {
    error = err instanceof Error ? err.message : "An error occurred";
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="w-full relative z-10">
      {/* Server-rendered Header with Link-based pagination */}
      <ServerPageHeader
        title="Projects"
        theme="violet"
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/projects"
        resultCount={total}
        resultLabel="projects"
      />

      {/* Projects List Surface */}
      {projects.length > 0 ? (
        <div className="bg-[#161311] border border-[#2f2923] rounded-2xl overflow-hidden divide-y divide-[#2f2923] shadow-xl">
          {projects.map((project) => {
            const projectId = project.inline?.id;
            if (!projectId) return null;

            // Build links array from available URLs
            const links: Array<{ label: string; url: string }> = [];
            if (project.project_live_link) {
              links.push({
                label: "Live Demo",
                url: project.project_live_link,
              });
            }
            if (project.project_repository) {
              links.push({
                label: "Repository",
                url: project.project_repository,
              });
            }
            if (project.project_video) {
              links.push({ label: "Video", url: project.project_video });
            }

            return (
              <ListCard
                key={projectId}
                id={projectId}
                href={`/projects/${projectId}`}
                theme="violet"
                title={project.project_name}
                description={project.description || project.small_description}
                technologies={project.skills}
                links={links}
                maxTechDisplay={5}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No projects found"
          description="No projects available at the moment"
          theme="violet"
        />
      )}
    </div>
  );
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  return (
    <main className="flex-1 min-h-screen bg-[#0e0c0a] relative overflow-hidden">
      {/* Subtle Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-[#d9a55b]/5 rounded-full filter blur-3xl" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-[#e6b56c]/3 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10 max-w-400">
        <Suspense
          fallback={
            <LoadingStateLight message="Loading projects..." variant="violet" />
          }
        >
          <ProjectsContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
