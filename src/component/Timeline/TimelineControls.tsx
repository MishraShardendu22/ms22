import { ArrowLeft, ArrowRight } from "lucide-react";

interface TimelineControlsProps {
  isMobile: boolean;
  onScroll: (direction: "left" | "right") => void;
}

export const TimelineControls = ({
  isMobile,
  onScroll,
}: TimelineControlsProps) => {
  return (
    <>
      {!isMobile && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => onScroll("left")}
            className="p-4 bg-[#161311] border border-[#2f2923] rounded-xl shadow-lg shadow-[#d9a55b]/5 hover:border-[#d9a55b]/40 hover:shadow-[#d9a55b]/10 transition-all duration-300 group"
            aria-label="Scroll left"
          >
            <ArrowLeft className="w-5 h-5 text-[#d9a55b] group-hover:text-[#e6b56c] transition-colors" />
          </button>
          <button
            type="button"
            onClick={() => onScroll("right")}
            className="p-4 bg-[#161311] border border-[#2f2923] rounded-xl shadow-lg shadow-[#d9a55b]/5 hover:border-[#d9a55b]/40 hover:shadow-[#d9a55b]/10 transition-all duration-300 group"
            aria-label="Scroll right"
          >
            <ArrowRight className="w-5 h-5 text-[#d9a55b] group-hover:text-[#e6b56c] transition-colors" />
          </button>
        </div>
      )}

      <div className="text-center mt-6">
        <p className="text-xs text-[#8e8374] font-medium flex items-center justify-center gap-2">
          {isMobile ? (
            <>
              <span className="text-[#d9a55b]">←</span>
              Swipe to explore timeline
              <span className="text-[#d9a55b]">→</span>
            </>
          ) : (
            <>
              <span className="text-[#d9a55b]">←</span>
              Scroll horizontally to explore timeline
              <span className="text-[#d9a55b]">→</span>
            </>
          )}
        </p>
      </div>
    </>
  );
};
