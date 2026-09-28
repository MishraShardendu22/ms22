import type { ReactNode } from "react";
import {
  SECTION_WRAPPER_THEME_CONFIG,
  type SectionTheme,
} from "@/constants/theme";

interface SectionWrapperProps {
  children: ReactNode;
  theme?: SectionTheme;
  className?: string;
}

/**
 * Reusable section wrapper with consistent background styling
 */
export function SectionWrapper({
  children,
  theme = "violet",
  className = "",
}: SectionWrapperProps) {
  const gradients = SECTION_WRAPPER_THEME_CONFIG[theme];

  return (
    <section
      className={`relative py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-[#0e0c0a]/50 to-transparent overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 pointer-events-none will-change-auto">
        <div
          className={`absolute top-1/4 left-1/4 w-64 h-64 md:w-80 md:h-80 ${gradients.primary} rounded-full blur-2xl`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-64 h-64 md:w-80 md:h-80 ${gradients.secondary} rounded-full blur-2xl`}
        />
        <div className="absolute inset-0 bg-grid-lines" />
      </div>
      <div className="container mx-auto max-w-7xl w-full relative z-10">
        {children}
      </div>
    </section>
  );
}
