import type { MetadataRoute } from "next";
import {
  certificatesAPI,
  experiencesAPI,
  projectsAPI,
  volunteerAPI,
} from "@/static/api/api.request";
import { BaseURL } from "@/static/data";

export const revalidate = 3600;

function normalizeBaseUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function normalizePath(path: string): string {
  if (!path || path === "/") return "";
  return `/${path.replace(/^\/+|\/+$/g, "")}`;
}

function normalizeId(id: unknown): string | null {
  if (id === null || id === undefined) return null;
  const normalized = String(id).trim();
  if (!normalized || normalized === "undefined" || normalized === "null") {
    return null;
  }
  return normalized;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = normalizeBaseUrl(BaseURL);
  const routes: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  const addRoute = (
    path: string,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: number,
    lastModified = new Date(),
  ) => {
    const url = `${baseUrl}${normalizePath(path)}` || baseUrl;

    if (seen.has(url)) return;
    seen.add(url);

    routes.push({
      url,
      lastModified,
      changeFrequency,
      priority,
    });
  };

  addRoute("/", "weekly", 1.0);
  addRoute("/projects", "weekly", 0.9);
  addRoute("/experiences", "monthly", 0.8);
  addRoute("/certificates", "monthly", 0.7);
  addRoute("/volunteer", "monthly", 0.7);
  addRoute("/skills", "weekly", 0.9);
  addRoute("/skills/cli", "monthly", 0.8);
  addRoute("/links", "monthly", 0.9);
  addRoute("/contact", "yearly", 0.6);
  addRoute("/feed.xml", "monthly", 0.3);

  try {
    const [projectsRes, experiencesRes, certificatesRes, volunteersRes] =
      await Promise.all([
        projectsAPI
          .getAllProjects(1, 500)
          .catch(() => ({ data: { projects: [] } })),
        experiencesAPI
          .getAllExperiences(1, 500)
          .catch(() => ({ data: { experiences: [] } })),
        certificatesAPI
          .getAllCertificates(1, 500)
          .catch(() => ({ data: { certifications: [] } })),
        volunteerAPI
          .getAllVolunteers(1, 500)
          .catch(() => ({ data: { volunteer_experiences: [] } })),
      ]);

    if (projectsRes.data?.projects) {
      projectsRes.data.projects.forEach((project) => {
        const id = normalizeId(project.inline?.id);
        if (!id) return;

        addRoute(
          `/projects/${id}`,
          "monthly",
          0.8,
          project.inline?.updated_at
            ? new Date(project.inline.updated_at)
            : new Date(),
        );
      });
    }

    // Add experience routes
    if (experiencesRes.data?.experiences) {
      experiencesRes.data.experiences.forEach((experience) => {
        const id = normalizeId(experience.inline?.id);
        if (!id) return;

        addRoute(`/experiences/${id}`, "monthly", 0.7, new Date());
      });
    }

    // Add certificate routes
    if (certificatesRes.data?.certifications) {
      certificatesRes.data.certifications.forEach((certificate) => {
        const id = normalizeId(certificate.inline?.id);
        if (!id) return;

        addRoute(
          `/certificates/${id}`,
          "yearly",
          0.6,
          certificate.inline?.updated_at
            ? new Date(certificate.inline.updated_at)
            : new Date(),
        );
      });
    }

    if (volunteersRes.data?.volunteer_experiences) {
      volunteersRes.data.volunteer_experiences.forEach((volunteer) => {
        const id = normalizeId(volunteer.inline?.id);
        if (!id) return;

        addRoute(
          `/volunteer/${id}`,
          "yearly",
          0.6,
          volunteer.inline?.updated_at
            ? new Date(volunteer.inline.updated_at)
            : new Date(),
        );
      });
    }
  } catch (error) {
    console.error("Error generating dynamic sitemap entries:", error);
  }

  return routes;
}
