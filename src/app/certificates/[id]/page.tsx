import { notFound } from "next/navigation";
import { DetailTreeView } from "@/component/DetailTree";
import {
  getCachedCertificateById,
  projectsAPI,
} from "@/static/api/api.request";
import type { Project } from "@/static/api/api.types";
import { normalizeCertificate } from "@/utils/detailNormalizers";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CertificateDetailPage({ params }: PageProps) {
  const { id } = await params;

  const response = await getCachedCertificateById(id);

  if (response.status === 404 || !response.data) {
    notFound();
  }

  if (response.status !== 200) {
    throw new Error(`Failed to load certificate ${id}: ${response.status}`);
  }

  const certificate = response.data;

  let resolvedProjects: Project[] = [];
  if (certificate.projects && certificate.projects.length > 0) {
    try {
      const { projects } = await projectsAPI.getProjectsByIds(
        certificate.projects,
      );
      resolvedProjects = projects;
    } catch {
      // Keep certificate page indexable even when related project lookups fail.
      resolvedProjects = [];
    }
  }

  const treeData = normalizeCertificate(certificate, resolvedProjects);

  return (
    <main className="flex-1 min-h-screen bg-[#0e0c0a]">
      <DetailTreeView data={treeData} />
    </main>
  );
}
