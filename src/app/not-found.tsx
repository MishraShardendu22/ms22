import { Home } from "lucide-react";
import Link from "next/link";
import { BackButton } from "@/component/Navigation";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-linear-to-b from-[#0e0c0a] via-[#161311] to-[#0e0c0a] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
      </div>

      <div className="relative w-full max-w-4xl px-8 z-10">
        {/* 404 Number */}
        <div className="text-center mb-8">
          <h1 className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tight">
            <span className="text-transparent bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text">
              404
            </span>
          </h1>
        </div>

        {/* Page Not Found Text */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Page Not Found
          </h2>

          <p className="text-gray-400 text-lg md:text-xl mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500 text-sm md:text-base">
            It might have been moved or deleted.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-semibold text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all hover:scale-105"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Go Home</span>
          </Link>

          <BackButton />
        </div>

        {/* Error Code */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm tracking-widest uppercase font-semibold">
            Error Code: 404
          </p>
        </div>
      </div>
    </div>
  );
}
