export const TimelineLegend = () => {
  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <div className="bg-[#161311] border border-[#2f2923] rounded-2xl p-8 shadow-2xl shadow-[#d9a55b]/5">
        <h3 className="text-lg font-bold bg-linear-to-r from-[#f3ebdd] via-[#d9a55b] to-[#e6b56c] bg-clip-text text-transparent text-center mb-6">
          Timeline Legend
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-4 p-4 bg-[#1e1a16] rounded-xl border border-[#d9a55b]/20 w-full max-w-xs backdrop-blur-sm">
            <div className="w-3 h-3 rounded-full bg-[#d9a55b] shadow-lg shadow-[#d9a55b]/30"></div>
            <div className="flex-1 text-center sm:text-left">
              <div className="font-bold text-[#f3ebdd] text-sm">
                Work Experience
              </div>
              <div className="text-xs text-[#8e8374] mt-0.5">
                Professional roles
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-[#1e1a16] rounded-xl border border-[#4caf7d]/20 w-full max-w-xs backdrop-blur-sm">
            <div className="w-3 h-3 rounded-full bg-[#4caf7d] shadow-lg shadow-[#4caf7d]/30"></div>
            <div className="flex-1 text-center sm:text-left">
              <div className="font-bold text-[#f3ebdd] text-sm">
                Volunteer Work
              </div>
              <div className="text-xs text-[#8e8374] mt-0.5">
                Community service
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 ">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-sm text-[#8e8374]">
              <div className="w-8 h-2 bg-linear-to-r from-[#d9a55b] via-[#e6b56c] to-[#4caf7d] rounded-full shadow-lg shadow-[#d9a55b]/20"></div>
              <span>Most recent to earliest</span>
            </div>
            <div className="text-sm text-[#8e8374]">
              <span>Scroll to explore full history</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
