"use client";

import {
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  Globe,
  QrCode,
  Search,
  Sparkles,
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
  type SocialLink,
} from "@/constants";

interface PlatformStyle {
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  badgeBg: string;
  iconBg: string;
  borderHover: string;
  glowGradient: string;
  accentText: string;
}

function getPlatformStyle(name: string): PlatformStyle {
  switch (name) {
    case "GitHub":
      return {
        icon: GitHubIcon,
        tag: "Code & OSS",
        badgeBg: "bg-[#8957e5]/15 text-[#c29bfd] border-[#8957e5]/35",
        iconBg: "bg-[#8957e5]/10 text-[#c29bfd] border-[#8957e5]/30",
        borderHover: "hover:border-[#8957e5]/50",
        glowGradient:
          "from-[#8957e5]/25 via-[rgba(137,87,229,0.08)] to-transparent",
        accentText: "text-[#c29bfd]",
      };
    case "GitHub Alt":
      return {
        icon: GitHubIcon,
        tag: "Collaborative",
        badgeBg: "bg-[#2f2923] text-[#b9ae9d] border-[#413930]",
        iconBg: "bg-[#1e1a16] text-[#b9ae9d] border-[#2f2923]",
        borderHover: "hover:border-[#8e8374]/50",
        glowGradient: "from-[#8e8374]/20 via-transparent to-transparent",
        accentText: "text-[#d0c6b6]",
      };
    case "LinkedIn":
      return {
        icon: LinkedInIcon,
        tag: "Career & Network",
        badgeBg: "bg-[#0a66c2]/15 text-[#70b5f9] border-[#0a66c2]/35",
        iconBg: "bg-[#0a66c2]/10 text-[#70b5f9] border-[#0a66c2]/30",
        borderHover: "hover:border-[#0a66c2]/50",
        glowGradient:
          "from-[#0a66c2]/25 via-[rgba(10,102,194,0.08)] to-transparent",
        accentText: "text-[#70b5f9]",
      };
    case "Twitter / X":
      return {
        icon: TwitterXIcon,
        tag: "Updates & Thoughts",
        badgeBg: "bg-[#f3ebdd]/10 text-[#f3ebdd] border-[#f3ebdd]/30",
        iconBg: "bg-[#f3ebdd]/10 text-[#f3ebdd] border-[#f3ebdd]/30",
        borderHover: "hover:border-[#f3ebdd]/45",
        glowGradient:
          "from-[#f3ebdd]/20 via-[rgba(243,235,221,0.05)] to-transparent",
        accentText: "text-[#f3ebdd]",
      };
    case "Instagram":
      return {
        icon: InstagramIcon,
        tag: "Visuals & Life",
        badgeBg: "bg-[#e1306c]/15 text-[#ff7597] border-[#e1306c]/35",
        iconBg:
          "bg-gradient-to-tr from-[#fd1d1d]/20 via-[#e1306c]/20 to-[#fcb045]/20 text-[#ff7597] border-[#e1306c]/30",
        borderHover: "hover:border-[#e1306c]/50",
        glowGradient:
          "from-[#e1306c]/25 via-[rgba(253,29,29,0.08)] to-transparent",
        accentText: "text-[#ff7597]",
      };
    case "YouTube":
      return {
        icon: YouTubeIcon,
        tag: "Demos & Video",
        badgeBg: "bg-[#ff0000]/15 text-[#ff6b6b] border-[#ff0000]/35",
        iconBg: "bg-[#ff0000]/10 text-[#ff6b6b] border-[#ff0000]/30",
        borderHover: "hover:border-[#ff0000]/50",
        glowGradient:
          "from-[#ff0000]/25 via-[rgba(255,0,0,0.08)] to-transparent",
        accentText: "text-[#ff6b6b]",
      };
    case "LeetCode":
      return {
        icon: LeetCodeIcon,
        tag: "Algorithms & Contests",
        badgeBg: "bg-[#ffa116]/15 text-[#ffbe53] border-[#ffa116]/35",
        iconBg: "bg-[#ffa116]/10 text-[#ffbe53] border-[#ffa116]/30",
        borderHover: "hover:border-[#ffa116]/50",
        glowGradient:
          "from-[#ffa116]/25 via-[rgba(255,161,22,0.08)] to-transparent",
        accentText: "text-[#ffbe53]",
      };
    case "Discord":
      return {
        icon: DiscordIcon,
        tag: "Community",
        badgeBg: "bg-[#5865f2]/15 text-[#9da5ff] border-[#5865f2]/35",
        iconBg: "bg-[#5865f2]/10 text-[#9da5ff] border-[#5865f2]/30",
        borderHover: "hover:border-[#5865f2]/50",
        glowGradient:
          "from-[#5865f2]/25 via-[rgba(88,101,242,0.08)] to-transparent",
        accentText: "text-[#9da5ff]",
      };
    case "Reddit":
      return {
        icon: RedditIcon,
        tag: "Discussions",
        badgeBg: "bg-[#ff4500]/15 text-[#ff7744] border-[#ff4500]/35",
        iconBg: "bg-[#ff4500]/10 text-[#ff7744] border-[#ff4500]/30",
        borderHover: "hover:border-[#ff4500]/50",
        glowGradient:
          "from-[#ff4500]/25 via-[rgba(255,69,0,0.08)] to-transparent",
        accentText: "text-[#ff7744]",
      };
    case "Telegram":
      return {
        icon: TelegramIcon,
        tag: "Direct Contact",
        badgeBg: "bg-[#24a1de]/15 text-[#68c7f9] border-[#24a1de]/35",
        iconBg: "bg-[#24a1de]/10 text-[#68c7f9] border-[#24a1de]/30",
        borderHover: "hover:border-[#24a1de]/50",
        glowGradient:
          "from-[#24a1de]/25 via-[rgba(36,161,222,0.08)] to-transparent",
        accentText: "text-[#68c7f9]",
      };
    case "Gravatar":
      return {
        icon: Globe,
        tag: "Verified Persona",
        badgeBg: "bg-[#1e8cbe]/15 text-[#54b8e6] border-[#1e8cbe]/35",
        iconBg: "bg-[#1e8cbe]/10 text-[#54b8e6] border-[#1e8cbe]/30",
        borderHover: "hover:border-[#1e8cbe]/50",
        glowGradient:
          "from-[#1e8cbe]/25 via-[rgba(30,140,190,0.08)] to-transparent",
        accentText: "text-[#54b8e6]",
      };
    default:
      return {
        icon: Globe,
        tag: "Live Project",
        badgeBg: "bg-[#d9a55b]/15 text-[#d9a55b] border-[#d9a55b]/35",
        iconBg: "bg-[#d9a55b]/10 text-[#d9a55b] border-[#d9a55b]/30",
        borderHover: "hover:border-[#d9a55b]/50",
        glowGradient:
          "from-[#d9a55b]/25 via-[rgba(217,165,91,0.08)] to-transparent",
        accentText: "text-[#d9a55b]",
      };
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
      {/* Observatory Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-[#2f2923]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#1e1a16] text-[#d9a55b] border border-[#2f2923]">
              <Sparkles className="w-3 h-3 text-[#d9a55b]" />
              <span>Verified Directory</span>
            </span>
            <span className="text-xs text-[#8e8374]">
              Global Developer Identity
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#f3ebdd] font-heading tracking-tight">
            Links &amp; Online Presence
          </h1>
          <p className="text-sm text-[#8e8374] mt-1.5">
            Connect across verified social networks, engineering platforms, open
            source repos, and live deployments.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <a
            href="#qr-passport"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#161311] hover:bg-[#1e1a16] border border-[#2f2923] text-[#b9ae9d] hover:text-[#f3ebdd] hover:border-[#413930] transition-all text-xs font-medium shadow-sm"
          >
            <QrCode className="w-4 h-4 text-[#d9a55b]" />
            <span>Digital ID Passport</span>
          </a>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[#d9a55b] text-[#0e0c0a] font-semibold shadow-[0_2px_12px_rgba(217,165,91,0.25)]"
                : "bg-[#161311] text-[#b9ae9d] hover:text-[#f3ebdd] border border-[#2f2923] hover:bg-[#1e1a16]"
            }`}
          >
            All Channels ({categoryCounts.all})
          </button>
          {Object.entries(LINK_CATEGORIES).map(([catKey, catTitle]) => {
            const count = categoryCounts[catKey] ?? 0;
            const isSelected = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                type="button"
                onClick={() => setSelectedCategory(catKey)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#d9a55b] text-[#0e0c0a] font-semibold shadow-[0_2px_12px_rgba(217,165,91,0.25)]"
                    : "bg-[#161311] text-[#b9ae9d] hover:text-[#f3ebdd] border border-[#2f2923] hover:bg-[#1e1a16]"
                }`}
              >
                {catTitle} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8374]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search channels or handles..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#161311] border border-[#2f2923] text-xs text-[#f3ebdd] placeholder-[#8e8374] focus:outline-none focus:border-[#d9a55b] focus:ring-1 focus:ring-[#d9a55b]/40 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8e8374] hover:text-[#f3ebdd] p-1 cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Constellation Cards Grid */}
      {filteredLinks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          {filteredLinks.map((link: SocialLink) => {
            const style = getPlatformStyle(link.name);
            const Icon = style.icon;
            const hostname = link.url.replace(/^https?:\/\/(www\.)?/, "");

            return (
              <div
                key={`${link.name}-${link.url}`}
                className={`group relative rounded-2xl transition-all duration-300 ${style.borderHover}`}
              >
                {/* Ambient Brand Glow */}
                <div
                  className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-br ${style.glowGradient} blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative h-full p-5 bg-[#161311] border border-[#2f2923] rounded-2xl flex flex-col justify-between overflow-hidden shadow-lg group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
                  {/* Top: Icon + Name + Tag */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-105 ${style.iconBg}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h2
                            className={`text-base font-bold text-[#f3ebdd] tracking-tight group-hover:${style.accentText} transition-colors`}
                          >
                            {link.name}
                          </h2>
                          <span
                            className={`inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md border mt-1 ${style.badgeBg}`}
                          >
                            {style.tag}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Handle Pill with 1-Click Copy */}
                    <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-[#1e1a16] border border-[#2f2923] mb-3 group-hover:border-[#413930] transition-colors">
                      <span className="text-xs font-mono text-[#f3ebdd] truncate select-all">
                        {link.username}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(link.username, `user-${link.name}`)
                        }
                        className="text-[#8e8374] hover:text-[#d9a55b] p-0.5 cursor-pointer shrink-0 transition-colors"
                        title="Copy handle"
                      >
                        {copiedKey === `user-${link.name}` ? (
                          <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied</span>
                          </div>
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#b9ae9d] leading-relaxed mb-4 line-clamp-2">
                      {link.description}
                    </p>
                  </div>

                  {/* Footer: Domain Pill & Direct Action */}
                  <div className="flex items-center justify-between pt-3.5 border-t border-[#2f2923] mt-2">
                    <span
                      className="text-[11px] font-mono text-[#8e8374] truncate max-w-[140px]"
                      title={hostname}
                    >
                      {hostname}
                    </span>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1e1a16] hover:bg-[#d9a55b] text-[#d9a55b] hover:text-[#0e0c0a] border border-[#2f2923] hover:border-[#d9a55b] text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm"
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
        <div className="text-center py-16 px-4 bg-[#161311] border border-[#2f2923] rounded-2xl mb-16">
          <Search className="w-10 h-10 text-[#8e8374] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#f3ebdd] mb-1">
            No matching profiles found
          </h3>
          <p className="text-xs text-[#8e8374] mb-5">
            We couldn't find any channels matching &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="px-4 py-2 rounded-xl bg-[#d9a55b] hover:bg-[#e6b56c] text-[#0e0c0a] text-xs font-bold transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Observatory Astrophotography Digital ID Passport */}
      <section
        id="qr-passport"
        aria-label="Direct Digital ID Passport"
        className="relative p-6 sm:p-8 rounded-2xl bg-[#161311] border border-[#2f2923] shadow-2xl mb-16 overflow-hidden"
      >
        {/* Astrophotography Golden Viewfinder Reticles */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#d9a55b]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#d9a55b]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#d9a55b]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#d9a55b]" />

        {/* Ambient Warm Golden Pulse Behind Card */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#d9a55b]/5 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          {/* Identity Credentials */}
          <div className="text-center lg:text-left flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-3">
              <span className="px-2.5 py-0.5 bg-[#1e1a16] text-[#d9a55b] text-[11px] font-mono font-medium rounded-md border border-[#2f2923]">
                {"SEC-ID // GRAVATAR-VERIFIED"}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Consulting &amp; Engagements
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[#f3ebdd] font-heading tracking-tight mb-2">
              Shardendu Mishra — Digital Passport
            </h2>
            <p className="text-xs sm:text-sm text-[#b9ae9d] max-w-xl leading-relaxed mb-6">
              Scan with your smartphone camera to instantly verify identity
              credentials, fetch synced contact cards, and access authenticated
              Gravatar profiles.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    "https://gravatar.com/personahonestly8a347f9823",
                    "passport-url",
                  )
                }
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1e1a16] hover:bg-[#27221c] text-[#f3ebdd] border border-[#2f2923] hover:border-[#413930] text-xs font-semibold transition-all cursor-pointer shadow-sm"
              >
                {copiedKey === "passport-url" ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">
                      Passport URL Copied!
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#d9a55b]" />
                    <span>Copy Verified URL</span>
                  </>
                )}
              </button>

              <a
                href="https://gravatar.com/personahonestly8a347f9823"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d9a55b] hover:bg-[#e6b56c] text-[#0e0c0a] text-xs font-bold transition-all shadow-[0_2px_12px_rgba(217,165,91,0.25)] cursor-pointer"
              >
                <span>View Gravatar Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Framed QR Code with Celestial Golden Reticle */}
          <div className="shrink-0 p-4 rounded-2xl bg-[#0e0c0a] border border-[#2f2923] shadow-inner flex flex-col items-center">
            <div className="relative p-2.5 rounded-xl bg-white shadow-md">
              <Image
                src={CDN_SHARDENDU_QR_AVIF}
                alt="Shardendu Mishra Gravatar QR Code"
                width={132}
                height={132}
                className="w-32 h-32 object-contain"
                loading="lazy"
              />
            </div>
            <div className="mt-2.5 text-center">
              <span className="text-xs font-mono font-medium text-[#f3ebdd] block">
                @Shardendu_Mishra
              </span>
              <span className="text-[10px] text-[#8e8374]">
                Scan to add contact
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
