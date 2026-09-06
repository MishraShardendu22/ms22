"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Check,
  Compass,
  Copy,
  Database,
  Globe,
  QrCode,
  Search,
  Share2,
  Sparkles,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
  CDN_PROFESSIONAL_AVIF,
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
    case "Gravatar":
      return User;
    case "LeetCode":
      return LeetCodeIcon;
    case "Tech Blog":
      return BookOpen;
    case "Treasure Hunt Game":
      return Compass;
    case "Pixel Art 8-Bit":
      return Sparkles;
    case "GitHub Backup Observatory":
      return Database;
    default:
      return Globe;
  }
}

// Brand accent colors for platform icons and hover glows
const PLATFORM_THEMES: Record<
  string,
  {
    iconBg: string;
    iconColor: string;
    borderHover: string;
    glowColor: string;
    badgeBg: string;
    badgeText: string;
  }
> = {
  Portfolio: {
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    borderHover: "hover:border-violet-500/50",
    glowColor: "group-hover:shadow-violet-500/10",
    badgeBg: "bg-violet-500/10 border-violet-500/20",
    badgeText: "text-violet-300",
  },
  GitHub: {
    iconBg: "bg-gray-800/80",
    iconColor: "text-gray-200",
    borderHover: "hover:border-gray-600",
    glowColor: "group-hover:shadow-gray-500/10",
    badgeBg: "bg-gray-800/60 border-gray-700/40",
    badgeText: "text-gray-300",
  },
  "GitHub Alt": {
    iconBg: "bg-gray-800/80",
    iconColor: "text-gray-300",
    borderHover: "hover:border-gray-600",
    glowColor: "group-hover:shadow-gray-500/10",
    badgeBg: "bg-gray-800/60 border-gray-700/40",
    badgeText: "text-gray-300",
  },
  LinkedIn: {
    iconBg: "bg-blue-600/10",
    iconColor: "text-blue-400",
    borderHover: "hover:border-blue-500/50",
    glowColor: "group-hover:shadow-blue-500/10",
    badgeBg: "bg-blue-500/10 border-blue-500/20",
    badgeText: "text-blue-300",
  },
  "Twitter / X": {
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-400",
    borderHover: "hover:border-sky-500/50",
    glowColor: "group-hover:shadow-sky-500/10",
    badgeBg: "bg-sky-500/10 border-sky-500/20",
    badgeText: "text-sky-300",
  },
  Instagram: {
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-400",
    borderHover: "hover:border-pink-500/50",
    glowColor: "group-hover:shadow-pink-500/10",
    badgeBg: "bg-pink-500/10 border-pink-500/20",
    badgeText: "text-pink-300",
  },
  Reddit: {
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-400",
    borderHover: "hover:border-orange-500/50",
    glowColor: "group-hover:shadow-orange-500/10",
    badgeBg: "bg-orange-500/10 border-orange-500/20",
    badgeText: "text-orange-300",
  },
  Telegram: {
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-300",
    borderHover: "hover:border-sky-400/50",
    glowColor: "group-hover:shadow-sky-400/10",
    badgeBg: "bg-sky-500/10 border-sky-500/20",
    badgeText: "text-sky-300",
  },
  Discord: {
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-400",
    borderHover: "hover:border-indigo-500/50",
    glowColor: "group-hover:shadow-indigo-500/10",
    badgeBg: "bg-indigo-500/10 border-indigo-500/20",
    badgeText: "text-indigo-300",
  },
  YouTube: {
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
    borderHover: "hover:border-red-500/50",
    glowColor: "group-hover:shadow-red-500/10",
    badgeBg: "bg-red-500/10 border-red-500/20",
    badgeText: "text-red-300",
  },
  Gravatar: {
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    borderHover: "hover:border-cyan-500/50",
    glowColor: "group-hover:shadow-cyan-500/10",
    badgeBg: "bg-cyan-500/10 border-cyan-500/20",
    badgeText: "text-cyan-300",
  },
  LeetCode: {
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    borderHover: "hover:border-amber-500/50",
    glowColor: "group-hover:shadow-amber-500/10",
    badgeBg: "bg-amber-500/10 border-amber-500/20",
    badgeText: "text-amber-300",
  },
  "Tech Blog": {
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    borderHover: "hover:border-emerald-500/50",
    glowColor: "group-hover:shadow-emerald-500/10",
    badgeBg: "bg-emerald-500/10 border-emerald-500/20",
    badgeText: "text-emerald-300",
  },
  "Treasure Hunt Game": {
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
    borderHover: "hover:border-purple-500/50",
    glowColor: "group-hover:shadow-purple-500/10",
    badgeBg: "bg-purple-500/10 border-purple-500/20",
    badgeText: "text-purple-300",
  },
  "Pixel Art 8-Bit": {
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-400",
    borderHover: "hover:border-rose-500/50",
    glowColor: "group-hover:shadow-rose-500/10",
    badgeBg: "bg-rose-500/10 border-rose-500/20",
    badgeText: "text-rose-300",
  },
  "GitHub Backup Observatory": {
    iconBg: "bg-teal-500/10",
    iconColor: "text-teal-400",
    borderHover: "hover:border-teal-500/50",
    glowColor: "group-hover:shadow-teal-500/10",
    badgeBg: "bg-teal-500/10 border-teal-500/20",
    badgeText: "text-teal-300",
  },
};

