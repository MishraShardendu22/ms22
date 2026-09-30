"use client";

import { ErrorState } from "@/component/Error";

export default function ExperienceDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex-1 min-h-screen bg-transparent relative overflow-hidden">
      <ErrorState
        title="Failed to load experience"
        message={
          error.message ||
          "An unexpected error occurred while loading this experience."
        }
        onRetry={reset}
        fullPage
      />
    </main>
  );
}
