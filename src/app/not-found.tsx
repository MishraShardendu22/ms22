import { Home } from "lucide-react";
import Link from "next/link";
import { BackButton } from "@/component/Navigation";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-transparent px-6 py-12 relative">
      <div className="relative w-full max-w-xl mx-auto text-center z-10 space-y-8">
        {/* Eyebrow Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2f2923] bg-[#161311] text-[11px] font-mono font-bold tracking-[0.14em] text-[#d9a55b] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d9a55b] animate-pulse" />
          <span>{"404 // Trajectory Missing"}</span>
        </div>

        {/* Serif Headline */}
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal text-[#f3ebdd] font-serif tracking-tight leading-tight">
            Page not <em>found</em>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#b9ae9d] max-w-md mx-auto leading-relaxed">
            The requested trajectory does not exist or has been shifted in the
            coordinate registry.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#d9a55b] hover:bg-[#e6b56c] text-[#0e0c0a] font-semibold text-sm transition-colors active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <BackButton />
        </div>

        {/* Telemetry Status Footer */}
        <div className="pt-6 border-t border-[#2f2923]/60">
          <p className="text-xs font-mono text-[#8e8374] tracking-wider uppercase">
            Telemetry: STATUS_404_NOT_FOUND
          </p>
        </div>
      </div>
    </div>
  );
}
