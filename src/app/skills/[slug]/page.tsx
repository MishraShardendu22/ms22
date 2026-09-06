import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillDetailView } from "@/component/Skills/SkillDetailView";
import {
  FALLBACK_SKILLS,
  fetchSkillRunbook,
  getAgentSkillsData,
} from "@/lib/agentSkills";
import { generatePageMetadata } from "@/lib/metadata";

export const revalidate = 120;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return FALLBACK_SKILLS.map((skill) => ({
    slug: skill.name,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { skills } = await getAgentSkillsData();
  const skill = skills.find((s) => s.name.toLowerCase() === slug.toLowerCase());

  if (!skill) {
    return generatePageMetadata({
      title: "Skill Not Found",
      description: "The requested agent skill was not found.",
      path: `/skills/${slug}`,
    });
  }

  return generatePageMetadata({
    title: `${skill.name} — Agent Skill`,
    description: skill.description,
    path: `/skills/${slug}`,
    keywords: [
      skill.name,
      skill.category,
      "Agent Skills",
      "SKILL.md",
      "Autonomous Agents",
      "Antigravity",
      "Claude Code",
      "Cursor",
    ],
  });
}

export default async function SkillDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { skills } = await getAgentSkillsData();
  const skill = skills.find((s) => s.name.toLowerCase() === slug.toLowerCase());

  if (!skill) {
    notFound();
  }

  const runbook = await fetchSkillRunbook(slug);
  const markdown =
    runbook?.markdown || `# ${skill.name}\n\n${skill.description}`;

  return <SkillDetailView skill={skill} markdown={markdown} />;
}
