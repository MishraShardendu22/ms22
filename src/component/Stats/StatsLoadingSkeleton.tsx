export function StatsLoadingSkeleton() {
  return (
    <section className="relative py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 bg-transparent">
      <div className="container mx-auto max-w-7xl w-full relative z-10">
        <div className="text-center mb-6 md:mb-8 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal font-serif bg-linear-to-r from-[#f3ebdd] via-[#d9a55b] to-[#e6b56c] bg-clip-text text-transparent mb-3 md:mb-4">
            Coding Statistics
          </h2>
          <p className="text-[#8e8374] text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-4">
            Overview of my coding activity and achievements across platforms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {/* GitHub Profile skeleton */}
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
              <div className="h-12 bg-[#1e1a16] rounded-lg" />
              <div className="h-12 bg-[#1e1a16] rounded-lg" />
            </div>
          </div>

          {/* LeetCode skeleton */}
          <div className="bg-[#161311] border border-[#2f2923] rounded-2xl p-6 animate-pulse">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-[#d9a55b]/10 rounded-lg" />
              <div className="space-y-2">
                <div className="w-28 h-4 bg-[#1e1a16] rounded" />
                <div className="w-24 h-3 bg-[#1e1a16] rounded" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-12 bg-[#1e1a16] rounded-lg" />
              <div className="h-16 bg-[#1e1a16] rounded-lg" />
              <div className="space-y-2">
                <div className="h-10 bg-[#1e1a16] rounded-lg" />
                <div className="h-10 bg-[#1e1a16] rounded-lg" />
                <div className="h-10 bg-[#1e1a16] rounded-lg" />
              </div>
            </div>
          </div>

          {/* Commits Activity skeleton */}
          <div className="lg:col-span-2 bg-[#161311] border border-[#2f2923] rounded-2xl p-6 animate-pulse">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-[#d9a55b]/10 rounded-lg" />
              <div className="space-y-2">
                <div className="w-40 h-4 bg-[#1e1a16] rounded" />
                <div className="w-48 h-3 bg-[#1e1a16] rounded" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="h-16 bg-[#1e1a16] rounded-lg" />
              <div className="h-16 bg-[#1e1a16] rounded-lg" />
              <div className="h-16 bg-[#1e1a16] rounded-lg" />
              <div className="h-16 bg-[#1e1a16] rounded-lg" />
            </div>
            <div className="h-80 bg-[#1e1a16] rounded-lg" />
          </div>

          {/* Top Repositories skeleton */}
          <div className="lg:col-span-2 bg-[#161311] border border-[#2f2923] rounded-2xl p-6 animate-pulse">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-[#4caf7d]/10 rounded-lg" />
              <div className="space-y-2">
                <div className="w-36 h-4 bg-[#1e1a16] rounded" />
                <div className="w-32 h-3 bg-[#1e1a16] rounded" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Array.from({ length: 6 }, (_, i) => `skeleton-repo-${i}`).map(
                (key) => (
                  <div key={key} className="h-24 bg-[#1e1a16] rounded-lg" />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
