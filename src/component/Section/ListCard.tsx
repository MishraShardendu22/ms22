import Image from "next/image";
import Link from "next/link";
import { LIST_CARD_THEME_CONFIG, type ListCardTheme } from "@/constants/theme";
import { stripMarkdown } from "@/utils/text";
import { ExternalLink } from "./ExternalLink";

export type { ListCardTheme } from "@/constants/theme";

interface ListCardProps {
  id: string;
  href: string;
  theme: ListCardTheme;
  logo?: string;
  title: string;
  subtitle?: string;
  description?: string;
  dateRange?: string;
  technologies?: string[];
  links?: Array<{
    label: string;
    url: string;
  }>;
  isActive?: boolean;
  maxTechDisplay?: number;
}

export function ListCard({
  href,
  theme,
  logo,
  title,
  subtitle,
  description,
  dateRange,
  technologies,
  links,
  isActive,
  maxTechDisplay = 3,
}: ListCardProps) {
  const colors = LIST_CARD_THEME_CONFIG[theme];
  const cleanDescription = stripMarkdown(description);

  return (
    <Link href={href} className="group relative block h-full">
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${colors.gradientBg} rounded-2xl blur-sm opacity-0 group-hover:opacity-20 transition-all duration-500`}
      />
      <div className="relative h-full p-6 bg-[#161311] border border-[#2f2923] rounded-2xl group-hover:border-[#d9a55b]/50 group-hover:shadow-[0_8px_30px_rgba(217,165,91,0.08)] transition-all duration-300 overflow-hidden flex flex-col">
        <div className="flex items-start gap-4 mb-4">
          {logo && (
            <div className="shrink-0 w-12 h-12 rounded-xl bg-[#1e1a16] border border-[#2f2923] flex items-center justify-center overflow-hidden group-hover:border-[#413930] transition-all duration-300 p-1">
              <Image
                src={logo}
                alt={title}
                width={48}
                height={48}
                className="object-contain max-h-full max-w-full"
                loading="lazy"
                sizes="48px"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-[#f3ebdd] line-clamp-1 group-hover:text-[#d9a55b] transition-colors duration-300">
                {title}
              </h3>
              {isActive && (
                <span className="shrink-0 px-2.5 py-1 text-[10px] font-semibold rounded-md bg-[#4caf7d]/10 text-[#4caf7d] border border-[#4caf7d]/25 uppercase tracking-wide shadow-sm">
                  Active
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-sm font-medium mt-1 text-[#d9a55b]/85 line-clamp-1">
                {subtitle}
              </p>
            )}
            {dateRange && (
              <p className="text-[#8e8374] text-xs mt-1.5 font-medium">
                {dateRange}
              </p>
            )}
          </div>
        </div>

        {cleanDescription && (
          <p className="text-[#b9ae9d] text-sm line-clamp-2 mb-4 leading-relaxed flex-1">
            {cleanDescription}
          </p>
        )}

        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.slice(0, maxTechDisplay).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-[#1e1a16] text-[#b9ae9d] text-xs font-medium rounded-lg border border-[#2f2923] hover:border-[#413930] hover:text-[#f3ebdd] transition-all duration-200"
              >
                {tech}
              </span>
            ))}
            {technologies.length > maxTechDisplay && (
              <span className="px-2.5 py-1 bg-[#d9a55b]/10 text-[#d9a55b] text-xs font-semibold rounded-lg border border-[#d9a55b]/25">
                +{technologies.length - maxTechDisplay}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-[#2f2923] mt-auto">
          <div className="flex flex-wrap gap-2">
            {links &&
              links.length > 0 &&
              links.map((link) => (
                <ExternalLink
                  key={link.label}
                  href={link.url}
                  label={link.label}
                  className="px-3 py-1.5 bg-[#d9a55b]/10 text-[#d9a55b] text-xs font-semibold rounded-lg border border-[#d9a55b]/25 hover:bg-[#d9a55b]/20 hover:scale-105 hover:shadow-md transition-all duration-200 truncate"
                />
              ))}
          </div>

          <span className="text-[#d9a55b] text-sm font-semibold group-hover:translate-x-1 transition-all duration-300 shrink-0 flex items-center gap-1">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
