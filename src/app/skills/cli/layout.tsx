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
