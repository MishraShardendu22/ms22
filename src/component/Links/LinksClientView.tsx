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
          <p className="text-sm text-gray-500 mt-1">
            <span className="text-violet-400 font-medium">
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900/80 hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white transition-all text-xs font-medium"
          >
            <QrCode className="w-3.5 h-3.5 text-gray-400" />
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
                ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                : "bg-gray-900/60 text-gray-400 hover:text-gray-200 border border-gray-800/80 hover:bg-gray-800/50"
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
                    ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                    : "bg-gray-900/60 text-gray-400 hover:text-gray-200 border border-gray-800/80 hover:bg-gray-800/50"
                }`}
              >
                {catTitle} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter links..."
            className="w-full pl-9 pr-8 py-1.5 rounded-lg bg-gray-900/80 border border-gray-800 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/60 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 p-0.5 cursor-pointer"
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
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 rounded-xl blur-sm opacity-0 group-hover:opacity-25 transition-all duration-500" />
                <div className="relative h-full p-5 bg-gray-900/95 backdrop-blur-sm border border-gray-800/70 rounded-xl group-hover:border-violet-500/40 transition-all duration-300 overflow-hidden flex flex-col shadow-lg group-hover:shadow-xl">
                  {/* Top Bar: Icon + Title + Category Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-gray-800/70 border border-gray-700/70 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-gray-300" />
                      </div>
                      <h2 className="text-sm sm:text-base font-bold text-white group-hover:text-violet-300 transition-colors truncate">
                        {link.name}
                      </h2>
                    </div>
                    <span className="px-2 py-0.5 bg-gray-800/80 text-gray-400 text-[11px] font-medium rounded-md border border-gray-700/70 shrink-0">
                      {categoryTitle}
                    </span>
                  </div>

                  {/* Handle / Username with 1-click copy */}
                  <div className="flex items-center justify-between gap-2 px-2.5 py-1 rounded bg-gray-950/80 border border-gray-800/80 mb-3">
                    <span className="text-xs font-mono text-gray-300 truncate">
                      {link.username}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(link.username, `username-${link.name}`)
                      }
                      className="text-gray-400 hover:text-white p-0.5 cursor-pointer shrink-0 transition-colors"
                      title="Copy handle"
                    >
                      {copiedKey === `username-${link.name}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed flex-1">
                    {link.description}
                  </p>

                  {/* Card Footer matching ListCard */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-800/70 mt-auto">
                    <span className="text-[11px] font-mono text-gray-500 group-hover:text-gray-400 truncate max-w-[150px]">
                      {link.url.replace(/^https?:\/\/(www\.)?/, "")}
                    </span>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-400 text-xs font-semibold group-hover:translate-x-1 transition-all duration-300 shrink-0 flex items-center gap-1"
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
        <div className="text-center py-16 px-4 bg-gray-900/40 border border-gray-800/60 rounded-xl mb-12">
          <Search className="w-8 h-8 text-gray-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">
            No matching links found
          </h3>
          <p className="text-xs text-gray-400 mb-4">
            Try adjusting your search query or switching category tabs.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Direct Mobile Connect Card - Disciplined and consistent with CLI guide cards */}
      <section
        id="qr-connect"
        aria-label="Direct Mobile Connect"
        className="p-5 rounded-xl bg-gray-900/95 border border-gray-800/70 shadow-lg mb-12"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left min-w-0 flex-1">
            <span className="px-2.5 py-0.5 bg-gray-800/80 text-gray-300 text-[11px] font-medium rounded-md border border-gray-700/70 inline-block mb-2">
              Mobile Connect
            </span>
            <h2 className="text-base font-bold text-white mb-1">
              Direct Identity &amp; Contact Card
            </h2>
            <p className="text-xs text-gray-400 max-w-xl leading-relaxed mb-4">
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white border border-gray-700 text-xs font-medium transition-colors cursor-pointer"
              >
                {copiedKey === "gravatar-link" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">URL Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Gravatar URL</span>
                  </>
                )}
              </button>
              <a
                href="https://gravatar.com/personahonestly8a347f9823"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors"
              >
                <span>Gravatar Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="shrink-0 p-3 rounded-xl bg-gray-950 border border-gray-800 flex flex-col items-center">
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
            <span className="text-[11px] font-mono text-gray-400 mt-2">
              @Shardendu_Mishra
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
