import Image from "next/image";
import { CDN_PROFESSIONAL_AVIF } from "@/static/cdn";

export const ImageContainer = () => {
  return (
    <div className="lg:col-span-5 relative order-1 lg:order-2 mb-6 lg:mb-0">
      {/* Ambient Starlight Glow */}
      <div className="absolute -inset-4 bg-radial from-[#d9a55b]/15 via-transparent to-transparent blur-2xl pointer-events-none" />

      {/* Planetary Astronomical Canvas with image-container class */}
      <div className="image-container relative w-full aspect-square max-w-[360px] sm:max-w-[420px] lg:max-w-[460px] rounded-2xl overflow-hidden mx-auto bg-[#161311] border border-[#2f2923] shadow-2xl">
        {/* Planetary Hero Art */}
        <Image
          src="/images/hero.webp"
          alt="Shardendu Mishra - Observatory Planetary Artwork"
          fill
          priority
          sizes="(max-width: 960px) 100vw, 45vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />

        {/* Viewfinder Reticles */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#d9a55b]/70 pointer-events-none" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#d9a55b]/70 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#d9a55b]/70 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#d9a55b]/70 pointer-events-none" />

        {/* Mission Telemetry Overlay at Top */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#0e0c0a]/80 backdrop-blur-md border border-[#2f2923] text-[10px] font-mono text-[#b9ae9d]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4caf7d] animate-pulse" />
            <span className="text-[#f3ebdd] font-semibold">OBS-PRIMARY</span>
          </span>
          <span className="text-[#8e8374]">LAT 15.45° N · LON 75.00° E</span>
        </div>

        {/* Engineer Profile Passport Strip at Bottom */}
        <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-[#0e0c0a]/90 backdrop-blur-md border border-[#2f2923] flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-[#2f2923]">
            <Image
              src={CDN_PROFESSIONAL_AVIF}
              alt="Shardendu Mishra"
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-semibold text-[#f3ebdd] truncate">
                Shardendu Mishra
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1e1a16] text-[#d9a55b] border border-[#2f2923]">
                IIIT Dharwad
              </span>
            </div>
            <p className="text-[11px] text-[#8e8374] truncate mt-0.5">
              Backend Systems &middot; Agentic Workflows
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
