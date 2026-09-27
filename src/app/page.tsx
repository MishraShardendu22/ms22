import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { FooterSection, FooterSectionMobile } from "@/component/Footer/Footer";
import { HeroSection } from "@/component/Hero/HeroSectionWrapper";
import { LoadingStateLight } from "@/component/Loading";
import { StatsLoadingSkeleton } from "@/component/Stats";
import { StructuredData } from "@/component/StructuredData";
import { getIsMobile } from "@/lib/isMobile";

const Time = dynamic(() =>
  import("@/component/Timeline/Time").then((mod) => mod.Time),
);
const StatsSection = dynamic(() =>
  import("@/component/Stats").then((mod) => mod.StatsSection),
);
const ProjectsDisplayServer = dynamic(() =>
  import("@/component/Projects").then((mod) => mod.ProjectsDisplayServer),
);
const ProjectsDisplayMobile = dynamic(() =>
  import("@/component/Projects").then((mod) => mod.ProjectsDisplayMobile),
);
const ExperiencesDisplayServer = dynamic(() =>
  import("@/component/Experience").then((mod) => mod.ExperiencesDisplayServer),
);
const ExperiencesDisplayMobile = dynamic(() =>
  import("@/component/Experience").then((mod) => mod.ExperiencesDisplayMobile),
);
const VolunteerDisplayServer = dynamic(() =>
  import("@/component/Volunteer").then((mod) => mod.VolunteerDisplayServer),
);
const VolunteerDisplayMobile = dynamic(() =>
  import("@/component/Volunteer").then((mod) => mod.VolunteerDisplayMobile),
);
const CertificatesDisplayServer = dynamic(() =>
  import("@/component/Certificates").then(
    (mod) => mod.CertificatesDisplayServer,
  ),
);
const CertificatesDisplayMobile = dynamic(() =>
  import("@/component/Certificates").then(
    (mod) => mod.CertificatesDisplayMobile,
  ),
);

import { generatePageMetadata } from "@/lib/metadata";
import {
  generateFAQSchema,
  generatePersonSchema,
  generateProfessionalServiceSchema,
  generateProfilePageSchema,
  generateWebSiteSchema,
} from "@/lib/structuredData";

const HOME_METADATA = {
  title: "Shardendu Mishra | Software Developer and Engineer",
  description:
    "Software Developer specializing in Go, React, Next.js & TypeScript. Explore projects, experience, certifications, volunteer work, and contact details.",
  path: "/",
  keywords: [
    "Shardendu Mishra",
    "Software Developer",
    "Portfolio",
    "Projects",
    "Experience",
    "Certifications",
    "Volunteer",
    "Contact",
  ],
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams?:
    | Promise<{
        projectsPage?: string;
        experiencesPage?: string;
        volunteerPage?: string;
        certificatesPage?: string;
      }>
    | {
        projectsPage?: string;
        experiencesPage?: string;
        volunteerPage?: string;
        certificatesPage?: string;
      };
}): Promise<Metadata> {
  const params = searchParams ? await searchParams : undefined;
  const parsePage = (val?: string) => {
    const num = Number.parseInt(val || "1", 10);
    return !Number.isNaN(num) && num > 1;
  };
  const hasPageParams = Boolean(
    parsePage(params?.projectsPage) ||
      parsePage(params?.experiencesPage) ||
      parsePage(params?.volunteerPage) ||
      parsePage(params?.certificatesPage),
  );

  return generatePageMetadata({
    ...HOME_METADATA,
    noIndex: hasPageParams,
  });
}

interface PageProps {
  searchParams: Promise<{
    page?: string;
    projectsPage?: string;
    experiencesPage?: string;
    volunteerPage?: string;
    certificatesPage?: string;
  }>;
}

const page = async ({ searchParams }: PageProps) => {
  const isMobile = await getIsMobile();
  const faqSchema = generateFAQSchema();
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebSiteSchema();
  const profilePageSchema = generateProfilePageSchema();
  const professionalServiceSchema = generateProfessionalServiceSchema();

  return (
    <>
      <StructuredData
        data={[
          personSchema,
          websiteSchema,
          professionalServiceSchema,
          profilePageSchema,
          faqSchema,
        ]}
      />
      <main className="flex-1 lg:ml-0" aria-label="Main content">
        <HeroSection />
        {!isMobile && (
          <section
            id="timeline"
            className="hidden lg:block"
            aria-label="Professional timeline"
          >
            <Suspense
              fallback={
                <LoadingStateLight
                  message="Loading timeline..."
                  variant="blue"
                />
              }
            >
              <Time />
            </Suspense>
          </section>
        )}
        <section id="projects" aria-label="Featured projects and work">
          <Suspense
            fallback={
              <LoadingStateLight
                message="Loading projects..."
                variant="violet"
              />
            }
          >
            {isMobile ? (
              <ProjectsDisplayMobile />
            ) : (
              <ProjectsDisplayServer searchParams={searchParams} />
            )}
          </Suspense>
        </section>
        <section id="experience" aria-label="Professional experience">
          <Suspense
            fallback={
              <LoadingStateLight
                message="Loading experiences..."
                variant="blue"
              />
            }
          >
            {isMobile ? (
              <ExperiencesDisplayMobile />
            ) : (
              <ExperiencesDisplayServer searchParams={searchParams} />
            )}
          </Suspense>
        </section>
        <section id="volunteer" aria-label="Volunteer experience">
          <Suspense
            fallback={
              <LoadingStateLight
                message="Loading volunteer experiences..."
                variant="pink"
              />
            }
          >
            {isMobile ? (
              <VolunteerDisplayMobile />
            ) : (
              <VolunteerDisplayServer searchParams={searchParams} />
            )}
          </Suspense>
        </section>
        <section id="certifications" aria-label="Professional certifications">
          <Suspense
            fallback={
              <LoadingStateLight
                message="Loading certifications..."
                variant="emerald"
              />
            }
          >
            {isMobile ? (
              <CertificatesDisplayMobile />
            ) : (
              <CertificatesDisplayServer searchParams={searchParams} />
            )}
          </Suspense>
        </section>
        {!isMobile && (
          <section className="hidden lg:block" aria-label="Coding statistics">
            <Suspense fallback={<StatsLoadingSkeleton />}>
              <StatsSection />
            </Suspense>
          </section>
        )}
        <footer id="contact">
          {isMobile ? <FooterSectionMobile /> : <FooterSection />}
        </footer>
      </main>
    </>
  );
};

export default page;
