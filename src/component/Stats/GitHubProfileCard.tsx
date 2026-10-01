import {
  BookOpen,
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
  <div className="p-3 bg-[#1e1a16] rounded-2xl border border-[#2f2923] hover:border-[#d9a55b]/40 transition-colors">
    <div className="flex items-center gap-2.5">
      <div
        className={`p-2 rounded-xl bg-[#161311] border border-[#2f2923] shrink-0 ${iconColor}`}
      >
        <Icon className="w-3.5 h-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] sm:text-[11px] text-[#8e8374] truncate">
          {label}
        </p>
        <p className="text-sm sm:text-base font-bold text-[#f3ebdd] font-mono truncate">
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
    <div className="bg-[#161311] border border-[#2f2923] rounded-2xl p-4 sm:p-5 hover:border-[#d9a55b]/40 transition-all duration-300 flex flex-col justify-between h-full">
      <div className="space-y-3.5">
        {/* Header Profile Identity */}
        <div>
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#d9a55b]/30 bg-[#1e1a16] shrink-0">
              <Image
                src={avatarUrl}
                alt={name}
                fill
                sizes="48px"
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3
                className="text-sm sm:text-base font-bold text-[#f3ebdd] font-heading leading-tight truncate"
                title={name}
              >
                {name}
              </h3>
              <p className="text-xs font-mono text-[#d9a55b] truncate">
                @{login}
              </p>
            </div>
          </div>

          <div className="mt-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#d9a55b]/10 border border-[#d9a55b]/25 text-[10px] font-mono text-[#d9a55b]">
            <ShieldCheck className="w-3 h-3 shrink-0" />
            <span>Developer Program</span>
          </div>
        </div>

        {/* Bio */}
        <div className="p-3 bg-[#1e1a16] rounded-2xl border border-[#2f2923]">
          <div className="flex items-start gap-2">
            <BookOpen className="w-3.5 h-3.5 text-[#d9a55b] mt-0.5 shrink-0" />
            <p className="text-xs text-[#b9ae9d] leading-relaxed line-clamp-3">
              {bio}
            </p>
          </div>
        </div>

        {/* 4-Stat Metric Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
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

        {/* Metadata Details Strip: Places & Images/Organizations */}
        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          {/* Location / Place Chip */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1e1a16] border border-[#2f2923] text-[11px] sm:text-xs text-[#b9ae9d] shrink-0 max-w-full">
            <MapPin className="w-3.5 h-3.5 text-[#d9a55b] shrink-0" />
            <span className="truncate">{location}</span>
          </div>

          {/* Organization / Image Chip */}
          <Link
            href="https://github.com/ai-needl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1e1a16] hover:bg-[#25201b] border border-[#2f2923] hover:border-[#d9a55b]/40 text-[11px] sm:text-xs text-[#b9ae9d] hover:text-[#f3ebdd] transition-colors shrink-0"
            title="ai-needl organization"
          >
            <Image
              src="https://avatars.githubusercontent.com/u/167732448?v=4"
              alt="ai-needl"
              width={16}
              height={16}
              className="w-4 h-4 rounded-full object-cover shrink-0"
              unoptimized
            />
            <span className="font-mono text-[11px] text-[#d9a55b]">
              @ai-needl
            </span>
          </Link>
        </div>
      </div>

      {/* GitHub Profile Action Link */}
      <Link
        href={github.html_url || `https://github.com/${login}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full mt-4 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl bg-[#1e1a16] hover:bg-[#25201b] border border-[#2f2923] hover:border-[#d9a55b]/40 text-xs font-mono text-[#f3ebdd] transition-all group cursor-pointer"
      >
        <span>View GitHub</span>
        <ExternalLink className="w-3.5 h-3.5 text-[#8e8374] group-hover:text-[#d9a55b] transition-colors" />
      </Link>
    </div>
  );
};
