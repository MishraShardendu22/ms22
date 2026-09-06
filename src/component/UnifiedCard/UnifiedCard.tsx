import { ArrowUpRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  UNIFIED_CARD_THEME_CONFIG,
  type UnifiedCardTheme,
} from "@/constants/theme";

interface UnifiedCardProps {
  index: number;
  theme: UnifiedCardTheme;
  logo?: string;
  logoAlt?: string;
  title: string;
  subtitle?: string;
  subtitleIcon?: ReactNode;
  startDate?: string;
  endDate?: string;
  description?: string;
  technologies?: string[];
  certificateUrl?: string;
  certificateLabel?: string;
  badges?: {
    label: string;
    icon?: ReactNode;
  }[];
  extraInfo?: ReactNode;
  headerActions?: ReactNode;
  maxTechDisplay?: number;
  href?: string;
}

export const UnifiedCard = ({
  index,
  theme,
  logo,
  logoAlt,
  title,
  subtitle,
  subtitleIcon,
  startDate,
  endDate,
  description,
  technologies,
  certificateUrl,
  certificateLabel = "Certificate",
  badges,
  extraInfo,
  headerActions,
  maxTechDisplay = 3,
  href,
}: UnifiedCardProps) => {
  const colors = UNIFIED_CARD_THEME_CONFIG[theme];

  return (
    <div
      className="group relative h-full"
      style={{
        opacity: 0,
        animation: `fadeInUp 0.25s ease-out ${Math.min(index * 0.04, 0.2)}s forwards`,
        contain: "layout style paint",
      }}
    >
      <div
        className={`relative h-full flex flex-col bg-linear-to-br from-gray-900/50 to-gray-950/50 border border-gray-800/50 rounded-xl overflow-hidden transition-colors duration-200 ${colors.border}`}
      >
        {href && (
          <Link
            href={href}
            className="absolute inset-0 z-0"
            aria-label={`View details for ${title}`}
          />
        )}
        <div
          className={`absolute inset-0 bg-linear-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none`}
        />

        <div className="relative p-3.5 sm:p-4 flex flex-col justify-between h-full pointer-events-none">
          <div>
            <div className="flex items-center justify-between gap-2.5 mb-2 pointer-events-auto">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                {logo && (
                  <div className="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center overflow-hidden shrink-0">
                    {(logoAlt || subtitle) && (
                      <Image
                        src={logo}
                        alt={logoAlt || subtitle || ""}
                        width={36}
                        height={36}
                        className="object-contain p-1"
                        loading="lazy"
                        sizes="36px"
                      />
                    )}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-base font-bold text-white line-clamp-1 transition-colors duration-200 ${colors.titleHover}`}
                  >
                    {title}
                  </h3>
                  {subtitle && (
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                      {subtitleIcon}
                      <span className="line-clamp-1">{subtitle}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Top-Right Header Action Buttons / Badges */}
              <div className="flex items-center gap-1.5 shrink-0 relative z-10">
                {headerActions}
                {badges?.map((badge) => (
                  <span
                    key={badge.label}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold ${colors.certificateBg} ${colors.certificateText} rounded-md ${colors.certificateBorder}`}
                  >
                    {badge.icon}
                    {badge.label}
                  </span>
                ))}
                {certificateUrl && (
                  <Link
                    href={certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium ${colors.certificateBg} ${colors.certificateText} rounded-md transition-all duration-200 ${colors.certificateBorder}`}
                    aria-label={`View ${certificateLabel.toLowerCase()}`}
                  >
                    <span>{certificateLabel}</span>
                  </Link>
                )}
              </div>
            </div>

            {(startDate || endDate || extraInfo) && (
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2 pointer-events-auto">
                {(startDate || endDate) && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {startDate && endDate
                        ? `${startDate} - ${endDate}`
                        : startDate || endDate}
                    </span>
                  </div>
                )}
                {extraInfo}
              </div>
            )}

            {description && (
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-2.5 line-clamp-2 pointer-events-auto">
                {description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 pointer-events-auto pt-2 mt-auto">
            <div className="flex flex-wrap items-center gap-1.5 text-xs min-w-0 flex-1">
              {technologies && technologies.length > 0 && (
                <>
                  {technologies.slice(0, maxTechDisplay).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 font-medium bg-gray-800/60 text-gray-300 rounded-md border border-gray-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                  {technologies.length > maxTechDisplay && (
                    <span
                      className={`px-2 py-0.5 font-medium ${colors.techExtraBg} ${colors.techExtraText} rounded-md border ${colors.techExtraBorder}`}
                    >
                      +{technologies.length - maxTechDisplay}
                    </span>
                  )}
                </>
              )}
            </div>

            {href && (
              <Link
                href={href}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium ${colors.certificateBg} ${colors.certificateText} rounded-md border ${colors.certificateBorder} transition-all duration-200 shrink-0 relative z-10 self-end ml-auto`}
                aria-label={`View details for ${title}`}
              >
                <span>View</span>
                <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
