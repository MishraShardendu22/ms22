import {
  BookOpen,
  Building2,
  Code,
  ExternalLink,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { GitHubData } from "@/types/stats";

interface StatsCardProps {
  label: string;
  value: number;
  suffix?: string;
  iconColor?: string;
  icon: React.ElementType;
}

const StatsCard = ({
  label,
  value,
  suffix = "",
  icon: Icon,
  iconColor = "text-[#d9a55b]",
}: StatsCardProps) => (
  <div className="p-3 bg-[#1e1a16] rounded-xl border border-[#2f2923] hover:border-[#d9a55b]/40 transition-colors">
    <div className="flex items-center gap-2.5">
      <div
        className={`p-2 rounded-lg bg-[#161311] border border-[#2f2923] ${iconColor}`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-[11px] text-[#8e8374]">{label}</p>
        <p className="text-base font-bold text-[#f3ebdd] font-mono">
          {(value ?? 0).toLocaleString()}
          {suffix}
        </p>
      </div>
    </div>
  </div>
);

interface GitHubProfileCardProps {
  github: GitHubData;
  stars: number;
}

export const GitHubProfileCard = ({
  github,
  stars,
}: GitHubProfileCardProps) => {
  const avatarUrl =
    github.avatar_url ||
    "https://avatars.githubusercontent.com/u/100414963?v=4";
  const name = github.name || "Shardendu Sankritya Mishra";
  const login = github.login || "MishraShardendu22";
  const bio =
    github.bio ||
    "Software Engineer and Life Long Science Student - Knowledge is Power but Powerless if got it but do not acknowledge it";
  const location = github.location || "Kanpur, Uttar Pradesh";
  const followers = github.followers || 41;
  const following = github.following || 8;
  const repos = github.public_repos || 155;
  const totalStars = stars > 0 ? stars : 684;

  return (
    <div className="bg-[#161311] border border-[#2f2923] rounded-2xl p-5 sm:p-6 hover:border-[#d9a55b]/40 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Header Profile Identity */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3.5">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-[#d9a55b]/30 bg-[#1e1a16] shrink-0">
              <Image
                src={avatarUrl}
                alt={name}
                fill
                sizes="56px"
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-[#f3ebdd] font-heading leading-tight">
                  {name}
                </h3>
              </div>
              <p className="text-xs font-mono text-[#d9a55b]">
                @{login} · <span className="text-[#8e8374]">Git/GitHub</span>
              </p>
            </div>
          </div>

          {/* Developer Program Member Badge */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#d9a55b]/10 border border-[#d9a55b]/25 text-[10px] font-mono text-[#d9a55b] whitespace-nowrap">
            <ShieldCheck className="w-3 h-3" />
            <span>Developer Program</span>
          </div>
        </div>

        {/* Bio */}
        <div className="p-3 bg-[#1e1a16] rounded-xl border border-[#2f2923] mb-4">
          <div className="flex items-start gap-2.5">
            <BookOpen className="w-4 h-4 text-[#d9a55b] mt-0.5 shrink-0" />
            <p className="text-xs text-[#b9ae9d] leading-relaxed line-clamp-2">
              {bio}
            </p>
          </div>
        </div>

        {/* 4-Stat Metric Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <StatsCard
            icon={Users}
            label="Followers"
            value={followers}
            iconColor="text-[#d9a55b]"
          />
          <StatsCard
            icon={Users}
            label="Following"
            value={following}
            iconColor="text-[#b9ae9d]"
          />
          <StatsCard
            icon={Code}
            label="Repositories"
            value={repos}
            suffix="+"
            iconColor="text-[#4caf7d]"
          />
          <StatsCard
            icon={Star}
            label="Total Stars"
            value={totalStars}
            suffix="+"
            iconColor="text-[#e6b56c]"
          />
        </div>

        {/* Metadata Details Strip */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#8e8374] mb-4">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#d9a55b]" />
            <span>{location}</span>
          </div>
          <span className="text-[#2f2923]">•</span>
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#d9a55b]" />
            <Link
              href="https://github.com/ai-needl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#b9ae9d] hover:text-[#d9a55b] transition-colors"
            >
              @ai-needl
            </Link>
          </div>
        </div>
      </div>

      {/* GitHub Profile Action Link */}
      <Link
        href={github.html_url || `https://github.com/${login}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1e1a16] hover:bg-[#25201b] border border-[#2f2923] hover:border-[#d9a55b]/40 text-xs font-mono text-[#f3ebdd] transition-all group cursor-pointer"
      >
        <span>View GitHub Profile</span>
        <ExternalLink className="w-3.5 h-3.5 text-[#8e8374] group-hover:text-[#d9a55b] transition-colors" />
      </Link>
    </div>
  );
};
