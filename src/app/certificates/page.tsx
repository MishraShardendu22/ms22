import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingStateLight } from "@/component/Loading";
import { EmptyState, ListCard, ServerPageHeader } from "@/component/Section";
import { generatePageMetadata } from "@/lib/metadata";
import { certificatesAPI } from "@/static/api/api.request";
import type { Certificate } from "@/static/api/api.types";
import { PAGE_ITEMS_PER_PAGE } from "@/static/pagination";

export const revalidate = 3600;

const CERTIFICATES_METADATA = {
  title: "Certifications & Achievements",
  description:
    "Professional certifications, technical credentials, and achievements in software development. View my verified skills and qualifications in programming, cloud technologies, and software engineering.",
  path: "/certificates",
  keywords: [
    "certifications",
    "achievements",
    "professional credentials",
    "technical certifications",
    "developer certifications",
    "programming certificates",
    "cloud certifications",
    "verified skills",
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
    ...CERTIFICATES_METADATA,
    noIndex: isPaginated,
  });
}

interface PageProps {
  searchParams: Promise<{
    page?: string;
    filter?: string;
  }>;
}

async function CertificatesContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number.parseInt(params.page || "1", 10));

  let certificates: Certificate[] = [];
  let totalPages = 1;
  let total = 0;

  try {
    // Fetch all certificates for pagination
    const allResponse = await certificatesAPI.getAllCertificates(1, 500);
    if (allResponse.status === 200 && allResponse.data) {
      const allCertificates = allResponse.data?.certifications || [];

      // Calculate pagination
      total = allCertificates.length;
      totalPages = Math.max(1, Math.ceil(total / PAGE_ITEMS_PER_PAGE));

      // Get current page slice
      const startIndex = (currentPage - 1) * PAGE_ITEMS_PER_PAGE;
      certificates = allCertificates.slice(
        startIndex,
        startIndex + PAGE_ITEMS_PER_PAGE,
      );
    }
  } catch (error) {
    console.error("Error fetching certificates:", error);
  }

  return (
    <div className="w-full relative z-10">
      {/* Server-rendered Header with Link-based pagination */}
      <ServerPageHeader
        title="Certifications & Awards"
        theme="purple"
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/certificates"
        resultCount={total}
        resultLabel="certifications"
      />

      {/* Certificates List Surface */}
      {certificates.length > 0 ? (
        <div className="bg-[#161311] border border-[#2f2923] rounded-2xl overflow-hidden divide-y divide-[#2f2923] shadow-xl">
          {certificates.map((certificate) => {
            const certificateId = certificate.inline?.id;
            if (!certificateId) return null;
            const dateRange = certificate.issue_date
              ? certificate.expiry_date
                ? `${certificate.issue_date} - ${certificate.expiry_date}`
                : `Issued: ${certificate.issue_date}`
              : undefined;

            const links: Array<{ label: string; url: string }> = [];
            if (certificate.certificate_url) {
              links.push({
                label: "View Certificate",
                url: certificate.certificate_url,
              });
            }

            return (
              <ListCard
                key={certificateId}
                id={certificateId}
                href={`/certificates/${certificateId}`}
                theme="purple"
                title={certificate.title}
                subtitle={certificate.issuer}
                description={certificate.description}
                dateRange={dateRange}
                technologies={certificate.skills}
                links={links}
                maxTechDisplay={5}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No certifications found"
          description="No certifications available at the moment"
          theme="purple"
        />
      )}
    </div>
  );
}

export default async function CertificatesPage({ searchParams }: PageProps) {
  return (
    <main className="flex-1 min-h-screen bg-[#0e0c0a] relative overflow-hidden">
      {/* Subtle Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-[#d9a55b]/5 rounded-full filter blur-3xl" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-[#e6b56c]/3 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10 max-w-7xl">
        <Suspense
          fallback={
            <LoadingStateLight
              message="Loading certifications..."
              variant="violet"
            />
          }
        >
          <CertificatesContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
