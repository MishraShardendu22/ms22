import { notFound } from "next/navigation";
import { DetailTreeView } from "@/component/DetailTree";
import { getCachedProjectById, projectsAPI } from "@/static/api/api.request";
import { normalizeProject } from "@/utils/detailNormalizers";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const response = await projectsAPI.getAllProjects(1, 100);
    const projects = response.data?.projects || [];
    return projects
      .map((proj) => ({ id: String(proj.inline?.id) }))
      .filter((item) =>
        Boolean(item.id && item.id !== "undefined" && item.id !== "null"),
      );
  } catch (error) {
    console.error("Error generating static params for projects:", error);
    return [];
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;

  const response = await getCachedProjectById(id);

  if (response.status === 404 || !response.data) {
    notFound();
  }

  if (response.status !== 200) {
    throw new Error(`Failed to load project ${id}: ${response.status}`);
  }

  const treeData = normalizeProject(response.data);

  return (
    <main className="flex-1 min-h-screen bg-[#0e0c0a]">
      <DetailTreeView data={treeData} />
    </main>
  );
}
