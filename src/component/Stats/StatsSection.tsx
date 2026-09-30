import { Suspense } from "react";
import { API_BASE_URL } from "@/constants/url";
import {
  FALLBACK_GITHUB_CALENDAR,
  FALLBACK_GITHUB_PROFILE,
  type GitHubCalendarResponse,
} from "@/static/githubData";
import type { GitHubData } from "@/types/stats";
import { GitHubContributionGraph } from "./GitHubContributionGraph";
import { GitHubProfileCard } from "./GitHubProfileCard";

async function fetchWithTimeout(url: string, ms = 8000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (Portfolio)",
      },
    });
    clearTimeout(timeoutId);
    if (!res.ok) return null;
    return res.json();
  } catch {
    clearTimeout(timeoutId);
    return null;
  }
}

async function GitHubProfileSection() {
  let profileData: GitHubData | null = null;
  let starsCount = 684;

  try {
    const [gh, starsData] = await Promise.all([
      fetchWithTimeout(`${API_BASE_URL}/api/github`),
      fetchWithTimeout(`${API_BASE_URL}/api/github/stars`),
    ]);

    if (gh && typeof gh === "object" && gh.login && !gh.message) {
      profileData = gh as GitHubData;
    }

    if (
      starsData?.stars &&
      typeof starsData.stars === "number" &&
      starsData.stars > 0
    ) {
      starsCount = starsData.stars;
    }
  } catch {
    // Proceed to fallback
  }

  // If backend returned an error / 401, try direct GitHub API or fallback
  if (!profileData) {
    try {
      const publicGh = await fetchWithTimeout(
        "https://api.github.com/users/MishraShardendu22",
      );
      if (publicGh?.login && !publicGh.message) {
        profileData = publicGh as GitHubData;
      }
    } catch {
      // Proceed to fallback
    }
  }

  const finalProfile = profileData || FALLBACK_GITHUB_PROFILE;
  return <GitHubProfileCard github={finalProfile} stars={starsCount} />;
}

async function ContributionGraphSection() {
  let calData: GitHubCalendarResponse | null = null;

  try {
    const cal = await fetchWithTimeout(`${API_BASE_URL}/api/github/calendar`);
    if (
      cal?.contributions &&
      Array.isArray(cal.contributions) &&
      cal.contributions.length > 0
    ) {
      calData = cal as GitHubCalendarResponse;
    }
  } catch {
    // Proceed to fallback
  }

  const finalCalendar = calData || FALLBACK_GITHUB_CALENDAR;
  return <GitHubContributionGraph calendar={finalCalendar} />;
}

function CardSkeleton() {
  return (
    <div className="bg-[#161311] border border-[#2f2923] rounded-2xl p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 bg-[#1e1a16] rounded-lg" />
        <div className="space-y-2">
          <div className="w-32 h-4 bg-[#1e1a16] rounded" />
          <div className="w-24 h-3 bg-[#1e1a16] rounded" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="h-16 bg-[#1e1a16] rounded-lg" />
          <div className="h-16 bg-[#1e1a16] rounded-lg" />
        </div>
        <div className="h-16 bg-[#1e1a16] rounded-lg" />
      </div>
    </div>
  );
}

// Wide card skeleton for contribution graph section
function WideCardSkeleton() {
  return (
    <div className="lg:col-span-2 bg-[#161311] border border-[#2f2923] rounded-2xl p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 bg-[#1e1a16] rounded-lg" />
        <div className="space-y-2">
          <div className="w-40 h-4 bg-[#1e1a16] rounded" />
          <div className="w-32 h-3 bg-[#1e1a16] rounded" />
        </div>
      </div>
      <div className="h-64 bg-[#1e1a16] rounded-lg" />
    </div>
  );
}

function LinkedInEmbed() {
  return (
    <div className="bg-[#161311] border border-[#2f2923] rounded-2xl overflow-hidden hover:border-[#d9a55b]/40 transition-all duration-300 h-full flex flex-col">
      <iframe
        src="https://www.linkedin.com/embed/feed/update/urn:li:share:7496237227417616385"
        className="w-full flex-1 border-0"
        style={{ minHeight: "500px" }}
        allowFullScreen
        title="LinkedIn Post"
        loading="lazy"
      />
    </div>
  );
}

export async function StatsSection() {
  return (
    <section className="relative py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 bg-transparent">
      <div className="container mx-auto max-w-7xl w-full relative z-10">
        <div className="text-center mb-6 md:mb-8 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal font-serif bg-linear-to-r from-[#f3ebdd] via-[#d9a55b] to-[#e6b56c] bg-clip-text text-transparent mb-3 md:mb-4">
            Coding Statistics &amp; Activity
          </h2>
          <p className="text-[#8e8374] text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-4">
            Live telemetry of GitHub contributions and open-source activity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          <Suspense fallback={<CardSkeleton />}>
            <GitHubProfileSection />
          </Suspense>

          <LinkedInEmbed />

          <Suspense fallback={<WideCardSkeleton />}>
            <div className="lg:col-span-2">
              <ContributionGraphSection />
            </div>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
