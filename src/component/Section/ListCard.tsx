import { ArrowUpRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ListCardTheme } from "@/constants/theme";
import { stripMarkdown } from "@/utils/text";

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

/** Observatory List Surface Row: cohesive row layout with icon tile, meta, tech pills, and trailing actions. */
export function ListCard({
  href,
  logo,
  title,
  subtitle,
  description,
  dateRange,
  technologies,
  links,
  isActive,
  maxTechDisplay = 4,
}: ListCardProps) {
  const cleanDescription = stripMarkdown(description);

  return (
    <div className="group relative block w-full border-b border-[#2f2923] last:border-b-0 hover:bg-[#1e1a16]/70 transition-all duration-200">
      <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Stack: Leading Icon + Info */}
        <div className="flex items-start gap-3.5 min-w-0 flex-1">
          {logo ? (
            <div className="shrink-0 w-10 h-10 rounded-2xl bg-[#1e1a16] border border-[#2f2923] flex items-center justify-center overflow-hidden group-hover:border-[#413930] transition-colors p-1">
              <Image
                src={logo}
                alt={title}
                width={40}
                height={40}
                className="object-contain max-h-full max-w-full"
                loading="lazy"
                sizes="40px"
              />
            </div>
          ) : (
            <div className="shrink-0 w-10 h-10 rounded-2xl bg-[#1e1a16] border border-[#2f2923] flex items-center justify-center text-[#d9a55b] font-mono text-sm font-bold group-hover:border-[#d9a55b]/40 transition-colors">
              {title.slice(0, 2).toUpperCase()}
            </div>
          )}

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={href}
                className="font-mono text-sm sm:text-base font-semibold text-[#f3ebdd] group-hover:text-[#d9a55b] transition-colors hover:underline underline-offset-4 truncate"
              >
                {title}
              </Link>
              {isActive && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-mono font-medium rounded-full bg-[#4caf7d]/10 text-[#4caf7d] border border-[#4caf7d]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4caf7d] animate-pulse" />
                  Active
                </span>
              )}
            </div>

            {(subtitle || dateRange) && (
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#8e8374] font-medium">
                {subtitle && (
                  <span className="text-[#d9a55b]/80">{subtitle}</span>
                )}
                {subtitle && dateRange && <span>&middot;</span>}
                {dateRange && <span>{dateRange}</span>}
              </div>
            )}

            {cleanDescription && (
              <p className="text-xs sm:text-sm text-[#b9ae9d] line-clamp-2 leading-relaxed pt-0.5">
                {cleanDescription}
              </p>
            )}

            {technologies && technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {technologies.slice(0, maxTechDisplay).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 bg-[#161311] text-[#b9ae9d] text-[11px] font-mono rounded-full border border-[#2f2923] hover:border-[#413930] hover:text-[#f3ebdd] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
                {technologies.length > maxTechDisplay && (
                  <span className="px-2 py-0.5 text-[11px] font-mono text-[#8e8374] rounded-full bg-[#1e1a16] border border-[#2f2923]">
                    +{technologies.length - maxTechDisplay}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Stack: Action Links & Detail Chevron */}
        <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 self-end md:self-center">
          {links && links.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1e1a16] hover:bg-[#27221c] border border-[#2f2923] hover:border-[#d9a55b]/40 text-[#d9a55b] text-xs font-mono font-medium transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              ))}
            </div>
          )}

          <Link
            href={href}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#8e8374] group-hover:text-[#d9a55b] transition-all p-1.5 rounded-full hover:bg-[#1e1a16]"
            aria-label={`View details for ${title}`}
          >
            <span className="hidden sm:inline">Details</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
