import { notFound } from "next/navigation";
import { DetailTreeView } from "@/component/DetailTree";
import { getCachedVolunteerById } from "@/static/api/api.request";
import { normalizeVolunteer } from "@/utils/detailNormalizers";

export const revalidate = 3600;

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
