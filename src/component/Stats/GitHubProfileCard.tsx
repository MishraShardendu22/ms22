import { BookOpen, Code, MapPin, Star, User, Users } from "lucide-react";
import type { GitHubData } from "@/types/stats";

interface StatsCardProps {
  label: string;
  value: number;
  iconColor?: string;
  icon: React.ElementType;
}

const StatsCard = ({
  label,
  value,
  icon: Icon,
  iconColor = "text-[#d9a55b]",
}: StatsCardProps) => (
  <div className="p-4 bg-[#1e1a16] rounded-lg border border-[#2f2923] hover:border-[#d9a55b]/30 transition-colors">
    <div className="flex items-center gap-3">
      <Icon className={`w-5 h-5 ${iconColor}`} />
      <div>
        <p className="text-xs text-[#8e8374]">{label}</p>
        <p className="text-lg font-bold text-[#f3ebdd]">
          {value?.toLocaleString() || "0"}
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
}: GitHubProfileCardProps) => (
  <div className="bg-[#161311] border border-[#2f2923] rounded-2xl p-6 hover:border-[#d9a55b]/40 transition-all duration-300">
    <div className="flex items-center gap-3 mb-6">
      <div>
        <h3 className="text-lg font-bold text-[#f3ebdd]">GitHub Profile</h3>
        <p className="text-xs text-[#8e8374]">Development Activity</p>
      </div>
    </div>

    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <StatsCard icon={Users} label="Followers" value={github.followers} />
        <StatsCard
          icon={Code}
          label="Repositories"
          value={github.public_repos}
          iconColor="text-[#4caf7d]"
        />
      </div>

      <StatsCard
        icon={Star}
        label="Total Stars"
        value={stars}
        iconColor="text-[#d9a55b]"
      />

      {github.name && (
        <div className="p-3 bg-[#1e1a16] rounded-lg border border-[#2f2923]">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#d9a55b]" />
            <span className="text-sm text-[#b9ae9d]">{github.name}</span>
          </div>
        </div>
      )}

      {github.location && (
        <div className="p-3 bg-[#1e1a16] rounded-lg border border-[#2f2923]">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#d9a55b]" />
            <span className="text-sm text-[#b9ae9d]">{github.location}</span>
          </div>
        </div>
      )}

      {github.bio && (
        <div className="p-3 bg-[#1e1a16] rounded-lg border border-[#2f2923]">
          <div className="flex items-start gap-2">
            <BookOpen className="w-4 h-4 text-[#d9a55b] mt-0.5" />
            <p className="text-sm text-[#8e8374] leading-relaxed">
              {github.bio}
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
);
