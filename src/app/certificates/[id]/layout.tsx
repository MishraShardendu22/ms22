import type { Metadata } from "next";
import { StructuredData } from "@/component/StructuredData";
import {
  generateBreadcrumbSchema,
  generateCertificationSchema,
} from "@/lib/structuredData";
import { getCachedCertificateById } from "@/static/api/api.request";
import { BaseURL } from "@/static/data";
import { stripMarkdown } from "@/utils/text";

interface LayoutProps {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { id } = await params;
  const baseUrl = BaseURL.endsWith("/") ? BaseURL.slice(0, -1) : BaseURL;

  try {
    const response = await getCachedCertificateById(id);

    if (response.status === 200 && response.data) {
      const certificate = response.data;
      const cleanDesc = stripMarkdown(certificate.description || "");
      const description =
        `${certificate.title} certification from ${certificate.issuer}. ${cleanDesc.slice(0, 80) || "Professional certification by Shardendu Mishra."}`.slice(
          0,
          160,
        );

      return {
        title: `${certificate.title} | Certifications`,
        description: description,
        keywords: [
          certificate.title,
          certificate.issuer,
          ...(certificate.skills || []),
          "Shardendu Mishra",
          "Certification",
        ],
        openGraph: {
          title: `${certificate.title} - ${certificate.issuer} | Shardendu Mishra`,
          description: description,
          url: `${baseUrl}/certificates/${id}`,
          siteName: "Shardendu Mishra Portfolio",
          type: "article",
          locale: "en_US",
          images: [
            {
              url: `${baseUrl}/opengraph-image`,
              width: 1200,
              height: 630,
              alt: `${certificate.title} - Certificate by Shardendu Mishra`,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: `${certificate.title} - ${certificate.issuer} | Shardendu Mishra`,
          description: description,
          creator: "@Shardendu_M",
        },
        alternates: {
          canonical: `${baseUrl}/certificates/${id}`,
        },
        robots: {
          index: true,
          follow: true,
          nocache: false,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return {
    title: "Certificate Details | Shardendu Mishra",
    description: "View professional certification details by Shardendu Mishra.",
    alternates: {
      canonical: `${baseUrl}/certificates`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CertificateDetailLayout({
  params,
  children,
}: LayoutProps) {
  const { id } = await params;
  const baseUrl = BaseURL.endsWith("/") ? BaseURL.slice(0, -1) : BaseURL;

  let certificationSchema = null;
  let breadcrumbSchema = null;

  try {
    const response = await getCachedCertificateById(id);

    if (response.status === 200 && response.data) {
      const certificate = response.data;

      certificationSchema = generateCertificationSchema({
        name: certificate.title,
        issuer: certificate.issuer,
        dateIssued: certificate.issue_date,
        credentialUrl: certificate.certificate_url,
        description: certificate.description,
      });

      breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: baseUrl },
        { name: "Certificates", url: `${baseUrl}/certificates` },
        { name: certificate.title, url: `${baseUrl}/certificates/${id}` },
      ]);
    }
  } catch (error) {
    console.error("Error generating structured data:", error);
  }

  return (
    <>
      {certificationSchema && breadcrumbSchema && (
        <StructuredData data={[certificationSchema, breadcrumbSchema]} />
      )}
      {children}
    </>
  );
}
