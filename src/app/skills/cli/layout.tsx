import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "skills-sync CLI Tool Guide & Documentation",
  description:
    "Complete documentation and installation guide for skills-sync — the autonomous AI agent skills cross-repository synchronization engine by Shardendu Mishra.",
  path: "/skills/cli",
  keywords: [
    "skills-sync",
    "skills-sync cli",
    "agent skills sync",
    "AI agent skills CLI",
    "cross repository sync",
    "SKILL.md",
    "Shardendu Mishra",
    "Antigravity skills sync",
    "developer CLI tools",
  ],
});

export default function SkillsCliLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Subtle Background matching portfolio */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-violet-500/8 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-500/8 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>
      <div className="container mx-auto px-4 py-6 relative z-10 max-w-400">
        {children}
      </div>
    </main>
  );
}
