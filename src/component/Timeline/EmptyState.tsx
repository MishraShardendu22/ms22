export const EmptyState = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 md:px-8 bg-transparent">
      <div className="container mx-auto max-w-7xl w-full relative z-10">
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
