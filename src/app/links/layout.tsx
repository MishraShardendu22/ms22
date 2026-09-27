import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Links & Social Media",
  description:
    "Connect with Shardendu Mishra across all platforms - GitHub, LinkedIn, Twitter, Instagram, LeetCode, and explore my projects including blogs, treasure hunt game, and pixel art tool.",
  path: "/links",
  keywords: [
    "Shardendu Mishra Links",
    "Social Media Links",
    "Developer Links",
    "GitHub Profile",
    "LinkedIn Profile",
    "Twitter Profile",
    "Instagram",
    "LeetCode Profile",
    "Contact Shardendu Mishra",
    "Developer Portfolio Links",
    "Tech Blog",
    "Coding Projects",
    "Connect With Developer",
    "Social Links",
    "Link Tree",
    "All Social Links",
    "Professional Network",
    "Coding Platforms",
    "Developer Community",
  ],
});

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 min-h-screen bg-[#0e0c0a] relative overflow-hidden">
      {/* Subtle Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-[#d9a55b]/5 rounded-full filter blur-3xl" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-[#e6b56c]/3 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10 max-w-400">
        {children}
      </div>
    </main>
  );
}
