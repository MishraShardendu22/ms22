import type { ReactNode } from "react";
import type { SectionTheme } from "@/constants/theme";

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
  className = "",
}: SectionWrapperProps) {
  return (
    <section
      className={`relative py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 bg-transparent ${className}`}
    >
      <div className="container mx-auto max-w-7xl w-full relative z-10">
        {children}
      </div>
    </section>
  );
}
