import { myIntro, SocialLinks } from "@/static/info/header";
import { BUTTON_LABELS } from "@/static/ui";

export const TextContent = () => {
  return (
    <div className="lg:col-span-7 text-center lg:text-left space-y-4 md:space-y-6 lg:space-y-8 relative z-10 order-2 lg:order-1">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black bg-linear-to-b from-[#f3ebdd] to-[#b9ae9d] bg-clip-text text-transparent leading-[1.1] break-words drop-shadow-sm">
        {myIntro.name}
      </h1>

      <div className="w-16 md:w-20 lg:w-24 h-1.5 bg-linear-to-r from-[#d9a55b] to-[#b97a29] mx-auto lg:mx-0 rounded-full shadow-[0_0_15px_rgba(217,165,91,0.4)]" />

      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-transparent bg-linear-to-r from-[#d9a55b] via-[#f3ebdd] to-[#d9a55b] bg-clip-text font-bold tracking-tight">
        {myIntro.role}
      </p>

      <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#b9ae9d] leading-relaxed max-w-3xl mx-auto lg:mx-0 font-medium">
        I am a Software Engineer, I work with{" "}
        <span className="text-[#f3ebdd] font-semibold drop-shadow-md">
          Linux
        </span>
        ,{" "}
        <span className="text-[#f3ebdd] font-semibold drop-shadow-md">Git</span>
        ,{" "}
        <span className="text-[#f3ebdd] font-semibold drop-shadow-md">
          Web Technologies
        </span>
        ,{" "}
        <span className="text-[#f3ebdd] font-semibold drop-shadow-md">
          Cloud Platforms
        </span>{" "}
        and{" "}
        <span className="text-[#f3ebdd] font-semibold drop-shadow-md">
          AI/ML
        </span>
        . I absolutely love Engineering solutions for problems.
      </p>

      {/* Social Links */}
      <div className="flex gap-2 md:gap-3 lg:gap-4 justify-center lg:justify-start flex-wrap pt-2 md:pt-4 lg:pt-6">
        {Object.entries(SocialLinks).map(([key, link]) => {
          const IconComponent = link.icon;
          const label = BUTTON_LABELS[key] || key;

          return (
            <a
              key={key}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link group relative flex items-center gap-2 md:gap-2.5 lg:gap-3 px-4 md:px-5 lg:px-6 py-2.5 md:py-3 lg:py-3.5 bg-[#161311]/90 hover:bg-[#1e1a16] border border-[#2f2923] hover:border-[#d9a55b]/60 rounded-xl transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(217,165,91,0.2)] backdrop-blur-md text-xs sm:text-sm md:text-base font-medium"
              aria-label={label}
            >
              {IconComponent && (
                <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-[#8e8374] group-hover:text-[#d9a55b] group-hover:scale-110 transition-all duration-300 shrink-0" />
              )}
              <span className="text-[#b9ae9d] group-hover:text-[#f3ebdd] transition-colors duration-300 whitespace-nowrap">
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};
