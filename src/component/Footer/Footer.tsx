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

export function FooterSectionMobile() {
  return (
    <footer className="relative overflow-hidden bg-transparent px-4 pb-12 pt-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-lines" />
        <div className="absolute -top-16 right-[-4rem] h-40 w-40 rounded-full bg-[#d9a55b]/5 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-[-6rem] h-56 w-56 rounded-full bg-[#d9a55b]/5 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="mb-8 rounded-2xl border border-[#2f2923] bg-[#161311]/80 p-5">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-[#d9a55b]/10 border border-[#d9a55b]/25 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-[#d9a55b]" />
            </div>
            <div>
              <h2 className="text-lg font-normal text-[#f3ebdd] font-heading">
                Shardendu Mishra
              </h2>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#d9a55b]">
                Software Engineer
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm text-[#b9ae9d] leading-relaxed">
            Software Engineer engineering modern, high-impact systems.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em]">
            <span className="rounded-full border border-[#2f2923] bg-[#1e1a16] px-2.5 py-1 text-[#b9ae9d]">
              Go
            </span>
            <span className="rounded-full border border-[#d9a55b]/25 bg-[#d9a55b]/10 px-2.5 py-1 text-[#d9a55b]">
              Next.js
            </span>
            <span className="rounded-full border border-[#2f2923] bg-[#1e1a16] px-2.5 py-1 text-[#b9ae9d]">
              AI/ML
            </span>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-[#2f2923] bg-[#161311]/60 p-5 shadow-[0_4px_24px_rgba(217,165,91,0.05)]">
          <h3 className="text-lg font-normal text-[#f3ebdd] mb-4 font-heading">
            Let's Talk
          </h3>
          <div className="bg-[#0e0c0a]/80 p-3 rounded-xl border border-[#2f2923]">
            <ContactFormWrapper variant="compact" includeSubject={false} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-[#2f2923] bg-[#161311]/40 p-4">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#d9a55b] font-semibold mb-3">
              <span className="h-2 w-2 rounded-full bg-[#d9a55b]" />
              Quick Links
            </div>
            <ul className="space-y-2">
              {Object.entries(QuickLinks).map(([key, data]) => {
                const IconComponent =
                  iconMap[data.icon as keyof typeof iconMap];
                return (
                  <li key={key}>
                    <a
                      href={data.url}
                      className="group flex items-center justify-between rounded-lg border border-[#2f2923] bg-[#1e1a16]/60 px-3 py-2 text-xs text-[#b9ae9d] transition hover:border-[#d9a55b]/30 hover:bg-[#d9a55b]/10 hover:text-[#f3ebdd]"
                    >
                      <span className="flex items-center gap-2">
                        {IconComponent && (
                          <IconComponent className="w-3.5 h-3.5 text-[#8e8374] group-hover:text-[#d9a55b]" />
                        )}
                        <span>{key}</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#8e8374] group-hover:text-[#d9a55b]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="rounded-2xl border border-[#2f2923] bg-[#161311]/40 p-4">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#d9a55b] font-semibold mb-3">
              <span className="h-2 w-2 rounded-full bg-[#d9a55b]" />
              My Websites
            </div>
            <ul className="space-y-2">
              {Object.entries(MyWebsites).map(([key, data]) => {
                const IconComponent =
                  iconMap[data.icon as keyof typeof iconMap];
                return (
                  <li key={key}>
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-lg border border-[#2f2923] bg-[#1e1a16]/60 px-3 py-2 text-xs text-[#b9ae9d] transition hover:border-[#d9a55b]/30 hover:bg-[#d9a55b]/10 hover:text-[#f3ebdd]"
                    >
                      <span className="flex items-center gap-2">
                        {IconComponent && (
                          <IconComponent className="w-3.5 h-3.5 text-[#8e8374] group-hover:text-[#d9a55b]" />
                        )}
                        <span>{data.name}</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#8e8374] group-hover:text-[#d9a55b]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="rounded-2xl border border-[#2f2923] bg-[#161311]/40 p-4 sm:col-span-2">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#d9a55b] font-semibold mb-3">
              <span className="h-2 w-2 rounded-full bg-[#d9a55b]" />
              Social
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {Object.entries(SocialMedia).map(([key, data]) => {
                const IconComponent =
                  iconMap[data.icon as keyof typeof iconMap];
                return (
                  <li key={key}>
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-lg border border-[#2f2923] bg-[#1e1a16]/60 px-3 py-2 text-xs text-[#b9ae9d] transition hover:border-[#d9a55b]/30 hover:bg-[#d9a55b]/10 hover:text-[#f3ebdd]"
                    >
                      <span className="flex items-center gap-2">
                        {IconComponent && (
                          <IconComponent className="w-3.5 h-3.5 text-[#8e8374] group-hover:text-[#d9a55b]" />
                        )}
                        <span>{key}</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#8e8374] group-hover:text-[#d9a55b]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-[#2f2923] pt-4 text-xs text-[#8e8374]">
          <p>Shardendu Mishra</p>
          <ScrollToTop variant="mobile" />
        </div>
      </div>
    </footer>
  );
}

export function FooterSection() {
  return (
    <footer className="relative bg-transparent pt-10 md:pt-14 pb-12 px-6 md:px-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-lines" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#d9a55b]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d9a55b]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 mb-12 md:mb-16">
          <div className="space-y-6 sm:space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl sm:text-3xl font-normal text-[#f3ebdd] font-heading">
                  Shardendu Mishra
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full border border-[#d9a55b]/30 bg-[#d9a55b]/10 text-[#d9a55b] font-mono">
                  Ecosystem
                </span>
              </div>
              <p className="text-[#b9ae9d] text-base sm:text-lg leading-relaxed max-w-xl">
                Software Engineer engineering modern, high-impact systems.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#8e8374]">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>and</span>
              <Coffee className="w-4 h-4 text-[#d9a55b]" />
              <span>by Shardendu Mishra</span>
            </div>

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <span className="px-3.5 py-1.5 bg-[#1e1a16] border border-[#2f2923] rounded-lg text-xs text-[#b9ae9d] font-semibold">
                Go
              </span>
              <span className="px-3.5 py-1.5 bg-[#d9a55b]/10 border border-[#d9a55b]/25 rounded-lg text-xs text-[#d9a55b] font-semibold">
                Next.js
              </span>
              <span className="px-3.5 py-1.5 bg-[#1e1a16] border border-[#2f2923] rounded-lg text-xs text-[#b9ae9d] font-semibold">
                Kubernetes
              </span>
              <span className="px-3.5 py-1.5 bg-[#1e1a16] border border-[#2f2923] rounded-lg text-xs text-[#b9ae9d] font-semibold">
                AI/ML
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#8e8374]">
              © 2026 Shardendu Mishra. All rights reserved.
            </p>

            <div className="flex items-center gap-4 md:gap-6 flex-wrap">
              <div className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-[#b9ae9d]">
                <span>Made</span>
                <div className="relative w-6 h-6 sm:w-7 sm:h-7 shrink-0">
                  <Image
                    src={images.go.loc}
                    alt={images.go.alt}
                    fill
                    unoptimized
                    className="object-contain"
                    sizes="28px"
                  />
                </div>
                <span>in mind and</span>
                <div className="relative w-6 h-6 sm:w-7 sm:h-7 shrink-0">
                  <Image
                    src={images.fedora.loc}
                    alt={images.fedora.alt}
                    fill
                    unoptimized
                    className="object-contain"
                    sizes="28px"
                  />
                </div>
                <span>in Machine.</span>
              </div>

              <ScrollToTop variant="desktop" />
            </div>
          </div>

          <div>
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-normal text-[#f3ebdd] mb-2 font-heading">
                Let's Talk
              </h3>
              <p className="text-[#8e8374] text-xs sm:text-sm">
                Get in touch with me
              </p>
            </div>

            <div className="bg-[#161311]/80 backdrop-blur-sm p-5 sm:p-6 md:p-8 rounded-2xl border border-[#2f2923] shadow-2xl">
              <ContactFormWrapper variant="default" includeSubject={false} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16">
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-normal text-[#f3ebdd] mb-3 sm:mb-5 tracking-wide font-heading">
              Quick Links
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {Object.entries(QuickLinks).map(([key, data]) => {
                const IconComponent =
                  iconMap[data.icon as keyof typeof iconMap];
                return (
                  <li key={key}>
                    <a
                      href={data.url}
                      className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-[#b9ae9d] hover:text-[#d9a55b] transition-colors duration-200 group"
                    >
                      {IconComponent && (
                        <IconComponent className="w-4 h-4 shrink-0 text-[#8e8374] group-hover:text-[#d9a55b] transition-colors" />
                      )}
                      <span className="font-medium truncate">{key}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-normal text-[#f3ebdd] mb-3 sm:mb-5 tracking-wide font-heading">
              My Websites
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {Object.entries(MyWebsites).map(([websiteKey, data]) => {
                const IconComponent =
                  iconMap[data.icon as keyof typeof iconMap];
                return (
                  <li key={websiteKey}>
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-[#b9ae9d] hover:text-[#d9a55b] transition-colors duration-200 group"
                    >
                      {IconComponent && (
                        <IconComponent className="w-4 h-4 shrink-0 text-[#8e8374] group-hover:text-[#d9a55b] transition-colors" />
                      )}
                      <span className="font-medium truncate">{data.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-normal text-[#f3ebdd] mb-3 sm:mb-5 tracking-wide font-heading">
              Social Media
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {Object.entries(SocialMedia).map(([key, data]) => {
                const IconComponent =
                  iconMap[data.icon as keyof typeof iconMap];
                return (
                  <li key={key}>
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-[#b9ae9d] hover:text-[#d9a55b] transition-colors duration-200 group"
                    >
                      {IconComponent && (
                        <IconComponent className="w-4 h-4 shrink-0 text-[#8e8374] group-hover:text-[#d9a55b] transition-colors" />
                      )}
                      <span className="font-medium truncate">{key}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-normal text-[#f3ebdd] mb-3 sm:mb-5 tracking-wide font-heading">
              Coding
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {Object.entries(CodingProfiles).map(([key, data]) => {
                const IconComponent =
                  iconMap[data.icon as keyof typeof iconMap];
                return (
                  <li key={key}>
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-[#b9ae9d] hover:text-[#d9a55b] transition-colors duration-200 group"
                    >
                      {IconComponent && (
                        <IconComponent className="w-4 h-4 shrink-0 text-[#8e8374] group-hover:text-[#d9a55b] transition-colors" />
                      )}
                      <span className="font-medium truncate">{key}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
