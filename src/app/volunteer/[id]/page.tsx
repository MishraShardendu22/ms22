import { notFound } from "next/navigation";
import { DetailTreeView } from "@/component/DetailTree";
import { getCachedVolunteerById, volunteerAPI } from "@/static/api/api.request";
import { normalizeVolunteer } from "@/utils/detailNormalizers";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const response = await volunteerAPI.getAllVolunteers(1, 100);
    const volunteers = response.data?.volunteer_experiences || [];
    return volunteers
      .map((vol) => ({ id: String(vol.inline?.id) }))
      .filter((item) =>
        Boolean(item.id && item.id !== "undefined" && item.id !== "null"),
      );
  } catch (error) {
    console.error("Error generating static params for volunteer:", error);
    return [];
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function VolunteerDetailPage({ params }: PageProps) {
  const { id } = await params;

  const response = await getCachedVolunteerById(id);

  if (response.status === 404 || !response.data) {
    notFound();
  }

  if (response.status !== 200) {
    throw new Error(`Failed to load volunteer ${id}: ${response.status}`);
  }

  const treeData = normalizeVolunteer(response.data);

  return (
    <main className="flex-1 min-h-screen bg-[#0e0c0a]">
      <DetailTreeView data={treeData} />
    </main>
  );
}
