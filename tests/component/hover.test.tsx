import type React from "react";
import { describe, expect, it } from "vitest";
import { ImageContainer } from "@/component/Hero/ImageContainer";
import { TextContent } from "@/component/Hero/TextContent";
import { ProjectCard } from "@/component/Projects/ProjectCardServer";
import type { Project } from "@/static/api/api.types";

// Type guard for React elements with props
const hasClassNameProp = (
  child: unknown,
): child is { props: { className?: string; children?: unknown[] } } => {
  return (
    typeof child === "object" &&
    child !== null &&
    "props" in child &&
    typeof (child as { props?: unknown }).props === "object" &&
    (child as { props?: unknown }).props !== null
  );
};

describe("Hover Translation Effects", () => {
  it("should not contain levitation (translate-y) effects on hover in ImageContainer", () => {
    const element = ImageContainer();

    // Find the child div containing the image-container class
    const containerDiv = element.props.children.find(
      (child: React.ReactNode) =>
        hasClassNameProp(child) &&
        child.props.className?.includes("image-container"),
    );

    expect(containerDiv).toBeDefined();
    if (!hasClassNameProp(containerDiv)) return;
    const className = containerDiv.props.className;
    expect(className).not.toContain("hover:-translate-y-");
    expect(className).not.toContain("hover:translate-y-");
  });

  it("should not contain levitation (translate-y) effects on hover in TextContent social links", () => {
    const element = TextContent();

    // Find the container div for social links
    const socialLinksDiv = element.props.children.find(
      (child: React.ReactNode) =>
        hasClassNameProp(child) && child.props.className?.includes("flex"),
    );

    expect(socialLinksDiv).toBeDefined();
    if (!hasClassNameProp(socialLinksDiv)) return;

    // Check every anchor child
    const anchors = socialLinksDiv.props.children;
    if (!Array.isArray(anchors)) return;
    expect(anchors.length).toBeGreaterThan(0);

    for (const anchor of anchors) {
      if (!hasClassNameProp(anchor)) continue;
      const className = anchor.props.className;
      expect(className).not.toContain("hover:-translate-y-");
      expect(className).not.toContain("hover:translate-y-");
    }
  });

  it("should not contain levitation (translate-y) effects on hover in ProjectCard", () => {
    const dummyProject: Partial<Project> = {
      project_name: "Test Project",
      small_description: "A small description",
      skills: ["React", "TypeScript"],
      project_repository: "https://github.com",
      project_live_link: "https://example.com",
    };

    const element = ProjectCard({ project: dummyProject as Project, index: 0 });

    // Evaluate the UnifiedCard component to inspect its JSX structure
    const unifiedCardElement =
      typeof element.type === "function"
        ? element.type(element.props)
        : element;

    // Find the inner card div which is the direct child of the outer animation div
    const cardDiv = unifiedCardElement.props.children;

    expect(cardDiv).toBeDefined();
    if (!hasClassNameProp(cardDiv)) return;
    const className = cardDiv.props.className;
    expect(className).not.toContain("hover:-translate-y-");
    expect(className).not.toContain("hover:translate-y-");
  });

  it("should not contain levitation (translate-y) effects on hover in ListCard", async () => {
    const { ListCard } = await import("@/component/Section/ListCard");
    const element = ListCard({
      id: "test-skill",
      href: "/skills/test-skill",
      theme: "violet",
      title: "Test Skill",
      description: "Test description",
      technologies: ["SKILL.md"],
    });

    expect(element).toBeDefined();
    expect(element.props.className).not.toContain("hover:-translate-y-");
    expect(element.props.className).not.toContain("hover:translate-y-");
  });
});

