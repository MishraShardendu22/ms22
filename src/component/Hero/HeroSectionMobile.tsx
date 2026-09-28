import { EducationSection } from "./EducationSection";
import { TextContent } from "./TextContent";

export const HeroSectionMobile = () => {
  return (
    <section className="relative w-full min-h-screen px-4 sm:px-6 py-16 bg-[#0e0c0a] overflow-hidden">
      {/* Background line grid pattern */}
      <div className="absolute inset-0 pointer-events-none bg-grid-lines" />
      <div className="absolute top-0 -left-4 w-72 h-72 bg-[#d9a55b]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-[#e6b56c]/3 rounded-full filter blur-3xl pointer-events-none" />
      <div className="container mx-auto max-w-7xl w-full relative z-10">
        <div className="mb-12">
          <TextContent />
        </div>
        <EducationSection />
      </div>
    </section>
  );
};
