import { ExperienceCard } from "./ExperienceCard";
import type { ExperiencePosition, ProcessedExperience } from "./types";
import { getCompanyColor } from "./utils";

interface ExperienceSectionProps {
  isMobile: boolean;
  type: "work" | "volunteer";
  hoveredCard: string | null;
  experiences: ProcessedExperience[];
  setHoveredCard: (id: string | null) => void;
  getExperiencePosition: (exp: ProcessedExperience) => ExperiencePosition;
}

export const ExperienceSection = ({
  type,
  isMobile,
  hoveredCard,
  experiences,
  setHoveredCard,
  getExperiencePosition,
}: ExperienceSectionProps) => {
  if (experiences.length === 0) return null;

  const isWork = type === "work";
  const config = {
    title: isWork ? "Work Experience" : "Volunteer Experience",
    titleColor: isWork ? "text-[#f3ebdd]" : "text-[#4caf7d]",
    lineGradient: isWork
      ? "from-[#d9a55b]/30 via-[#e6b56c]/20 to-transparent"
      : "from-[#4caf7d]/30 via-[#62c48f]/20 to-transparent",
    spacing: isWork ? "mb-16" : "mb-8",
  };

  return (
    <div className={config.spacing}>
      <div className="flex items-center gap-3 mb-8 h-8">
        <h3 className={`font-bold text-xl ${config.titleColor}`}>
          {config.title}
        </h3>
      </div>

      {/* Increased height to accommodate logos above the line */}
      <div className="relative h-30">
        {/* Main timeline line - positioned in the middle */}
        <div
          className={`absolute top-8 left-8 right-8 h-px bg-linear-to-r ${config.lineGradient} rounded-full`}
        />

        {experiences.map((exp, index) => {
          const position = getExperiencePosition(exp);
          const companyColor = getCompanyColor(exp.name, type);
          const expId = `${type}-${index}`;
          const isHovered = hoveredCard === expId;

          return (
            <ExperienceCard
              key={expId}
              exp={exp}
              position={position}
              companyColor={companyColor}
              expId={expId}
              isHovered={isHovered}
              isMobile={isMobile}
              onMouseEnter={() => !isMobile && setHoveredCard(expId)}
              onMouseLeave={() => !isMobile && setHoveredCard(null)}
            />
          );
        })}
      </div>
    </div>
  );
};
