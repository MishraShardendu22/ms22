import { Award, User } from "lucide-react";
import type { LeetCodeData } from "@/types/stats";

const DifficultyCard = ({
  difficulty,
  count,
  color,
}: {
  difficulty: string;
  count: number;
  color: string;
}) => (
  <div className="p-3 bg-[#1e1a16] rounded-lg border border-[#2f2923] hover:border-[#d9a55b]/30 transition-colors">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-sm text-[#b9ae9d]">{difficulty}</span>
      </div>
      <span className="text-sm font-bold text-[#f3ebdd]">{count}</span>
    </div>
  </div>
);

interface LeetCodeStatsCardProps {
  leetcode: LeetCodeData;
}

export const LeetCodeStatsCard = ({ leetcode }: LeetCodeStatsCardProps) => (
  <div className="bg-[#161311] border border-[#2f2923] rounded-2xl p-6 hover:border-[#d9a55b]/40 transition-all duration-300">
    <div className="flex items-center gap-3 mb-6">
      <div>
        <h3 className="text-lg font-bold text-[#f3ebdd]">LeetCode Stats</h3>
        <p className="text-xs text-[#8e8374]">Problem Solving</p>
      </div>
    </div>

    <div className="space-y-3">
      {leetcode.profile.realName && (
        <div className="p-3 bg-[#1e1a16] rounded-lg border border-[#2f2923]">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#d9a55b]" />
            <span className="text-sm text-[#b9ae9d]">
              {leetcode.profile.realName}
            </span>
          </div>
        </div>
      )}

      <div className="p-4 bg-[#1e1a16] rounded-lg border border-[#2f2923]">
        <div className="flex items-center gap-3">
          <Award className="w-5 h-5 text-[#d9a55b]" />
          <div>
            <p className="text-xs text-[#8e8374]">Global Ranking</p>
            <p className="text-lg font-bold text-[#f3ebdd]">
              #{leetcode.profile?.ranking?.toLocaleString() || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <DifficultyCard
          difficulty="Easy"
          count={leetcode.submitStats.acSubmissionNum[1]?.count || 0}
          color="bg-[#4caf7d]"
        />
        <DifficultyCard
          difficulty="Medium"
          count={leetcode.submitStats.acSubmissionNum[2]?.count || 0}
          color="bg-[#d9a55b]"
        />
        <DifficultyCard
          difficulty="Hard"
          count={leetcode.submitStats.acSubmissionNum[3]?.count || 0}
          color="bg-[#e06060]"
        />
      </div>
    </div>
  </div>
);
