import {
  ArrowUpRight,
  Award,
  BookOpen,
  Camera,
  Code,
  Code2,
  Coffee,
  Cpu,
  Folder,
  Heart,
  MapPin,
  Package,
  Play,
  Rss,
  Send,
  Share2,
  Shield,
  Terminal,
  Users,
} from "lucide-react";
import Image from "next/image";
import { ContactFormWrapper } from "@/component/Contact/ContactFormWrapper";
import {
  GitHubIcon,
  InstagramIcon,
  LeetCodeIcon,
  LinkedInIcon,
  TwitterXIcon,
  YouTubeIcon,
} from "@/component/Icons";
import {
  CodingProfiles,
  images,
  MyWebsites,
  QuickLinks,
  SocialMedia,
} from "@/static/info/footer";
import { ScrollToTop } from "./ScrollToTop";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Cpu,
  Terminal,
  Send,
  Users,
  Play,
  Camera,
  Share2,
  Rss,
  Folder,
  Award,
  Shield,
  BookOpen,
  MapPin,
  Package,
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Twitter: TwitterXIcon,
  YouTube: YouTubeIcon,
  Instagram: InstagramIcon,
  LeetCode: LeetCodeIcon,
};

function NavLink({
  href,
  label,
  icon,
  external = false,
  compact = false,
}: {
  href: string;
  label: string;
  icon?: string;
  external?: boolean;
  compact?: boolean;
}) {
  const IconComponent = icon ? iconMap[icon as keyof typeof iconMap] : null;
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`group flex items-center min-w-0 transition-colors duration-200 ${
          compact
            ? "gap-2 py-2 px-2.5 text-xs sm:text-sm text-[#b9ae9d] hover:text-[#d9a55b] bg-[#1e1a16]/50 hover:bg-[#1e1a16] border border-[#2f2923] hover:border-[#d9a55b]/40 rounded-xl"
            : "gap-3.5 py-2.5 sm:py-3 text-base sm:text-lg lg:text-xl text-[#b9ae9d] hover:text-[#d9a55b]"
        }`}
      >
        {IconComponent && (
          <IconComponent
            className={`shrink-0 text-[#8e8374] group-hover:text-[#d9a55b] transition-colors ${
              compact ? "w-4 h-4" : "w-5 h-5"
            }`}
          />
        )}
        <span className="font-sans font-medium truncate">{label}</span>
        {external && (
          <ArrowUpRight
            className={`ml-auto shrink-0 opacity-0 group-hover:opacity-75 transition-opacity ${
              compact ? "w-3.5 h-3.5" : "w-4 h-4"
            }`}
          />
        )}
      </a>
    </li>
  );
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-3xl sm:text-4xl font-normal text-[#f3ebdd] font-serif tracking-tight mb-5 sm:mb-7">
      {children}
    </h3>
  );
}

