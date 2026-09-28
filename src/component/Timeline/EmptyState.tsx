export const EmptyState = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 md:px-8 bg-linear-to-b from-transparent via-[#161311]/40 to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d9a55b]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#e6b56c]/3 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-grid-lines"></div>
      </div>
      <div className="container mx-auto max-w-400 relative z-10">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-serif mb-4 bg-linear-to-r from-[#f3ebdd] via-[#d9a55b] to-[#e6b56c] bg-clip-text text-transparent">
            Experience Timeline
          </h2>
          <p className="text-lg text-[#8e8374]">
            No experiences available to display
          </p>
        </div>
      </div>
    </section>
  );
};
