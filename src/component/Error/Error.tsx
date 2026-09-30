import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

interface ErrorPageProps {
  error?: Error;
  reset?: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-transparent px-6 py-12 relative">
      <div className="relative w-full max-w-xl mx-auto text-center z-10 space-y-8">
        {/* Eyebrow Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2f2923] bg-[#161311] text-[11px] font-mono font-bold tracking-[0.14em] text-[#d9a55b] uppercase">
          <AlertTriangle className="w-3.5 h-3.5 text-[#d9a55b]" />
          <span>{"System Alert // Unexpected State"}</span>
        </div>

        {/* Serif Headline */}
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal text-[#f3ebdd] font-serif tracking-tight leading-tight">
            Something went <em>wrong</em>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#b9ae9d] max-w-md mx-auto leading-relaxed">
            A runtime exception occurred while processing this interface.
          </p>

          {error && (
            <div className="mt-6 p-4 bg-[#161311] border border-[#2f2923] rounded-xl text-left max-w-lg mx-auto">
              <p className="text-xs font-mono text-[#e6b56c] break-all leading-relaxed">
                {error.message || "An unknown error occurred"}
              </p>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {reset && (
            <button
              type="button"
              onClick={reset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#d9a55b] hover:bg-[#e6b56c] text-[#0e0c0a] font-semibold text-sm transition-colors active:scale-[0.98]"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          )}

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#161311] hover:bg-[#1e1a16] border border-[#2f2923] hover:border-[#413930] text-[#f3ebdd] font-semibold text-sm transition-colors active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>

        {/* Telemetry Status Footer */}
        <div className="pt-6 border-t border-[#2f2923]/60">
          <p className="text-xs font-mono text-[#8e8374] tracking-wider uppercase">
            Error State: {error ? "RUNTIME_FAULT" : "UNKNOWN_EXCEPTION"}
          </p>
        </div>
      </div>
    </div>
  );
}
