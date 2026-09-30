import { EducationSection } from "./EducationSection";
import { TextContent } from "./TextContent";

export const HeroSectionMobile = () => {
  return (
    <section className="relative w-full min-h-screen px-4 sm:px-6 py-16 bg-transparent">
      <div className="container mx-auto max-w-7xl w-full relative z-10">
        <div className="mb-12">
          <TextContent />
        </div>
        <EducationSection />
      </div>
    </section>
  );
};
