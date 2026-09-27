"use client";

import {
  ArrowUpRight,
  Check,
  Copy,
  Globe,
  QrCode,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  DiscordIcon,
  GitHubIcon,
  InstagramIcon,
  LeetCodeIcon,
  LinkedInIcon,
  RedditIcon,
  TelegramIcon,
  TwitterXIcon,
  YouTubeIcon,
} from "@/component/Icons";
import {
  CDN_SHARDENDU_QR_AVIF,
  LINK_CATEGORIES,
  SOCIAL_LINKS,
} from "@/constants";

function getSocialLinkIcon(
  name: string,
): React.ComponentType<{ className?: string }> {
  switch (name) {
    case "Portfolio":
      return Globe;
    case "GitHub":
    case "GitHub Alt":
      return GitHubIcon;
    case "LinkedIn":
      return LinkedInIcon;
    case "Twitter / X":
      return TwitterXIcon;
    case "Instagram":
      return InstagramIcon;
    case "Reddit":
      return RedditIcon;
    case "Telegram":
      return TelegramIcon;
    case "Discord":
      return DiscordIcon;
    case "YouTube":
      return YouTubeIcon;
    case "LeetCode":
      return LeetCodeIcon;
    default:
      return Globe;
  }
}

export function LinksClientView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const filteredLinks = useMemo(() => {
    return SOCIAL_LINKS.filter((link) => {
      const matchesCategory =
        selectedCategory === "all" || link.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        link.name.toLowerCase().includes(query) ||
        link.username.toLowerCase().includes(query) ||
        link.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: SOCIAL_LINKS.length,
      social: 0,
      projects: 0,
      coding: 0,
    };
    for (const link of SOCIAL_LINKS) {
      if (counts[link.category] !== undefined) {
        counts[link.category]++;
      }
    }
    return counts;
  }, []);

  return (
    <div className="w-full relative z-10">
      {/* Header matching ServerPageHeader */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white font-heading">
            Links &amp; Profiles
          </h1>
          <p className="text-sm text-[#8e8374] mt-1">
            <span className="text-[#d9a55b] font-medium">
              {filteredLinks.length}
            </span>{" "}
            {filteredLinks.length === 1 ? "link" : "links"}
            {selectedCategory !== "all"
              ? ` in ${LINK_CATEGORIES[selectedCategory as keyof typeof LINK_CATEGORIES] || selectedCategory}`
              : ` across ${Object.keys(LINK_CATEGORIES).length} categories`}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <a
            href="#qr-connect"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161311] hover:bg-[#1e1a16] border border-[#2f2923] text-[#b9ae9d] hover:text-[#f3ebdd] transition-all text-xs font-medium"
          >
            <QrCode className="w-3.5 h-3.5 text-[#d9a55b]" />
            <span>QR Connect</span>
          </a>
        </div>
      </div>

      {/* Category Filter Pills & Search Input */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[#d9a55b]/20 text-[#d9a55b] border border-[#d9a55b]/40 font-semibold"
                : "bg-[#161311] text-[#b9ae9d] hover:text-[#f3ebdd] border border-[#2f2923] hover:bg-[#1e1a16]"
            }`}
          >
            All ({categoryCounts.all})
          </button>
          {Object.entries(LINK_CATEGORIES).map(([catKey, catTitle]) => {
            const count = categoryCounts[catKey] ?? 0;
            const isSelected = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                type="button"
                onClick={() => setSelectedCategory(catKey)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#d9a55b]/20 text-[#d9a55b] border border-[#d9a55b]/40 font-semibold"
                    : "bg-[#161311] text-[#b9ae9d] hover:text-[#f3ebdd] border border-[#2f2923] hover:bg-[#1e1a16]"
                }`}
              >
                {catTitle} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8e8374]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter links..."
            className="w-full pl-9 pr-8 py-1.5 rounded-lg bg-[#161311] border border-[#2f2923] text-xs text-[#f3ebdd] placeholder-[#8e8374] focus:outline-none focus:border-[#d9a55b] focus:ring-1 focus:ring-[#d9a55b]/30 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8e8374] hover:text-[#f3ebdd] p-0.5 cursor-pointer"
              title="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Links Grid - Aligned to portfolio native ListCard 4-column responsive layout */}
      {filteredLinks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
          {filteredLinks.map((link) => {
            const Icon = getSocialLinkIcon(link.name);
            const categoryTitle =
              LINK_CATEGORIES[link.category as keyof typeof LINK_CATEGORIES] ||
              link.category;

            return (
              <div
                key={`${link.name}-${link.url}`}
                className="group relative block h-full"
              >
                <div className="absolute -inset-0.5 bg-[#d9a55b]/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative h-full p-5 bg-[#161311] backdrop-blur-sm border border-[#2f2923] rounded-xl group-hover:border-[#d9a55b]/40 transition-all duration-300 overflow-hidden flex flex-col shadow-lg">
                  {/* Top Bar: Icon + Title + Category Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#1e1a16] border border-[#2f2923] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#d9a55b]" />
                      </div>
                      <h2 className="text-sm sm:text-base font-bold text-[#f3ebdd] group-hover:text-[#d9a55b] transition-colors truncate">
                        {link.name}
                      </h2>
                    </div>
                    <span className="px-2 py-0.5 bg-[#1e1a16] text-[#b9ae9d] text-[11px] font-medium rounded-md border border-[#2f2923] shrink-0">
                      {categoryTitle}
                    </span>
                  </div>

                  {/* Handle / Username with 1-click copy */}
                  <div className="flex items-center justify-between gap-2 px-2.5 py-1 rounded bg-[#1e1a16] border border-[#2f2923] mb-3">
                    <span className="text-xs font-mono text-[#b9ae9d] truncate">
                      {link.username}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(link.username, `username-${link.name}`)
                      }
                      className="text-[#8e8374] hover:text-[#f3ebdd] p-0.5 cursor-pointer shrink-0 transition-colors"
                      title="Copy handle"
                    >
                      {copiedKey === `username-${link.name}` ? (
                        <Check className="w-3.5 h-3.5 text-[#4caf7d]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-[#8e8374] text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed flex-1">
                    {link.description}
                  </p>

                  {/* Card Footer matching ListCard */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#2f2923] mt-auto">
                    <span className="text-[11px] font-mono text-[#8e8374] group-hover:text-[#b9ae9d] truncate max-w-[150px]">
                      {link.url.replace(/^https?:\/\/(www\.)?/, "")}
                    </span>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#d9a55b] hover:text-[#e6b56c] text-xs font-semibold shrink-0 flex items-center gap-1 transition-colors"
                    >
                      <span>Open</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-[#161311] border border-[#2f2923] rounded-xl mb-12">
          <Search className="w-8 h-8 text-[#8e8374] mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#f3ebdd] mb-1">
            No matching links found
          </h3>
          <p className="text-xs text-[#8e8374] mb-4">
            Try adjusting your search query or switching category tabs.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="px-3.5 py-1.5 rounded-lg bg-[#d9a55b] hover:bg-[#e6b56c] text-[#0e0c0a] text-xs font-semibold transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Direct Mobile Connect Card - Disciplined and consistent with CLI guide cards */}
      <section
        id="qr-connect"
        aria-label="Direct Mobile Connect"
        className="p-5 rounded-xl bg-[#161311] border border-[#2f2923] shadow-lg mb-12"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left min-w-0 flex-1">
            <span className="px-2.5 py-0.5 bg-[#1e1a16] text-[#b9ae9d] text-[11px] font-medium rounded-md border border-[#2f2923] inline-block mb-2">
              Mobile Connect
            </span>
            <h2 className="text-base font-bold text-[#f3ebdd] mb-1">
              Direct Identity &amp; Contact Card
            </h2>
            <p className="text-xs text-[#8e8374] max-w-xl leading-relaxed mb-4">
              Scan with a smartphone camera to access verified Gravatar profile,
              identity credentials, and synced contact details on mobile.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    "https://gravatar.com/personahonestly8a347f9823",
                    "gravatar-link",
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1a16] hover:bg-[#27221c] text-[#f3ebdd] border border-[#2f2923] text-xs font-medium transition-colors cursor-pointer"
              >
                {copiedKey === "gravatar-link" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#4caf7d]" />
                    <span className="text-[#4caf7d]">URL Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#d9a55b]" />
                    <span>Copy Gravatar URL</span>
                  </>
                )}
              </button>
              <a
                href="https://gravatar.com/personahonestly8a347f9823"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#d9a55b] hover:bg-[#e6b56c] text-[#0e0c0a] text-xs font-semibold transition-colors"
              >
                <span>Gravatar Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="shrink-0 p-3 rounded-xl bg-[#0e0c0a] border border-[#2f2923] flex flex-col items-center">
            <div className="bg-white p-2 rounded-lg">
              <Image
                src={CDN_SHARDENDU_QR_AVIF}
                alt="Shardendu Mishra Gravatar QR Code"
                width={112}
                height={112}
                className="w-28 h-28 object-contain"
                loading="lazy"
              />
            </div>
            <span className="text-[11px] font-mono text-[#8e8374] mt-2">
              @Shardendu_Mishra
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
