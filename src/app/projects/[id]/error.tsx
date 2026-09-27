"use client";

import { ErrorState } from "@/component/Error";

export default function ProjectDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex-1 min-h-screen bg-[#0e0c0a] relative overflow-hidden">
      <ErrorState
        title="Failed to load project"
        message={
          error.message ||
          "An unexpected error occurred while loading this project."
        }
        onRetry={reset}
        fullPage
      />
    </main>
  );
}
