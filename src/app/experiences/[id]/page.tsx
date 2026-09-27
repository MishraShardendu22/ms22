import { notFound } from "next/navigation";
import { DetailTreeView } from "@/component/DetailTree";
import {
  experiencesAPI,
  getCachedExperienceById,
} from "@/static/api/api.request";
import { normalizeExperience } from "@/utils/detailNormalizers";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const response = await experiencesAPI.getAllExperiences(1, 100);
    const experiences = response.data?.experiences || [];
    return experiences
      .map((exp) => ({ id: String(exp.inline?.id) }))
      .filter((item) =>
        Boolean(item.id && item.id !== "undefined" && item.id !== "null"),
      );
  } catch (error) {
    console.error("Error generating static params for experiences:", error);
    return [];
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { id } = await params;

  const response = await getCachedExperienceById(id);

  if (response.status === 404 || !response.data) {
    notFound();
  }

  if (response.status !== 200) {
    throw new Error(`Failed to load experience ${id}: ${response.status}`);
  }

  const treeData = normalizeExperience(response.data);

  return (
    <main className="flex-1 min-h-screen bg-[#0e0c0a]">
      <DetailTreeView data={treeData} />
    </main>
  );
}
