"use client";

import {
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
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
          <div className="kicker mb-1">Global Developer Identity</div>
          <h1 className="page-title text-3xl sm:text-4xl lg:text-5xl text-[#f3ebdd] font-serif tracking-tight m-0">
            Verified Channels &amp; <em>Endpoints</em>.
          </h1>
          <p className="text-sm text-[#8e8374] mt-2 max-w-2xl">
            Official developer handles, engineering platforms, open source
            registries, and real-time communication endpoints.
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
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
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
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
            className="w-full pl-9 pr-8 py-2 rounded-lg bg-[#161311] border border-[#2f2923] text-xs text-[#f3ebdd] placeholder-[#8e8374] focus:outline-none focus:border-[#d9a55b] focus:ring-1 focus:ring-[#d9a55b]/40 transition-all font-mono"
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

      {/* Verified Channel Directory Surface */}
      {filteredLinks.length > 0 ? (
        <div className="bg-[#161311] border border-[#2f2923] rounded-2xl overflow-hidden divide-y divide-[#2f2923] shadow-2xl mb-16">
          {filteredLinks.map((link: SocialLink) => {
            const style = getPlatformStyle(link.name);
            const Icon = style.icon;
            const hostname = link.url.replace(/^https?:\/\/(www\.)?/, "");

            return (
              <div
                key={`${link.name}-${link.url}`}
                className="group relative flex flex-col md:flex-row md:items-center justify-between p-4 sm:p-5 gap-4 hover:bg-[#1e1a16]/70 transition-colors"
              >
                {/* Left: Platform Icon Tile + Name + Category Tag + Description */}
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${style.iconBg} transition-colors group-hover:border-[#d9a55b]/50`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2
                        className={`text-sm sm:text-base font-bold text-[#f3ebdd] font-mono group-hover:${style.accentText} transition-colors`}
                      >
                        {link.name}
                      </h2>
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md border ${style.badgeBg}`}
                      >
                        {style.tag}
                      </span>
                      <span className="text-[11px] font-mono text-[#8e8374]">
                        {hostname}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#b9ae9d] leading-relaxed line-clamp-1 sm:line-clamp-2">
                      {link.description}
                    </p>
                  </div>
                </div>

                {/* Right: Handle copy pill + Connect action */}
                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1a16] border border-[#2f2923] group-hover:border-[#413930]">
                    <span className="text-xs font-mono text-[#f3ebdd] select-all">
                      {link.username}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(link.username, `user-${link.name}`)
                      }
                      className="text-[#8e8374] hover:text-[#d9a55b] p-0.5 cursor-pointer transition-colors"
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

                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#d9a55b] hover:bg-[#e6b56c] text-[#0e0c0a] font-semibold text-xs transition-colors shadow-sm cursor-pointer"
                  >
                    <span>Connect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
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
        className="relative p-6 sm:p-8 rounded-2xl bg-[#161311] border border-[#2f2923] hover:border-[#d9a55b]/40 shadow-2xl mb-16 overflow-hidden transition-colors"
      >
        {/* Subtle Ambient Warm Glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#d9a55b]/5 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          {/* Identity Credentials */}
          <div className="text-center lg:text-left flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-3">
              <span className="px-2.5 py-0.5 bg-[#1e1a16] text-[#d9a55b] text-[11px] font-mono font-semibold rounded-md border border-[#2f2923]">
                {"SEC-ID // GRAVATAR-VERIFIED"}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Consulting &amp; Engagements
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif text-[#f3ebdd] tracking-tight mb-2">
              Shardendu Mishra &mdash;{" "}
              <em className="italic text-[#d9a55b]">Digital Passport</em>
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1e1a16] hover:bg-[#27221c] text-[#f3ebdd] border border-[#2f2923] hover:border-[#413930] text-xs font-semibold transition-all cursor-pointer shadow-sm"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#d9a55b] hover:bg-[#e6b56c] text-[#0e0c0a] text-xs font-bold transition-all shadow-[0_2px_12px_rgba(217,165,91,0.25)] cursor-pointer"
              >
                <span>View Gravatar Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Framed QR Code Badge */}
          <div className="shrink-0 p-4 rounded-xl bg-[#0e0c0a] border border-[#2f2923] flex flex-col items-center shadow-lg">
            <div className="relative p-2 rounded-lg bg-white shadow-md">
              <Image
                src={CDN_SHARDENDU_QR_AVIF}
                alt="Shardendu Mishra Gravatar QR Code"
                width={128}
                height={128}
                className="w-32 h-32 object-contain block"
                unoptimized
                priority
              />
            </div>
            <div className="mt-3 text-center">
              <span className="text-xs font-mono font-medium text-[#f3ebdd] block">
                @Shardendu_Mishra
              </span>
              <span className="text-[10px] text-[#8e8374] font-mono">
                Scan to add contact
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
