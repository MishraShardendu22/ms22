import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { PaginationLinks } from "@/component/Pagination";
import {
  ContentGrid,
  SectionHeader,
  SectionWrapper,
} from "@/component/Section";
import { UnifiedCard } from "@/component/UnifiedCard";
import { certificatesAPI } from "@/static/api/api.request";
import type { Certificate } from "@/static/api/api.types";
import { CERTIFICATES_PER_PAGE } from "@/static/pagination";
import { formatDate } from "@/utils/formatDate";
import { stripMarkdown } from "@/utils/text";

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

export const CertificateCard = ({
  certificate,
  index,
}: CertificateCardProps) => {
  const issueDate = formatDate(certificate.issue_date, { fallback: "" });
  const certId = certificate.inline?.id;

  const badges = [];
  if (certificate.verified) {
    badges.push({
      label: "Verified",
      icon: <CheckCircle2 className="w-3 h-3" />,
    });
  }

  const extraInfo = (
    <>
      {certificate.expiry_date ? (
        <>
          <span>•</span>
          <span>
            Expires {formatDate(certificate.expiry_date, { fallback: "" })}
          </span>
        </>
      ) : (
        <>
          <span>•</span>
          <span className="text-[#d9a55b] font-medium">No Expiration</span>
        </>
      )}
    </>
  );

  const fullDescription = certificate.credential_id
    ? `${certificate.description || ""}\n\nCredential ID: ${certificate.credential_id}`.trim()
    : certificate.description;

  return (
    <UnifiedCard
      index={index}
      theme="emerald"
      title={certificate.title}
      subtitle={certificate.issuer}
      startDate={`Issued ${issueDate}`}
      description={stripMarkdown(fullDescription || "")}
      technologies={certificate.skills}
      certificateUrl={certificate.certificate_url}
      certificateLabel="Certificate"
      badges={badges}
      extraInfo={extraInfo}
      href={certId ? `/certificates/${certId}` : undefined}
    />
  );
};

const sortByOrder = (items: Certificate[]) =>
  [...items].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

// Mobile-optimized server component
export async function CertificatesDisplayMobile() {
  let certificates: Certificate[] = [];

  try {
    const response = await certificatesAPI.getAllCertificates(1, 4);
    certificates = sortByOrder(response.data?.certifications || []);
  } catch (error) {
    console.error("Error loading mobile certificates:", error);
    // Fallback to empty state when backend is rate-limited or unavailable.
  }

  if (certificates.length === 0) {
    return (
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold text-[#f3ebdd] mb-4">
          Certifications
        </h2>
        <p className="text-[#8e8374] text-sm">No certificates available</p>
      </section>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#f3ebdd]">Certifications</h2>
        <Link
          href="/certificates"
          className="text-sm text-[#8e8374] hover:text-[#d9a55b] transition-colors"
        >
          View All →
        </Link>
      </div>
      <p className="text-[#8e8374] text-sm mb-4">
        Professional certifications and credentials
      </p>
      <div className="space-y-4">
        {certificates.map((cert) => {
          const issueDate = formatDate(cert.issue_date, { fallback: "" });
          const certId = cert.inline?.id;

          return (
            <div
              key={certId}
              className="group relative bg-[#161311] border border-[#2f2923] rounded-xl p-4 hover:border-[#d9a55b]/40 transition-colors duration-200"
            >
              {certId && (
                <Link
                  href={`/certificates/${certId}`}
                  className="absolute inset-0 z-0"
                  aria-label={`View ${cert.title}`}
                />
              )}
              <h3 className="text-base font-bold text-[#f3ebdd] mb-1 line-clamp-1 group-hover:text-[#d9a55b] transition-colors relative z-10">
                {cert.title}
              </h3>
              <p className="text-sm text-[#b9ae9d] mb-2 relative z-10">
                {cert.issuer}
              </p>
              <p className="text-xs text-[#8e8374] mb-2 relative z-10">
                Issued {issueDate}
              </p>
              {cert.description && (
                <p className="text-sm text-[#8e8374] leading-relaxed mb-3 line-clamp-2 relative z-10">
                  {stripMarkdown(cert.description)}
                </p>
              )}
              <div className="flex items-center justify-between gap-2 relative z-10 pt-1">
                <div className="flex flex-wrap items-center gap-1.5 text-xs min-w-0 flex-1">
                  {cert.skills?.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-xs bg-[#1e1a16] text-[#b9ae9d] border border-[#2f2923] rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {(cert.skills?.length ?? 0) > 3 && (
                    <span className="px-2 py-0.5 text-xs bg-[#d9a55b]/10 text-[#d9a55b] border border-[#d9a55b]/20 rounded">
                      +{(cert.skills?.length ?? 0) - 3}
                    </span>
                  )}
                </div>
                {certId && (
                  <Link
                    href={`/certificates/${certId}`}
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

interface CertificatesDisplayServerProps {
  searchParams?: Promise<{ certificatesPage?: string }>;
}

export async function CertificatesDisplayServer({
  searchParams,
}: CertificatesDisplayServerProps) {
  const params = await searchParams;
  const page = Number(params?.certificatesPage) || 1;

  let certificates: Certificate[] = [];
  let totalPages = 1;
  let hasNext = false;
  let hasPrevious = false;

  try {
    const response = await certificatesAPI.getAllCertificates(
      page,
      CERTIFICATES_PER_PAGE,
    );
    certificates = sortByOrder(response.data?.certifications || []);
    totalPages = response.data?.total_pages || 1;
    hasNext = response.data?.has_next || false;
    hasPrevious = response.data?.has_previous || false;
  } catch (error) {
    console.error("Error loading certificates:", error);
    // Fallback to empty state when backend is rate-limited or unavailable.
  }

  const headerContent = (
    <SectionHeader
      title="Certifications"
      description="Professional certifications and achievements demonstrating expertise and continuous learning"
      theme="emerald"
    >
      <PaginationLinks
        currentPage={page}
        totalPages={totalPages}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        baseHref="/#certifications"
        theme="emerald"
        viewAllHref="/certificates"
        pageParam="certificatesPage"
      />
    </SectionHeader>
  );

  if (certificates.length === 0) {
    return (
      <SectionWrapper theme="emerald">
        {headerContent}
        <div className="py-12 flex items-center justify-center">
          <p className="text-lg text-gray-400">
            No certifications available to display
          </p>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper theme="emerald">
      {headerContent}
      <ContentGrid columns={2}>
        {certificates.map((certificate, index) => {
          const certId = certificate.inline?.id as string;
          return (
            <CertificateCard
              key={certId}
              certificate={certificate}
              index={index}
            />
          );
        })}
      </ContentGrid>
    </SectionWrapper>
  );
}
