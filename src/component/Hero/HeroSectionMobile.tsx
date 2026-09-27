import { EducationSection } from "./EducationSection";
import { TextContent } from "./TextContent";

export const HeroSectionMobile = () => {
  return (
    <section className="relative w-full min-h-screen px-4 sm:px-6 py-16 bg-[#0e0c0a] overflow-hidden">
      <div className="container mx-auto max-w-400 w-full">
        <div className="mb-12">
          <TextContent />
        </div>
        <EducationSection />
      </div>
    </section>
  );
};
