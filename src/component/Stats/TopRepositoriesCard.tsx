import { Bookmark, ExternalLink, Star } from "lucide-react";
import Link from "next/link";
import { FALLBACK_PINNED_REPOSITORIES } from "@/static/githubData";
import type { Repository } from "@/types/stats";

interface ExtendedRepository extends Repository {
  url?: string;
  stars?: number;
}

const LANGUAGE_COLORS: Record<string, string> = {
  Go: "bg-[#00ADD8]",
  TypeScript: "bg-[#3178C6]",
  JavaScript: "bg-[#F7DF1E]",
  Python: "bg-[#3572A5]",
  Rust: "bg-[#DEA584]",
  Shell: "bg-[#89E051]",
};

const RepoCard = ({
  repo,
  index,
}: {
  repo: ExtendedRepository;
  index: number;
}) => {
  const repoUrl =
    repo.html_url ||
    repo.url ||
    `https://github.com/MishraShardendu22/${repo.name}`;
  const stars = repo.stars ?? repo.stargazers_count ?? 0;
  const langColor =
    (repo.language && LANGUAGE_COLORS[repo.language]) || "bg-[#d9a55b]";

  return (
    <Link
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 bg-[#1e1a16] rounded-xl border border-[#2f2923] hover:border-[#d9a55b]/40 transition-all duration-200 group flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <Bookmark className="w-3.5 h-3.5 text-[#d9a55b] shrink-0" />
            <h4 className="text-sm font-semibold text-[#f3ebdd] font-mono group-hover:text-[#d9a55b] transition-colors truncate">
              {repo.name}
            </h4>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#2f2923] bg-[#161311] text-[#8e8374]">
              Public
            </span>
            <span className="text-xs font-mono text-[#8e8374]">
              #{index + 1}
            </span>
          </div>
        </div>

        {repo.description && (
          <p className="text-xs text-[#8e8374] mb-3 line-clamp-2 leading-relaxed">
            {repo.description}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[#2f2923]/40 text-xs text-[#8e8374]">
        <div className="flex items-center gap-3">
          {repo.language && (
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${langColor}`} />
              <span className="font-mono text-[11px] text-[#b9ae9d]">
                {repo.language}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1 text-[#b9ae9d]">
            <Star className="w-3.5 h-3.5 text-[#d9a55b]" />
            <span className="font-mono text-[11px]">{stars}</span>
          </div>
        </div>

        <ExternalLink className="w-3 h-3 text-[#8e8374] group-hover:text-[#d9a55b] transition-colors" />
      </div>
    </Link>
  );
};

interface TopRepositoriesCardProps {
  topRepos?: Repository[];
}

export const TopRepositoriesCard = ({ topRepos }: TopRepositoriesCardProps) => {
  const reposToDisplay =
    topRepos && Array.isArray(topRepos) && topRepos.length > 0
      ? topRepos
      : FALLBACK_PINNED_REPOSITORIES;

  const validRepos = reposToDisplay.filter((repo): repo is ExtendedRepository =>
    Boolean(repo.name),
  );

  return (
    <div className="bg-[#161311] border border-[#2f2923] rounded-2xl p-5 sm:p-6 hover:border-[#d9a55b]/40 transition-all duration-300">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2f2923]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#4caf7d]/10 rounded-xl border border-[#4caf7d]/30">
            <Bookmark className="w-5 h-5 text-[#4caf7d]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#f3ebdd] font-heading">
              Pinned &amp; Top Repositories
            </h3>
            <p className="text-xs text-[#8e8374]">
              Autonomous engines, distributed telemetry, and systems
              architecture
            </p>
          </div>
        </div>

        <Link
          href="https://github.com/MishraShardendu22?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1a16] hover:bg-[#25201b] border border-[#2f2923] text-xs font-mono text-[#b9ae9d] hover:text-[#d9a55b] transition-colors"
        >
          <span>View All Repos</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {validRepos.slice(0, 6).map((repo, index) => (
          <RepoCard key={repo.name} repo={repo} index={index} />
        ))}
      </div>
    </div>
  );
};
