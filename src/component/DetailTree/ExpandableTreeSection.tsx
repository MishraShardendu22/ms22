"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  DETAIL_TREE_THEME_CONFIG,
  type DetailTreeTheme,
} from "@/constants/theme";
import type { TreeSection } from "@/types/detailTree";

interface ExpandableTreeSectionProps {
  section: TreeSection;
  theme: DetailTreeTheme;
}

export function ExpandableTreeSection({
  section,
  theme,
}: ExpandableTreeSectionProps) {
  const [isExpanded, setIsExpanded] = useState(
    section.defaultExpanded ?? false,
  );
  const colors = DETAIL_TREE_THEME_CONFIG[theme];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`border ${colors.border} rounded-xl bg-[#161311] overflow-hidden transition-all`}
    >
      {/* Header */}
      <button
        type="button"
        onClick={toggleExpanded}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#1e1a16] transition-colors"
        aria-expanded={isExpanded}
      >
        <h3 className="text-base font-semibold text-[#f3ebdd] text-left">
          {section.title}
        </h3>
        <div className={`shrink-0 ${colors.text}`}>
          {isExpanded ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="px-5 pb-5 border-t border-[#2f2923]">
          <div className="pt-4">
            <SectionContent content={section.content} theme={theme} />
          </div>
        </div>
      )}
    </div>
  );
}

interface SectionContentProps {
  content: TreeSection["content"];
  theme: DetailTreeTheme;
}

function SectionContent({ content, theme }: SectionContentProps) {
  const colors = DETAIL_TREE_THEME_CONFIG[theme];

  switch (content.type) {
    case "text":
      return (
        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
          {content.value}
        </p>
      );

    case "list":
      return (
        <ul className="space-y-2">
          {content.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <div
                className={`w-1.5 h-1.5 rounded-full ${colors.bullet} mt-2 shrink-0`}
              />
              <span className="text-gray-300 leading-relaxed flex-1">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );

    case "timeline":
      return (
        <div className="space-y-4">
          {content.items.map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <div
                className={`w-2 h-2 rounded-full ${colors.bullet} mt-1.5 shrink-0`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium">{item.title}</p>
                {item.subtitle && (
                  <p className="text-gray-400 text-sm">{item.subtitle}</p>
                )}
                <p className="text-gray-500 text-sm mt-1">
                  {item.startDate}
                  {" — "}
                  {item.endDate || (item.isCurrent ? "Present" : "N/A")}
                </p>
              </div>
            </div>
          ))}
        </div>
      );

    case "tags":
      return (
        <div className="flex flex-wrap gap-2">
          {content.items.map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1.5 text-xs font-medium ${colors.bg} ${colors.text} rounded-lg border ${colors.border}`}
            >
              {tag}
            </span>
          ))}
        </div>
      );

    case "metadata":
      return (
        <div className="space-y-3">
          {content.fields.map((field) => (
            <div key={field.label} className="flex items-start gap-3">
              <div className="text-[#8e8374] text-sm font-medium min-w-25">
                {field.label}:
              </div>
              <div className="text-[#f3ebdd] text-sm flex-1">{field.value}</div>
            </div>
          ))}
        </div>
      );

    case "relatedProjects":
      return (
        <div className="space-y-3">
          {content.projects.map((project) => (
            <a
              key={project.id}
              href={`/projects/${project.id}`}
              className="block p-4 bg-[#1e1a16] rounded-lg border border-[#2f2923] hover:border-[#d9a55b]/40 transition-all"
            >
              <h4
                className={`text-[#f3ebdd] font-medium ${colors.text} hover:underline`}
              >
                {project.name}
              </h4>
              {project.description && (
                <p className="text-[#8e8374] text-sm mt-1 line-clamp-2">
                  {project.description}
                </p>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={`${project.id}-tech-${tech}`}
                      className="px-2 py-0.5 text-xs font-medium bg-[#27221c] text-[#b9ae9d] border border-[#2f2923] rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-[#27221c] text-[#8e8374] border border-[#2f2923] rounded">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
              )}
            </a>
          ))}
        </div>
      );

    case "images":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {content.urls.map((url) => (
            <div
              key={url}
              className="relative aspect-video rounded-lg overflow-hidden bg-[#1e1a16] border border-[#2f2923]"
            >
              <Image
                src={url}
                alt={content.alt}
                className="object-cover"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
