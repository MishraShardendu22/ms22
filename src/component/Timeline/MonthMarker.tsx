import type { MonthData } from "./types";

interface MonthMarkerProps {
  index: number;
  month: MonthData;
  isMobile: boolean;
}

export const MonthMarker = ({ month, index, isMobile }: MonthMarkerProps) => {
  const now = new Date();
  const isCurrentMonth =
    month.year === now.getFullYear() && month.month === now.getMonth();

  return (
    <div
      key={`${month.year}-${month.month}`}
      className="absolute flex flex-col items-center z-20"
      style={{
        left: `${index * (isMobile ? 80 : 120)}px`,
        width: `${isMobile ? 80 : 120}px`,
      }}
    >
      <div className="relative">
        <div
          className={`w-4 h-4 rounded-full border-2 shadow-lg z-10 transition-all duration-300 ${
            isCurrentMonth
              ? "bg-[#d9a55b] border-[#e6b56c] animate-pulse ring-4 ring-[#d9a55b]/30 scale-125"
              : month.isYearStart
                ? "bg-[#f3ebdd] border-[#d9a55b] ring-2 ring-[#d9a55b]/20"
                : "bg-[#2f2923] border-[#413930]"
          }`}
        />
        {isCurrentMonth && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-30">
            <div className="px-3 py-1.5 bg-[#d9a55b] text-[#0e0c0a] text-xs font-bold rounded-lg shadow-lg shadow-[#d9a55b]/30">
              Current
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 text-center">
        <div
          className={`text-xs sm:text-sm font-bold transition-all duration-300 px-2 py-1 rounded-md ${
            isCurrentMonth
              ? "text-[#d9a55b] scale-110 bg-[#d9a55b]/20 shadow-lg shadow-[#d9a55b]/20"
              : month.isYearStart
                ? "text-[#f3ebdd] bg-[#1e1a16] border border-[#2f2923]"
                : "text-[#8e8374]"
          }`}
        >
          {month.monthName}
        </div>
        {month.isYearStart && (
          <div className="text-xs text-[#d9a55b] font-bold mt-1 bg-[#1e1a16] border border-[#2f2923] px-2 py-0.5 rounded">
            {month.year}
          </div>
        )}
      </div>
    </div>
  );
};
