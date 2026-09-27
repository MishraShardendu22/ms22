import type { Metadata } from "next";
import { StructuredData } from "@/component/StructuredData";
import {
  generateBreadcrumbSchema,
  generateProjectSchema,
} from "@/lib/structuredData";
import { getCachedProjectById } from "@/static/api/api.request";
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
    const response = await getCachedProjectById(id);

    if (response.status === 200 && response.data) {
      const project = response.data;
      const cleanDesc = stripMarkdown(
        project.small_description || project.description || "",
      );
      const description =
        `${project.project_name} - ${cleanDesc.slice(0, 120) || "A software project by Shardendu Mishra."}`.slice(
          0,
          160,
        );

      return {
        title: `${project.project_name} | Projects`,
        description: description,
        keywords: [
          project.project_name,
          ...(project.skills || []),
          "Shardendu Mishra",
          "Project",
          "Portfolio",
        ],
        openGraph: {
          title: `${project.project_name} | Shardendu Mishra`,
          description: description,
          url: `${baseUrl}/projects/${id}`,
          siteName: "Shardendu Mishra Portfolio",
          type: "article",
          locale: "en_US",
          images: [
            {
              url: `${baseUrl}/opengraph-image`,
              width: 1200,
              height: 630,
              alt: `${project.project_name} - Project by Shardendu Mishra`,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: `${project.project_name} | Shardendu Mishra`,
          description: description,
          creator: "@Shardendu_M",
        },
        alternates: {
          canonical: `${baseUrl}/projects/${id}`,
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
    title: "Project Details | Shardendu Mishra",
    description: "View software project details by Shardendu Mishra.",
    alternates: {
      canonical: `${baseUrl}/projects`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProjectDetailLayout({
  params,
  children,
}: LayoutProps) {
  const { id } = await params;
  const baseUrl = BaseURL.endsWith("/") ? BaseURL.slice(0, -1) : BaseURL;

  let projectSchema = null;
  let breadcrumbSchema = null;

  try {
    const response = await getCachedProjectById(id);

    if (response.status === 200 && response.data) {
      const project = response.data;

      projectSchema = generateProjectSchema({
        name: project.project_name,
        description: project.small_description || project.description,
        url: project.project_repository,
        dateCreated: project.inline?.created_at,
        technologies: project.skills,
      });

      breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: baseUrl },
        { name: "Projects", url: `${baseUrl}/projects` },
        { name: project.project_name, url: `${baseUrl}/projects/${id}` },
      ]);
    }
  } catch (error) {
    console.error("Error generating structured data:", error);
  }

  return (
    <>
      {projectSchema && breadcrumbSchema && (
        <StructuredData data={[projectSchema, breadcrumbSchema]} />
      )}
      {children}
    </>
  );
}
