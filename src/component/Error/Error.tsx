import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

interface ErrorPageProps {
  error?: Error;
  reset?: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-linear-to-b from-[#0e0c0a] via-[#161311] to-[#0e0c0a] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>

      <div className="relative w-full max-w-4xl px-8 z-10">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center ring-2 ring-red-500/30">
            <AlertTriangle className="w-12 h-12 text-red-400" />
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text mb-6">
            ERROR
          </h1>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Something Went Wrong
          </h2>
          <p className="text-gray-400 text-lg mb-2">
            We encountered an unexpected error.
          </p>
          {error && (
            <div className="max-w-2xl mx-auto mt-6 p-4 bg-red-950/20 border border-red-900/30 rounded-lg">
              <p className="text-red-400 text-sm font-mono break-all">
                {error.message || "An unknown error occurred"}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {reset && (
            <button
              type="button"
              onClick={reset}
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-semibold text-lg shadow-lg shadow-orange-500/30 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Try Again</span>
            </button>
          )}

          <Link
            href="/"
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-[#161311] hover:bg-[#1e1a16] border border-[#2f2923] hover:border-[#d9a55b]/40 text-[#f3ebdd] hover:text-[#d9a55b] font-semibold text-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm tracking-widest uppercase font-semibold">
            Error {error ? "Runtime" : "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
}
