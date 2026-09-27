import type { Metadata } from "next";
import { StructuredData } from "@/component/StructuredData";
import {
  generateBreadcrumbSchema,
  generateOrganizationSchema,
} from "@/lib/structuredData";
import { getCachedExperienceById } from "@/static/api/api.request";
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
    const response = await getCachedExperienceById(id);

    if (response.status === 200 && response.data) {
      const experience = response.data;
      const position =
        experience.experience_time_line?.[0]?.position || "Software Developer";
      const cleanDesc = stripMarkdown(experience.description || "");
      const description =
        `${position} at ${experience.company_name}. ${cleanDesc.slice(0, 100) || "Professional work experience by Shardendu Mishra."}`.slice(
          0,
          160,
        );

      return {
        title: `${experience.company_name} - ${position} | Experience`,
        description: description,
        keywords: [
          experience.company_name,
          position,
          ...(experience.technologies || []),
          "Shardendu Mishra",
          "Work Experience",
        ],
        openGraph: {
          title: `${experience.company_name} - ${position} | Shardendu Mishra`,
          description: description,
          url: `${baseUrl}/experiences/${id}`,
          siteName: "Shardendu Mishra Portfolio",
          type: "article",
          locale: "en_US",
          images: [
            {
              url: `${baseUrl}/opengraph-image`,
              width: 1200,
              height: 630,
              alt: `${experience.company_name} - Experience by Shardendu Mishra`,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: `${experience.company_name} - ${position} | Shardendu Mishra`,
          description: description,
          creator: "@Shardendu_M",
        },
        alternates: {
          canonical: `${baseUrl}/experiences/${id}`,
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
    title: "Experience Details | Shardendu Mishra",
    description:
      "View professional work experience details by Shardendu Mishra.",
    alternates: {
      canonical: `${baseUrl}/experiences`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ExperienceDetailLayout({
  params,
  children,
}: LayoutProps) {
  const { id } = await params;
  const baseUrl = BaseURL.endsWith("/") ? BaseURL.slice(0, -1) : BaseURL;

  let organizationSchema = null;
  let breadcrumbSchema = null;

  try {
    const response = await getCachedExperienceById(id);

    if (response.status === 200 && response.data) {
      const experience = response.data;
      const timeline = experience.experience_time_line?.[0];

      if (timeline) {
        organizationSchema = generateOrganizationSchema({
          name: experience.company_name,
          position: timeline.position,
          startDate: timeline.start_date,
          endDate: timeline.end_date,
          description: experience.description,
        });
      }

      breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: baseUrl },
        { name: "Experiences", url: `${baseUrl}/experiences` },
        {
          name: experience.company_name,
          url: `${baseUrl}/experiences/${id}`,
        },
      ]);
    }
  } catch (error) {
    console.error("Error generating structured data:", error);
  }

  return (
    <>
      {organizationSchema && breadcrumbSchema && (
        <StructuredData data={[organizationSchema, breadcrumbSchema]} />
      )}
      {children}
    </>
  );
}
