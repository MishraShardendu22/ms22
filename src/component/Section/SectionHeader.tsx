import type { ReactNode } from "react";
import { SECTION_HEADER_GRADIENTS, type SectionTheme } from "@/constants/theme";

interface SectionHeaderProps {
  title: string;
  theme?: SectionTheme;
  description?: string;
  children?: ReactNode;
}

export function SectionHeader({
  title,
  description,
  theme = "violet",
  children,
}: SectionHeaderProps) {
  const gradient = SECTION_HEADER_GRADIENTS[theme];

  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="text-center lg:text-left">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal font-serif bg-linear-to-r ${gradient} bg-clip-text text-transparent`}
            >
              {title}
            </h2>
          </div>
          {children}
        </div>
        {description && (
          <p className="text-gray-400 text-sm md:text-base lg:text-lg text-center lg:text-left max-w-3xl">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
