import { BookOpen, Calendar, ExternalLink, Globe, MapPin } from "lucide-react";
import Link from "next/link";
import { Language } from "@/static/info/header";

export const EducationSection = () => {
  return (
    <section id="education" className="w-full pt-4">
      {/* Academic Journey Header */}
      <div className="mb-6 text-left">
        <div className="kicker mb-1">Academic Foundations</div>
        <h2 className="page-title text-2xl sm:text-3xl lg:text-4xl text-[#f3ebdd] font-serif tracking-tight m-0">
          Education &amp; <em>Research</em>.
        </h2>
        <p className="text-xs sm:text-sm text-[#8e8374] mt-1 max-w-xl">
          Academic credentials, Computer Science foundations, and spoken
          languages.
        </p>
      </div>

      {/* Observatory Surface Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Higher Education */}
        <div className="bg-[#161311] rounded-2xl p-5 sm:p-6 border border-[#2f2923] hover:border-[#413930] transition-colors shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-3 gap-2">
              <div className="flex-1 min-w-0">
                <span className="inline-block px-2.5 py-0.5 bg-[#d9a55b]/10 text-[#d9a55b] border border-[#d9a55b]/25 text-[10px] font-mono font-semibold rounded-md mb-2">
                  Higher Education
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#f3ebdd] font-mono leading-snug">
                  Indian Institute of Information Technology, Dharwad
                </h3>
              </div>
              <Link
                href="https://iiitdwd.ac.in/website-team/"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 w-8 h-8 rounded-lg bg-[#1e1a16] hover:bg-[#27221c] border border-[#2f2923] hover:border-[#d9a55b]/40 flex items-center justify-center transition-colors group/link"
                aria-label="Visit IIIT Dharwad Website Team"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#d9a55b] group-hover/link:text-[#f3ebdd] transition-colors" />
              </Link>
            </div>

            <div className="space-y-1.5 mb-4 text-xs font-mono text-[#8e8374]">
              <div className="flex items-center gap-2 text-[#b9ae9d]">
                <Calendar className="w-3.5 h-3.5 text-[#d9a55b]" />
                <span>2023 - 2027</span>
              </div>
              <div className="flex items-center gap-2 text-[#8e8374]">
                <MapPin className="w-3.5 h-3.5 text-[#d9a55b]/70" />
                <span>Dharwad, Karnataka, India</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#1e1a16] border border-[#2f2923] mb-4">
              <div className="flex items-start gap-2.5">
                <BookOpen className="w-4 h-4 text-[#d9a55b] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-[#f3ebdd]">
                    B.Tech &middot; Computer Science and Engineering
                  </p>
                  <p className="text-xs text-[#8e8374] mt-0.5">
                    Focus on Distributed Systems, Cloud-Native Toolchains, and
                    Agent Architectures
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Languages Section */}
          <div className="pt-3 border-t border-[#2f2923]">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-3.5 h-3.5 text-[#d9a55b]" />
              <span className="text-xs font-mono text-[#8e8374] uppercase tracking-wider">
                Communication
              </span>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {Language.map((lang) => (
                <span
                  key={lang}
                  className="px-2.5 py-1 rounded-md bg-[#1e1a16] border border-[#2f2923] text-[#f3ebdd] font-mono text-xs hover:border-[#d9a55b]/40 hover:text-[#d9a55b] transition-all"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* School Education */}
        <div className="bg-[#161311] rounded-2xl p-5 sm:p-6 border border-[#2f2923] hover:border-[#413930] transition-colors shadow-xl flex flex-col justify-between">
          <div>
            <div className="mb-3">
              <span className="inline-block px-2.5 py-0.5 bg-[#d9a55b]/10 text-[#d9a55b] border border-[#d9a55b]/25 text-[10px] font-mono font-semibold rounded-md mb-2">
                Secondary &amp; Senior Secondary
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#f3ebdd] font-mono leading-snug">
                Delhi Public School, Kalyanpur
              </h3>
            </div>

            <div className="space-y-1.5 mb-4 text-xs font-mono text-[#8e8374]">
              <div className="flex items-center gap-2 text-[#b9ae9d]">
                <Calendar className="w-3.5 h-3.5 text-[#d9a55b]" />
                <span>2008 - 2022</span>
              </div>
              <div className="flex items-center gap-2 text-[#8e8374]">
                <MapPin className="w-3.5 h-3.5 text-[#d9a55b]/70" />
                <span>Kanpur, Uttar Pradesh, India</span>
              </div>
            </div>

            {/* Grades Strip */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#1e1a16] border border-[#2f2923] rounded-xl p-3">
                <span className="text-xs font-mono text-[#8e8374] block">
                  Class 12th
                </span>
                <span className="text-xl sm:text-2xl font-serif text-[#d9a55b] block font-normal">
                  96.4%
                </span>
                <p className="text-[11px] text-[#8e8374] mt-1">PCM &amp; CS</p>
              </div>

              <div className="bg-[#1e1a16] border border-[#2f2923] rounded-xl p-3">
                <span className="text-xs font-mono text-[#8e8374] block">
                  Class 10th
                </span>
                <span className="text-xl sm:text-2xl font-serif text-[#d9a55b] block font-normal">
                  87.6%
                </span>
                <p className="text-[11px] text-[#8e8374] mt-1">All Subjects</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#2f2923] text-xs font-mono text-[#8e8374]">
            Rigorous foundations in Mathematics, Physics, and Computer Science.
          </div>
        </div>
      </div>
    </section>
  );
};
