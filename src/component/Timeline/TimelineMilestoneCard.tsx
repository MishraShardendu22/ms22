import Image from "next/image";
import type { ProcessedExperience } from "./types";
import { formatDateSpan, getCompanyColor } from "./utils";

interface TimelineMilestoneCardProps {
  exp: ProcessedExperience;
  isLast: boolean;
}

export const TimelineMilestoneCard = ({
  exp,
  isLast,
}: TimelineMilestoneCardProps) => {
  const { spanText, isCurrent, durationText } = formatDateSpan(
    exp.start_date,
    exp.end_date,
  );
  const companyColor = getCompanyColor(exp.name, exp.type);
  const isWork = exp.type === "work";

  return (
    <div className="relative flex gap-4 sm:gap-6 md:gap-8 group">
      {/* Vertical Spine & Node Indicator */}
      <div className="flex flex-col items-center shrink-0">
        {/* Milestone Node */}
        <div
          className={`relative z-10 flex items-center justify-center transition-colors duration-200 ${
            isCurrent
              ? "w-5 h-5 rounded-full bg-[#0e0c0a] border-2 border-[#d9a55b] shadow-[0_0_16px_rgba(217,165,91,0.4)]"
              : "w-4 h-4 rounded-full bg-[#161311] border-2 border-[#413930] group-hover:border-[#d9a55b]/70"
          }`}
        >
          {isCurrent && (
            <span className="w-2 h-2 rounded-full bg-[#d9a55b] animate-pulse" />
          )}
        </div>

        {/* Continuous Connecting Line to next milestone */}
        {!isLast && (
          <div className="w-px flex-1 bg-linear-to-b from-[#2f2923] via-[#2f2923] to-transparent my-1" />
        )}
      </div>

      {/* Milestone Card Surface */}
      <div className="flex-1 min-w-0 pb-10 sm:pb-12">
        <div
          className="rounded-2xl border border-[#2f2923] bg-[#161311] p-5 sm:p-6 transition-colors duration-200 hover:border-[#413930] hover:bg-[#181412] shadow-xl"
          style={{
            borderLeftColor: isCurrent ? companyColor : undefined,
            borderLeftWidth: isCurrent ? "3px" : undefined,
          }}
        >
          {/* Top Row: Meta Badges & Tenure */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-full border ${
                  isWork
                    ? "bg-[#d9a55b]/10 text-[#d9a55b] border-[#d9a55b]/30"
                    : "bg-[#4caf7d]/10 text-[#4caf7d] border-[#4caf7d]/30"
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: companyColor }}
                />
                {isWork ? "Work Experience" : "Open Source & Community"}
              </span>

              {isCurrent && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#d9a55b] bg-[#d9a55b]/10 border border-[#d9a55b]/30 rounded-full font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d9a55b] animate-pulse" />
                  Active Role
                </span>
              )}
            </div>

            <div className="text-xs font-mono text-[#8e8374] flex items-center gap-2">
              <span>{spanText}</span>
              {durationText && (
                <>
                  <span className="text-[#413930]">·</span>
                  <span className="text-[#b9ae9d]">{durationText}</span>
                </>
              )}
            </div>
          </div>

          {/* Main Content: Logo, Title, Company */}
          <div className="flex items-start gap-4">
            {/* Company / Org Logo */}
            <div className="shrink-0 w-12 h-12 rounded-xl bg-[#1e1a16] border border-[#2f2923] p-1.5 flex items-center justify-center overflow-hidden">
              {exp.logo ? (
                <Image
                  src={exp.logo}
                  alt={exp.name}
                  width={36}
                  height={36}
                  className="object-contain rounded-lg"
                  sizes="36px"
                />
              ) : (
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-[#0e0c0a]"
                  style={{ backgroundColor: companyColor }}
                >
                  {exp.name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            {/* Position & Company Name */}
            <div className="min-w-0 flex-1">
              <h4 className="text-base sm:text-lg font-semibold text-[#f3ebdd] leading-snug font-sans group-hover:text-[#f3ebdd]">
                {exp.position}
              </h4>
              <p className="text-sm font-mono text-[#d9a55b] mt-0.5">
                {exp.name}
              </p>
            </div>
          </div>

          {/* Role Description */}
          {exp.description && (
            <p className="mt-4 text-xs sm:text-sm text-[#b9ae9d] leading-relaxed font-sans">
              {exp.description}
            </p>
          )}

          {/* Technologies Used */}
          {exp.technologies && exp.technologies.length > 0 && (
            <div className="mt-4 pt-3.5 border-t border-[#2f2923]/60 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8e8374] mr-1">
                Stack:
              </span>
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-[#1e1a16] border border-[#2f2923] text-[#8e8374] hover:text-[#f3ebdd] hover:border-[#d9a55b]/40 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
