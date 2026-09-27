import { Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { Repository } from "@/types/stats";

interface ExtendedRepository extends Repository {
  url?: string;
  stars?: number;
}

const RepoCard = ({
  repo,
  index,
}: {
  repo: ExtendedRepository;
  index: number;
}) => {
  const repoUrl = repo.url || repo.html_url;
  const stars = repo.stars || repo.stargazers_count || 0;

  if (!repoUrl) return null;

  return (
    <Link
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 bg-[#1e1a16] rounded-lg border border-[#2f2923] hover:border-[#d9a55b]/40 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-semibold text-[#f3ebdd] group-hover:text-[#d9a55b] transition-colors line-clamp-1">
          {repo.name}
        </h4>
        <span className="text-xs text-[#8e8374]">#{index + 1}</span>
      </div>
      {repo.description && (
        <p className="text-xs text-[#8e8374] mb-3 line-clamp-2">
          {repo.description}
        </p>
      )}
      <div className="flex items-center gap-4 text-xs text-[#8e8374]">
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-[#d9a55b]" />
          <span>{stars}</span>
        </div>
        {repo.language && (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#d9a55b]" />
            <span>{repo.language}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

interface TopRepositoriesCardProps {
  topRepos: Repository[];
}

export const TopRepositoriesCard = ({ topRepos }: TopRepositoriesCardProps) => {
  if (!topRepos || !Array.isArray(topRepos) || topRepos.length === 0) {
    return null;
  }

  const validRepos = topRepos.filter(
    (repo): repo is ExtendedRepository =>
      !!((repo as ExtendedRepository).url || repo.html_url),
  );

  if (validRepos.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#161311] border border-[#2f2923] rounded-2xl p-6 hover:border-[#d9a55b]/40 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-[#4caf7d]/10 rounded-lg border border-[#4caf7d]/30">
          <TrendingUp className="w-5 h-5 text-[#4caf7d]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#f3ebdd]">Top Repositories</h3>
          <p className="text-xs text-[#8e8374]">Most Popular Projects</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {validRepos.slice(0, 6).map((repo, index) => (
          <RepoCard key={repo.name} repo={repo} index={index} />
        ))}
      </div>
    </div>
  );
};
