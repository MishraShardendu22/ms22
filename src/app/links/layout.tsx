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
    <main className="flex-1 min-h-screen bg-transparent relative">
      <div className="container mx-auto px-4 py-6 relative z-10 max-w-7xl">
        {children}
      </div>
    </main>
  );
}
