import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { StatStrip } from "@/component/Hero/StatStrip";
import { GitHubIcon } from "@/component/Icons";
import { Kicker } from "@/component/Section/PageHeader";
import { myIntro, SocialLinks } from "@/static/info/header";
import { BUTTON_LABELS } from "@/static/ui";

export const TextContent = () => {
  return (
    <div className="lg:col-span-7 text-left space-y-4 md:space-y-5 relative z-10 order-2 lg:order-1">
      <Kicker>Software Developer &amp; Systems Researcher</Kicker>

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#f3ebdd] font-serif leading-[1.12]">
        Engineering high-reliability systems, CLI engines &amp;{" "}
        <em className="italic text-[#d9a55b]">autonomous</em> agents.
      </h1>

      <p className="text-sm sm:text-base md:text-lg text-[#b9ae9d] leading-relaxed max-w-2xl font-sans">
        Hi, I&apos;m{" "}
        <span className="text-[#f3ebdd] font-semibold">{myIntro.name}</span>. I
        design scalable architectures in Go, cross-platform CLI engines,
        autonomous agent protocols, and high-performance web systems with strict
        test gates and zero downtime.
      </p>

      {/* Action CTAs */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#d9a55b] hover:bg-[#e6b56c] text-[#0e0c0a] font-semibold text-sm transition-all duration-200 shadow-[0_2px_12px_rgba(217,165,91,0.25)] hover:shadow-[0_4px_20px_rgba(217,165,91,0.35)]"
        >
          <span>Explore Projects</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <a
          href="https://github.com/MishraShardendu22"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#161311] hover:bg-[#1e1a16] border border-[#2f2923] hover:border-[#413930] text-[#f3ebdd] font-semibold text-sm transition-all duration-200"
        >
          <GitHubIcon className="w-4 h-4 text-[#8e8374] group-hover:text-[#f3ebdd] transition-colors" />
          <span>GitHub Profile</span>
        </a>
      </div>

      {/* Metrics Stat Strip */}
      <StatStrip
        items={[
          { value: "15+", label: "Production Repos" },
          { value: "30", label: "Agent Protocols" },
          { value: "100%", label: "Test Pass Rate" },
          { value: "Go · TS · Python", label: "Core Toolchains" },
        ]}
      />

      {/* Verified Channels Footer */}
      <div className="flex gap-2 flex-wrap pt-2 items-center">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#8e8374] mr-1">
          Channels:
        </span>
        {Object.entries(SocialLinks).map(([key, link]) => {
          const IconComponent = link.icon;
          const label = BUTTON_LABELS[key] || key;

          return (
            <a
              key={key}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#161311] hover:bg-[#1e1a16] border border-[#2f2923] hover:border-[#413930] rounded-md transition-all duration-200 text-xs font-medium text-[#b9ae9d] hover:text-[#f3ebdd]"
              aria-label={label}
            >
              {IconComponent && (
                <IconComponent className="w-3.5 h-3.5 text-[#8e8374] group-hover:text-[#d9a55b] shrink-0" />
              )}
              <span>{label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};
