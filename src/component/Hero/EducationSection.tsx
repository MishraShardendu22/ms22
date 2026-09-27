import { BookOpen, Calendar, ExternalLink, Globe, MapPin } from "lucide-react";
import Link from "next/link";
import { Language } from "@/static/info/header";

export const EducationSection = () => {
  return (
    <section id="education" className="max-w-[1800px] mx-auto">
      {/* Academic Journey Header */}
      <div className="text-center mb-4 md:mb-5 px-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-[#f3ebdd] via-[#d9a55b] to-[#e6b56c] bg-clip-text text-transparent mb-1">
          Academic Journey
        </h2>
        <p className="text-[#8e8374] text-xs sm:text-sm px-4">
          Academic journey through diverse learning experiences and achievements
        </p>
      </div>

      {/* Education Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Higher Education with Languages */}
        <div className="group bg-[#161311] rounded-xl md:rounded-2xl p-4 sm:p-5 border border-[#2f2923] hover:border-[#d9a55b]/40 transition-colors duration-200 shadow-xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-2 md:mb-3 gap-2">
            <div className="flex-1 min-w-0">
              <div className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-[#d9a55b]/10 text-[#d9a55b] border border-[#d9a55b]/25 text-xs font-semibold rounded-full mb-1.5">
                Higher Education
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#f3ebdd] leading-tight mb-1 wrap-break-word">
                Indian Institute of Information Technology, Dharwad
              </h3>
            </div>
            <Link
              href="https://iiitdwd.ac.in/website-team/"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 w-8 h-8 rounded-lg bg-[#d9a55b]/10 hover:bg-[#d9a55b]/20 flex items-center justify-center transition-all group/link"
              aria-label="Visit IIIT Dharwad Website Team"
            >
              <ExternalLink className="w-4 h-4 text-[#d9a55b] group-hover/link:scale-110 transition-transform" />
            </Link>
          </div>

          {/* Details */}
          <div className="space-y-1.5 mb-2 sm:mb-3">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#b9ae9d]">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#d9a55b]/70" />
              <span className="font-medium">2023 - 2027</span>
            </div>
            <div className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#b9ae9d]">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#d9a55b]/70 mt-0.5" />
              <span>Dharwad, Karnataka, India</span>
            </div>
          </div>

          {/* Course Info */}
          <div className="pt-2 sm:pt-3 mb-2 sm:mb-3">
            <div className="flex items-start gap-1.5 sm:gap-2">
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d9a55b] mt-1 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-semibold text-[#f3ebdd] mb-1">
                  Computer Science and Engineering
                </p>
                <p className="text-xs text-[#8e8374]">
                  Focusing on software development and emerging technologies
                </p>
              </div>
            </div>
          </div>

          {/* Languages Section */}
          <div className="pt-2 sm:pt-3">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5">
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d9a55b]" />
              <h3 className="text-xs sm:text-sm font-semibold text-[#b9ae9d]">
                Communication
              </h3>
            </div>
            <div className="flex gap-1.5 sm:gap-2 flex-wrap">
              {Language.map((lang) => (
                <span
                  key={lang}
                  className="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-full bg-[#1e1a16] border border-[#2f2923] text-[#f3ebdd] font-medium text-xs hover:border-[#d9a55b]/40 hover:text-[#d9a55b] transition-all"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* School Education */}
        <div className="group bg-[#161311] rounded-xl md:rounded-2xl p-4 sm:p-5 border border-[#2f2923] hover:border-[#d9a55b]/40 transition-colors duration-200 shadow-xl">
          {/* Header */}
          <div className="mb-2 sm:mb-3">
            <div className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-[#d9a55b]/10 text-[#d9a55b] border border-[#d9a55b]/25 text-xs font-semibold rounded-full mb-1.5">
              School Education
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#f3ebdd] leading-tight mb-1 wrap-break-word">
              Delhi Public School, Kalyanpur
            </h3>
          </div>

          {/* Details */}
          <div className="space-y-1.5 mb-2 sm:mb-3">
            <div className="flex items-center gap-2 text-sm text-[#b9ae9d]">
              <Calendar className="w-4 h-4 shrink-0 text-[#d9a55b]/70" />
              <span className="font-medium">2008 - 2022</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-[#b9ae9d]">
              <MapPin className="w-4 h-4 shrink-0 text-[#d9a55b]/70 mt-0.5" />
              <span>Kanpur, Uttar Pradesh, India</span>
            </div>
          </div>

          {/* Grades - Side by Side */}
          <div className="pt-2 sm:pt-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Class 12th */}
              <div className="bg-[#1e1a16] border border-[#2f2923] rounded-lg p-3 hover:border-[#d9a55b]/30 transition-colors duration-200">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs sm:text-sm font-semibold text-[#b9ae9d]">
                    Class 12th
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-[#d9a55b]">
                    96.4%
                  </span>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3 text-[#d9a55b]/70" />
                    <p className="text-xs text-[#8e8374]">
                      PCM and Computer Science
                    </p>
                  </div>
                </div>
              </div>

              {/* Class 10th */}
              <div className="bg-[#1e1a16] border border-[#2f2923] rounded-lg p-3 hover:border-[#d9a55b]/30 transition-colors duration-200">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs sm:text-sm font-semibold text-[#b9ae9d]">
                    Class 10th
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-[#d9a55b]">
                    87.6%
                  </span>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3 text-[#d9a55b]/70" />
                    <p className="text-xs text-[#8e8374]">All Subjects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
