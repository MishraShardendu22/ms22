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
    <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 -left-10 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-screen filter blur-3xl" />
        <div className="absolute top-1/3 -right-10 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl" />
      </div>
      <div className="relative z-10">{children}</div>
    </main>
  );
}