const DEFAULT_THEME = {
  iconBg: "bg-violet-500/10",
  iconColor: "text-violet-400",
  borderHover: "hover:border-violet-500/50",
  glowColor: "group-hover:shadow-violet-500/10",
  badgeBg: "bg-violet-500/10 border-violet-500/20",
  badgeText: "text-violet-300",
};

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

  const handleShare = async () => {
    const shareData = {
      title: "Shardendu Mishra - Developer Links & Profiles",
      text: "Connect with Shardendu Mishra across social media, developer platforms, and projects.",
      url: window.location.href,
    };

    if (
      typeof navigator !== "undefined" &&
      navigator.share &&
      navigator.canShare?.(shareData)
    ) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    handleCopy(window.location.href, "share-page");
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
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Top Breadcrumb & Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center justify-between mb-8"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gray-900/60 hover:bg-gray-800/80 border border-gray-800 text-gray-400 hover:text-white transition-all text-sm font-medium group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gray-900/60 hover:bg-gray-800/80 border border-gray-800 text-gray-300 hover:text-white transition-all text-sm font-medium cursor-pointer"
            title="Share profile link"
          >
            {copiedKey === "share-page" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-gray-400" />
                <span>Share Hub</span>
              </>
            )}
          </button>
          <a
            href="#qr-connect"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 text-violet-300 hover:text-violet-200 transition-all text-sm font-medium"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Scan QR</span>
          </a>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative bg-gradient-to-b from-gray-900/90 via-gray-900/50 to-gray-950/80 border border-gray-800/80 rounded-3xl p-6 sm:p-8 md:p-10 mb-10 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Subtle accent glow inside hero */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 text-center md:text-left">
          {/* Avatar with status ring */}
          <div className="relative shrink-0">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden ring-2 ring-violet-500/30 shadow-2xl bg-gray-900">
              <Image
                src={CDN_PROFESSIONAL_AVIF}
                alt="Shardendu Mishra"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            {/* Online/Available indicator */}
            <div
              className="absolute -bottom-1 -right-1 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-900/90 border border-emerald-500/40 text-[10px] text-emerald-400 font-medium shadow-md"
              title="Available for collaboration and opportunities"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available</span>
            </div>
          </div>

          {/* Profile text */}
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300 mb-3">
              <Sparkles className="w-3 h-3 text-violet-400" />
              <span>Connect & Social Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
              Shardendu Mishra
            </h1>
            <p className="text-base sm:text-lg text-gray-300 font-medium mb-2">
              Software Developer & Engineer{" "}
              <span className="text-gray-600 font-normal">|</span> IIIT Dharwad
            </p>
            <p className="text-sm text-gray-400 max-w-2xl leading-relaxed mb-5">
              Building high-performance software with Go, React, Next.js, and
              cloud-native technologies. Connect with me across GitHub,
              LinkedIn, technical blogs, and open-source ecosystems.
            </p>

            {/* Metric Pills */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-xs text-gray-300">
              <div className="px-3 py-1 rounded-lg bg-gray-800/60 border border-gray-700/50 flex items-center gap-1.5">
                <span className="font-bold text-violet-400">
                  {SOCIAL_LINKS.length}
                </span>
                <span>Verified Links</span>
              </div>
              <div className="px-3 py-1 rounded-lg bg-gray-800/60 border border-gray-700/50 flex items-center gap-1.5">
                <span className="font-bold text-cyan-400">3</span>
                <span>Categories</span>
              </div>
              <div className="px-3 py-1 rounded-lg bg-gray-800/60 border border-gray-700/50 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Open Source Contributor</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filter and Search Controls */}
      <section
        aria-label="Filter links"
        className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === "all"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25 border border-violet-500"
                : "bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800 hover:bg-gray-800/60"
            }`}
          >
            All Links ({categoryCounts.all})
          </button>
          {Object.entries(LINK_CATEGORIES).map(([catKey, catTitle]) => (
            <button
              key={catKey}
              type="button"
              onClick={() => setSelectedCategory(catKey)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === catKey
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25 border border-violet-500"
                  : "bg-gray-900/60 text-gray-400 hover:text-white border border-gray-800 hover:bg-gray-800/60"
              }`}
            >
              {catTitle} ({categoryCounts[catKey] ?? 0})
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search platform, handle, bio..."
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-gray-900/80 border border-gray-800 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </section>

      {/* Links Grid */}
      <section aria-label="Social and Project Links Grid" className="mb-14">
        {filteredLinks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLinks.map((link) => {
              const Icon = getSocialLinkIcon(link.name);
              const theme = PLATFORM_THEMES[link.name] ?? DEFAULT_THEME;
              const categoryTitle =
                LINK_CATEGORIES[
                  link.category as keyof typeof LINK_CATEGORIES
                ] || link.category;

              return (
                <div
                  key={`${link.name}-${link.url}`}
                  className={`group relative flex flex-col justify-between p-5 rounded-2xl bg-gray-900/80 hover:bg-gray-900/95 border border-gray-800/80 ${theme.borderHover} transition-all duration-300 shadow-md hover:shadow-xl ${theme.glowColor}`}
                >
                  {/* Top Bar: Icon + Category Badge + External Link Action */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl ${theme.iconBg} border border-gray-700/40 flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105`}
                      >
                        <Icon className={`w-6 h-6 ${theme.iconColor}`} />
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors">
                          {link.name}
                        </h2>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold border ${theme.badgeBg} ${theme.badgeText} mt-0.5`}
                        >
                          {categoryTitle}
                        </span>
                      </div>
                    </div>

                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-800/60 hover:bg-violet-600 text-gray-400 hover:text-white border border-gray-700/50 hover:border-violet-500 transition-all duration-200"
                      title={`Open ${link.name}`}
                      aria-label={`Open ${link.name} in new tab`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Username / Handle with Copy Button */}
                  <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-gray-950/70 border border-gray-800/60 mb-3">
                    <span className="text-xs font-mono text-gray-300 truncate">
                      {link.username}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(link.username, `username-${link.name}`)
                      }
                      className="text-gray-400 hover:text-white transition-colors shrink-0 p-1 cursor-pointer"
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
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4 flex-1">
                    {link.description}
                  </p>

                  {/* Direct Link Button */}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gray-800/40 hover:bg-violet-500/15 border border-gray-800 hover:border-violet-500/30 text-xs font-semibold text-gray-300 hover:text-violet-300 transition-all duration-200"
                  >
                    <span>Visit Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-gray-900/40 border border-gray-800/60 rounded-3xl">
            <Search className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">
              No matching links found
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Try adjusting your search query or switching category tabs.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Dark Theme QR Code Connect Card */}
      <section
        id="qr-connect"
        aria-label="Scan QR Code to Connect"
        className="relative bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/90 border border-gray-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left max-w-lg">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 mb-3">
              <QrCode className="w-3 h-3" />
              <span>Mobile Instant Connect</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Scan to Connect Instantly
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Scan this QR code with any smartphone camera to immediately access
              my verified Gravatar digital identity, contact card, and synced
              profiles on the go.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    "https://gravatar.com/personahonestly8a347f9823",
                    "gravatar-link",
                  )
                }
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white border border-gray-700 text-xs font-semibold transition-all cursor-pointer"
              >
                {copiedKey === "gravatar-link" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Link Copied!</span>
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors"
              >
                <span>Open Gravatar Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* QR Code Presentation Box */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-2 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-500" />
            <div className="relative bg-gray-950 p-4 rounded-2xl border border-gray-800 shadow-2xl">
              <div className="bg-white p-3 rounded-xl">
                <Image
                  src={CDN_SHARDENDU_QR_AVIF}
                  alt="Shardendu Mishra Gravatar QR Code"
                  width={180}
                  height={180}
                  className="w-44 h-44 sm:w-48 sm:h-48 object-contain"
                  priority
                />
              </div>
              <div className="text-center mt-2.5">
                <span className="text-[11px] font-mono text-gray-400">
                  @Shardendu_Mishra
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
