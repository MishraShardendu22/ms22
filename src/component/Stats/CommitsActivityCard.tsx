"use client";

import { Activity, GitCommit } from "lucide-react";
import dynamic from "next/dynamic";

const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false },
);
const ComposedChart = dynamic(
  () => import("recharts").then((mod) => mod.ComposedChart),
  { ssr: false },
);
const Area = dynamic(() => import("recharts").then((mod) => mod.Area), {
  ssr: false,
});
const Bar = dynamic(() => import("recharts").then((mod) => mod.Bar), {
  ssr: false,
});
const Line = dynamic(() => import("recharts").then((mod) => mod.Line), {
  ssr: false,
});
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), {
  ssr: false,
});
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), {
  ssr: false,
});
const CartesianGrid = dynamic(
  () => import("recharts").then((mod) => mod.CartesianGrid),
  { ssr: false },
);
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), {
  ssr: false,
});
const Legend = dynamic(() => import("recharts").then((mod) => mod.Legend), {
  ssr: false,
});

interface CommitsActivityCardProps {
  commits: Array<{ date: string; count: number }>;
  calendar: unknown;
}

interface WeeklyData {
  week: string;
  commits: number;
}

interface EnrichedData extends WeeklyData {
  weekLabel: string;
  movingAvg: number;
  trend: number;
}

