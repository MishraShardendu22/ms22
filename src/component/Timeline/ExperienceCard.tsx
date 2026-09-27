import Image from "next/image";
import type { ExperiencePosition, ProcessedExperience } from "./types";

interface ExperienceCardProps {
  expId: string;
  isMobile: boolean;
  isHovered: boolean;
  companyColor: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  exp: ProcessedExperience;
  position: ExperiencePosition;
}

export const ExperienceCard = ({
  exp,
  position,
  isHovered,
  companyColor,
  onMouseEnter,
  onMouseLeave,
}: ExperienceCardProps) => {
  return (
    <>
      <button
        type="button"
        className="absolute rounded-full transition-[height,transform,box-shadow] duration-200 cursor-pointer shadow-lg border-none bg-transparent p-0"
        style={{
          left: `${position.left}px`,
          width: `${position.width}px`,
          top: "32px",
          background: `linear-gradient(90deg, ${companyColor}E6 0%, ${companyColor}CC 100%)`,
          height: isHovered ? "10px" : "8px",
          transform: isHovered ? "translateY(-1px)" : "none",
          boxShadow: isHovered
            ? `0 0 16px ${companyColor}60, 0 4px 10px ${companyColor}30`
            : `0 2px 6px ${companyColor}30`,
          zIndex: isHovered ? 15 : 5,
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onMouseEnter}
        onBlur={onMouseLeave}
        aria-label={`Experience at ${exp.name}`}
      >
        <div
          className="absolute -left-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-[#0e0c0a] shadow-lg"
          style={{
            backgroundColor: companyColor,
            boxShadow: `0 0 10px ${companyColor}80`,
          }}
        />

        <div
          className={`
            absolute -right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-[#0e0c0a] shadow-lg
            ${!exp.end_date ? "animate-pulse" : ""}
          `}
          style={{
            backgroundColor: companyColor,
            boxShadow: !exp.end_date
              ? `0 0 20px ${companyColor}`
              : `0 0 10px ${companyColor}80`,
          }}
        />
      </button>

      <button
        type="button"
        className="absolute transition-[transform] duration-200 border-none bg-transparent p-0"
        style={{
          left: `${position.left + position.width / 2 - 28}px`,
          top: "4px",
          zIndex: isHovered ? 100 : 30,
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onMouseEnter}
        onBlur={onMouseLeave}
        aria-label={`${exp.name} logo`}
      >
        <div
          className={`
            w-14 h-14 rounded-xl bg-[#161311] 
            flex items-center justify-center cursor-pointer border-2
            transition-transform duration-200 shadow-lg
            ${isHovered ? "scale-125" : "hover:scale-105"}
          `}
          style={{
            borderColor: companyColor,
            boxShadow: isHovered ? `0 0 20px ${companyColor}30` : undefined,
          }}
        >
          {exp.logo ? (
            <Image
              src={exp.logo}
              alt={exp.name}
              width={36}
              height={36}
              className="object-contain rounded-lg"
              sizes="(max-width: 768px) 36px, 36px"
            />
          ) : (
            <div
              className="w-7 h-7 rounded-lg"
              style={{ backgroundColor: companyColor }}
            ></div>
          )}
        </div>

        <div
          className={`
            absolute top-16 left-1/2 -translate-x-1/2 
            px-4 py-3 bg-[#161311]
            border rounded-xl shadow-xl text-xs font-medium whitespace-nowrap
            transition-opacity duration-150
            ${isHovered ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
          style={{
            borderColor: companyColor,
            boxShadow: `0 8px 24px ${companyColor}20`,
            zIndex: 1000,
          }}
        >
          <div className="font-bold text-[#f3ebdd]">{exp.name}</div>
          <div className="text-xs text-[#b9ae9d] mt-1">{exp.position}</div>

          <div
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
            style={{
              background: "#161311",
              borderLeft: `1px solid ${companyColor}`,
              borderTop: `1px solid ${companyColor}`,
            }}
          />
        </div>
      </button>

      <div
        className="absolute text-xs text-[#8e8374] text-center font-medium pointer-events-none my-6"
        style={{
          left: `${position.left}px`,
          width: `${position.width}px`,
          top: "48px",
        }}
      >
        {exp.startMonth.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })}{" "}
        <span className="text-[#8e8374]">→</span>{" "}
        {exp.end_date ? (
          exp.endMonth.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        ) : (
          <span
            className={`${exp.type === "work" ? "text-[#d9a55b]" : "text-[#4caf7d]"} font-bold`}
          >
            Present
          </span>
        )}
      </div>
    </>
  );
};
