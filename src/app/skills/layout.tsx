import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Agent Skills & Runbooks",
  description:
    "Production-grade autonomous AI agent skills, deterministic runbooks, pre-commit reflexes, and safety protocols for Google Antigravity, Claude Code, Google Jules, and Cursor.",
  path: "/skills",
  keywords: [
    "AI Agent Skills",
    "Antigravity Skills",
    "Claude Code Skills",
    "Google Jules",
    "Cursor Skills",
    "Deterministic Workflows",
    "Autonomous Coding",
    "Developer Guardrails",
    "SKILL.md",
    "Shardendu Mishra",
    "AI Engineering",
    "Agent Workflows",
  ],
});

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 min-h-screen bg-transparent relative">
      <div className="container mx-auto px-4 py-6 relative z-10 max-w-7xl">
        {children}
      </div>
    </main>
  );
}
