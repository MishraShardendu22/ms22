import { describe, expect, it } from "vitest";
import { generateMetadata as generateCertificatesMetadata } from "@/app/certificates/page";
import { generateMetadata as generateExperiencesMetadata } from "@/app/experiences/page";
import { generateMetadata as generateHomeMetadata } from "@/app/page";
import { generateMetadata as generateProjectsMetadata } from "@/app/projects/page";
import { generateMetadata as generateVolunteerMetadata } from "@/app/volunteer/page";

async function expectIndex(
  metadata: Awaited<ReturnType<typeof generateHomeMetadata>>,
  value: boolean,
) {
  const robots = metadata.robots as
    | { index?: boolean; follow?: boolean }
    | undefined;
  expect(robots?.index).toBe(value);
}

describe("pagination noindex behavior", () => {
  it("sets index: false for paginated list pages", async () => {
    const projectsMeta = await generateProjectsMetadata({
      searchParams: { page: "2" },
    });
    const experiencesMeta = await generateExperiencesMetadata({
      searchParams: { page: "2" },
    });
    const certificatesMeta = await generateCertificatesMetadata({
      searchParams: { page: "2" },
    });
    const volunteerMeta = await generateVolunteerMetadata({
      searchParams: { page: "2" },
    });

    await expectIndex(projectsMeta, false);
    await expectIndex(experiencesMeta, false);
    await expectIndex(certificatesMeta, false);
    await expectIndex(volunteerMeta, false);
  });

  it("sets index: true for first pages", async () => {
    const projectsMeta = await generateProjectsMetadata({ searchParams: {} });
    const experiencesMeta = await generateExperiencesMetadata({
      searchParams: {},
    });
    const certificatesMeta = await generateCertificatesMetadata({
      searchParams: {},
    });
    const volunteerMeta = await generateVolunteerMetadata({ searchParams: {} });

    await expectIndex(projectsMeta, true);
    await expectIndex(experiencesMeta, true);
    await expectIndex(certificatesMeta, true);
    await expectIndex(volunteerMeta, true);

    const projectsPage1 = await generateProjectsMetadata({
      searchParams: { page: "1" },
    });
    const homePage1 = await generateHomeMetadata({
      searchParams: { projectsPage: "1" },
    });
    await expectIndex(projectsPage1, true);
    await expectIndex(homePage1, true);
  });

  it("sets index: false for paginated home sections", async () => {
    const meta = await generateHomeMetadata({
      searchParams: { projectsPage: "2" },
    });

    await expectIndex(meta, false);
  });
});
