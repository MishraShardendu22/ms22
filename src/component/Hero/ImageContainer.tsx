import Image from "next/image";
import { CDN_ICON_AVIF, CDN_PROFESSIONAL_AVIF } from "@/static/cdn";

export const ImageContainer = () => {
  return (
    <div
      className="lg:col-span-5 relative order-1 lg:order-2 mb-8 lg:mb-0"
      style={{ perspective: "1000px" }}
    >
      <div className="glow-effect" />

      <div className="image-container group relative w-full aspect-3/4 max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] rounded-2xl overflow-hidden cursor-pointer mx-auto shadow-2xl shadow-black/40 border border-[#2f2923] hover:border-[#d9a55b]/60 hover:shadow-[0_0_25px_rgba(217,165,91,0.2)] transition-all duration-700">
        <Image
          src={CDN_ICON_AVIF}
          alt="Shardendu Mishra - Software Developer and Engineer portrait"
          fill
          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <Image
          src={CDN_PROFESSIONAL_AVIF}
          alt="Shardendu Mishra - Professional Software Developer photo"
          fill
          className="object-cover opacity-0 transition-opacity duration-500 delay-150 group-hover:opacity-100"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0e0c0a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
};
