import { EducationSection } from "./EducationSection";
import { ImageContainer } from "./ImageContainer";
import { TextContent } from "./TextContent";

export const HeroSectionDesktop = () => {
  return (
    <section className="relative w-full min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-10 md:py-14 overflow-hidden">
      {/* Background line grid pattern */}
      <div className="absolute inset-0 pointer-events-none bg-grid-lines" />
      <div className="container mx-auto max-w-7xl w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center mb-16 md:mb-24">
          <TextContent />
          <ImageContainer />
        </div>
        <EducationSection />
      </div>
    </section>
  );
};
