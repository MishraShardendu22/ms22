"use client";

import { ErrorState } from "@/component/Error";

export default function ExperiencesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex-1 min-h-screen bg-[#0e0c0a] relative overflow-hidden">
      <ErrorState
        title="Failed to load experiences"
        message={
          error.message ||
          "An unexpected error occurred while loading experiences."
        }
        onRetry={reset}
        fullPage
      />
    </main>
  );
}