interface TooltipPayload {
  payload: EnrichedData;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload?.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#161311] border border-[#2f2923] rounded-lg px-4 py-3 shadow-xl">
        <p className="text-xs text-[#8e8374] mb-1">
          Week of{" "}
          {new Date(data.week).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </p>
        <div className="space-y-1">
          <p className="text-sm text-[#d9a55b] font-semibold flex items-center gap-2">
            <GitCommit className="w-3 h-3" />
            {data.commits} commits
          </p>
          {data.trend && (
            <p
              className={`text-xs ${data.trend > 0 ? "text-[#4caf7d]" : "text-[#e06060]"}`}
            >
              {data.trend > 0 ? "↑" : "↓"} {Math.abs(data.trend)}% vs avg
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export const CommitsActivityCard = ({
  commits,
  calendar: _calendar,
}: CommitsActivityCardProps) => {
  if (!commits || commits.length === 0) {
    return null;
  }

  // Data processing - automatically optimized by React Compiler
  const weekly = commits
    .reduce((acc: WeeklyData[], commit: { date: string; count: number }) => {
      if (!commit.date || !commit.count) return acc;

      const date = new Date(commit.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const weekKey = weekStart.toISOString().split("T")[0];

      const existing = acc.find((w) => w.week === weekKey);
      if (existing) {
        existing.commits += commit.count;
      } else {
        acc.push({
          week: weekKey,
          commits: commit.count,
        });
      }
      return acc;
    }, [])
    .slice(-52);

  const avgCommits =
    weekly.reduce((sum: number, w) => sum + w.commits, 0) / weekly.length;

  const enriched: EnrichedData[] = weekly.map(
    (week: WeeklyData, index: number) => {
      const movingAvg =
        index >= 3
          ? weekly
              .slice(Math.max(0, index - 3), index + 1)
              .reduce((sum: number, w) => sum + w.commits, 0) /
            Math.min(4, index + 1)
          : week.commits;

      const trend = (((week.commits - avgCommits) / avgCommits) * 100).toFixed(
        1,
      );

      // Format date label
      const date = new Date(week.week);
      const weekLabel = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      return {
        ...week,
        weekLabel,
        movingAvg: Math.round(movingAvg),
        trend: Number.parseFloat(trend),
      };
    },
  );

  const weeklyData = weekly;
  const enrichedData = enriched;

  const totalCommits = weeklyData.reduce(
    (sum: number, w) => sum + w.commits,
    0,
  );
  const avgPerWeek = Math.round(avgCommits);
  const peakWeek = weeklyData.reduce(
    (max: WeeklyData, w) => (w.commits > max.commits ? w : max),
    { week: "", commits: 0 },
  );

  const recentTrend =
    enrichedData.slice(-4).reduce((sum: number, w) => sum + w.commits, 0) / 4;
  const previousTrend =
    enrichedData.slice(-8, -4).reduce((sum: number, w) => sum + w.commits, 0) /
    4;
  const trendChange = (
    ((recentTrend - previousTrend) / previousTrend) *
    100
  ).toFixed(1);

  return (
    <div className="bg-[#161311] border border-[#2f2923] rounded-2xl p-6 hover:border-[#d9a55b]/40 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-[#d9a55b]/10 rounded-lg border border-[#d9a55b]/30">
          <Activity className="w-5 h-5 text-[#d9a55b]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#f3ebdd]">
            Development Activity
          </h3>
          <p className="text-xs text-[#8e8374]">
            Commit patterns and trends over time
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="p-3 bg-[#1e1a16] rounded-lg border border-[#2f2923]">
          <p className="text-xs text-[#8e8374] mb-1">Total</p>
          <p className="text-xl font-bold text-[#f3ebdd]">{totalCommits}</p>
        </div>
        <div className="p-3 bg-[#1e1a16] rounded-lg border border-[#2f2923]">
          <p className="text-xs text-[#8e8374] mb-1">Avg/Week</p>
          <p className="text-xl font-bold text-[#d9a55b]">{avgPerWeek}</p>
        </div>
        <div className="p-3 bg-[#1e1a16] rounded-lg border border-[#2f2923]">
          <p className="text-xs text-[#8e8374] mb-1">Peak Week</p>
          <p className="text-xl font-bold text-[#4caf7d]">{peakWeek.commits}</p>
        </div>
        <div className="p-3 bg-[#1e1a16] rounded-lg border border-[#2f2923]">
          <p className="text-xs text-[#8e8374] mb-1">Recent Trend</p>
          <p
            className={`text-xl font-bold ${parseFloat(trendChange) >= 0 ? "text-[#4caf7d]" : "text-[#e06060]"}`}
          >
            {parseFloat(trendChange) > 0 ? "+" : ""}
            {trendChange}%
          </p>
        </div>
      </div>

      <div className="h-80 min-h-[18rem] w-full min-w-0">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minHeight={280}
          minWidth={0}
        >
          <ComposedChart
            data={enrichedData}
            margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d9a55b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#d9a55b" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#2f2923"
              opacity={0.5}
            />

            <XAxis
              dataKey="weekLabel"
              tick={{ fill: "#8e8374", fontSize: 11 }}
              axisLine={{ stroke: "#2f2923" }}
              tickLine={{ stroke: "#2f2923" }}
              interval={Math.floor(enrichedData.length / 8)}
              angle={-45}
              textAnchor="end"
              height={60}
            />

            <YAxis
              yAxisId="left"
              tick={{ fill: "#8e8374", fontSize: 12 }}
              axisLine={{ stroke: "#2f2923" }}
              tickLine={{ stroke: "#2f2923" }}
              label={{
                value: "Commits",
                angle: -90,
                position: "insideLeft",
                fill: "#8e8374",
                fontSize: 12,
              }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm text-[#b9ae9d]">{value}</span>
              )}
            />

            <Area
              yAxisId="left"
              type="monotone"
              dataKey="commits"
              fill="url(#areaGradient)"
              stroke="none"
              name="Commit Volume"
            />

            <Bar
              yAxisId="left"
              dataKey="commits"
              fill="#d9a55b"
              opacity={0.7}
              radius={[4, 4, 0, 0]}
              name="Weekly Commits"
            />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="movingAvg"
              stroke="#4caf7d"
              strokeWidth={2}
              dot={false}
              name="4-Week Moving Avg"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <p className="text-[#8e8374]">Last 52 weeks</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#d9a55b]/60"></div>
            <span className="text-[#8e8374]">Commits</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#4caf7d]"></div>
            <span className="text-[#8e8374]">Trend</span>
          </div>
        </div>
      </div>
    </div>
  );
};