export function FooterSectionMobile() {
  return (
    <footer className="relative bg-transparent px-4 pb-12 pt-8">
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="mb-8 rounded-2xl border border-[#2f2923] bg-[#161311]/80 p-6">
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-xl bg-[#d9a55b]/10 border border-[#d9a55b]/25 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-[#d9a55b]" />
            </div>
            <div>
              <h2 className="text-3xl font-normal text-[#f3ebdd] font-serif tracking-tight">
                Shardendu <span className="italic text-[#d9a55b]">Mishra</span>
              </h2>
              <p className="text-xs uppercase tracking-[0.3em] text-[#d9a55b]">
                Software Engineer
              </p>
            </div>
          </div>
          <p className="mt-4 text-base sm:text-lg text-[#b9ae9d] leading-relaxed">
            Software Engineer engineering modern, high-impact systems.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em]">
            <span className="rounded-full border border-[#2f2923] bg-[#1e1a16] px-3 py-1 text-[#b9ae9d]">
              Go
            </span>
            <span className="rounded-full border border-[#d9a55b]/25 bg-[#d9a55b]/10 px-3 py-1 text-[#d9a55b]">
              Next.js
            </span>
            <span className="rounded-full border border-[#2f2923] bg-[#1e1a16] px-3 py-1 text-[#b9ae9d]">
              AI/ML
            </span>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-[#2f2923] bg-[#161311]/60 p-6 shadow-[0_4px_24px_rgba(217,165,91,0.05)]">
          <h3 className="text-3xl font-normal text-[#f3ebdd] mb-3 font-serif tracking-tight">
            Let&apos;s <span className="italic text-[#d9a55b]">Talk</span>
          </h3>
          <div className="bg-[#0e0c0a]/80 p-4 rounded-xl border border-[#2f2923]">
            <ContactFormWrapper variant="compact" includeSubject={false} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <section className="rounded-2xl border border-[#2f2923] bg-[#161311]/40 p-5">
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul className="grid grid-cols-2 gap-2">
              {Object.entries(QuickLinks).map(([key, data]) => (
                <NavLink
                  key={key}
                  href={data.url}
                  label={key}
                  icon={data.icon}
                  compact
                />
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-[#2f2923] bg-[#161311]/40 p-5">
            <ColumnHeading>My Websites</ColumnHeading>
            <ul className="grid grid-cols-2 gap-2">
              {Object.entries(MyWebsites).map(([key, data]) => (
                <NavLink
                  key={key}
                  href={data.url}
                  label={data.name}
                  icon={data.icon}
                  external
                  compact
                />
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-[#2f2923] bg-[#161311]/40 p-5">
            <ColumnHeading>Social Media</ColumnHeading>
            <ul className="grid grid-cols-2 gap-2">
              {Object.entries(SocialMedia).map(([key, data]) => (
                <NavLink
                  key={key}
                  href={data.url}
                  label={key}
                  icon={data.icon}
                  external
                  compact
                />
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-[#2f2923] bg-[#161311]/40 p-5">
            <ColumnHeading>Coding</ColumnHeading>
            <ul className="grid grid-cols-2 gap-2">
              {Object.entries(CodingProfiles).map(([key, data]) => (
                <NavLink
                  key={key}
                  href={data.url}
                  label={key}
                  icon={data.icon}
                  external
                  compact
                />
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-[#2f2923] pt-5 text-sm sm:text-base text-[#8e8374]">
          <p>Shardendu Mishra</p>
          <ScrollToTop variant="mobile" />
        </div>
      </div>
    </footer>
  );
}

export function FooterSection() {
  return (
    <footer className="relative bg-transparent pt-12 md:pt-16 pb-14 px-6 md:px-8">
      <div className="container mx-auto max-w-7xl w-full relative z-10">
        {/* Top row: Identity + Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 mb-14 md:mb-20">
          {/* Left: identity */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-normal text-[#f3ebdd] font-serif tracking-tight leading-none">
                  Shardendu{" "}
                  <span className="italic text-[#d9a55b]">Mishra</span>
                </h2>
                <span className="text-sm sm:text-base px-3.5 py-1 rounded-full border border-[#d9a55b]/30 bg-[#d9a55b]/10 text-[#d9a55b] font-mono font-medium">
                  Ecosystem
                </span>
              </div>
              <p className="text-[#b9ae9d] text-lg sm:text-xl lg:text-2xl font-sans leading-relaxed max-w-xl">
                Software Engineer engineering modern, high-impact systems.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-base sm:text-lg lg:text-xl text-[#8e8374]">
              <span>Made with</span>
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <span>and</span>
              <Coffee className="w-5 h-5 text-[#d9a55b]" />
              <span>
                by{" "}
                <span className="font-serif italic text-lg sm:text-xl lg:text-2xl text-[#f3ebdd]">
                  Shardendu Mishra
                </span>
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-[#1e1a16] border border-[#2f2923] rounded-xl text-sm sm:text-base text-[#b9ae9d] font-semibold">
                Go
              </span>
              <span className="px-4 py-2 bg-[#d9a55b]/10 border border-[#d9a55b]/25 rounded-xl text-sm sm:text-base text-[#d9a55b] font-semibold">
                Next.js
              </span>
              <span className="px-4 py-2 bg-[#1e1a16] border border-[#2f2923] rounded-xl text-sm sm:text-base text-[#b9ae9d] font-semibold">
                Kubernetes
              </span>
              <span className="px-4 py-2 bg-[#1e1a16] border border-[#2f2923] rounded-xl text-sm sm:text-base text-[#b9ae9d] font-semibold">
                AI/ML
              </span>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-[#8e8374]">
              © 2026 Shardendu Mishra. All rights reserved.
            </p>

            <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
              <div className="flex items-center gap-2.5 sm:gap-3 text-sm sm:text-base lg:text-lg text-[#b9ae9d]">
                <span>Made</span>
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 shrink-0">
                  <Image
                    src={images.go.loc}
                    alt={images.go.alt}
                    fill
                    unoptimized
                    className="object-contain"
                    sizes="32px"
                  />
                </div>
                <span>in mind and</span>
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 shrink-0">
                  <Image
                    src={images.fedora.loc}
                    alt={images.fedora.alt}
                    fill
                    unoptimized
                    className="object-contain"
                    sizes="32px"
                  />
                </div>
                <span>in Machine.</span>
              </div>
              <ScrollToTop variant="desktop" />
            </div>
          </div>

          {/* Right: contact */}
          <div>
            <div className="mb-5 sm:mb-7">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#f3ebdd] mb-3 font-serif tracking-tight leading-none">
                Let&apos;s <span className="italic text-[#d9a55b]">Talk</span>
              </h3>
              <p className="text-[#8e8374] text-base sm:text-lg lg:text-xl">
                Get in touch with me
              </p>
            </div>
            <div className="bg-[#161311]/80 backdrop-blur-sm p-6 sm:p-7 md:p-9 rounded-2xl border border-[#2f2923] shadow-2xl">
              <ContactFormWrapper variant="default" includeSubject={false} />
            </div>
          </div>
        </div>

        {/* Nav link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-14 sm:mb-20">
          <div>
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul className="space-y-3.5">
              {Object.entries(QuickLinks).map(([key, data]) => (
                <NavLink
                  key={key}
                  href={data.url}
                  label={key}
                  icon={data.icon}
                />
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>My Websites</ColumnHeading>
            <ul className="space-y-3.5">
              {Object.entries(MyWebsites).map(([key, data]) => (
                <NavLink
                  key={key}
                  href={data.url}
                  label={data.name}
                  icon={data.icon}
                  external
                />
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Social Media</ColumnHeading>
            <ul className="space-y-3.5">
              {Object.entries(SocialMedia).map(([key, data]) => (
                <NavLink
                  key={key}
                  href={data.url}
                  label={key}
                  icon={data.icon}
                  external
                />
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Coding</ColumnHeading>
            <ul className="space-y-3.5">
              {Object.entries(CodingProfiles).map(([key, data]) => (
                <NavLink
                  key={key}
                  href={data.url}
                  label={key}
                  icon={data.icon}
                  external
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
