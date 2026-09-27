import { EducationSection } from "./EducationSection";
import { ImageContainer } from "./ImageContainer";
import { TextContent } from "./TextContent";

export const HeroSectionDesktop = () => {
  return (
    <section className="relative w-full min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 md:py-10 lg:py-12 bg-linear-to-b from-transparent via-[#0e0c0a]/50 to-transparent overflow-hidden">
      <div className="container mx-auto max-w-400 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8 items-center mb-12 md:mb-16 lg:mb-20">
          <TextContent />
          <ImageContainer />
        </div>
        <EducationSection />
      </div>
    </section>
  );
};
