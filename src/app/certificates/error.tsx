"use client";

import { ErrorState } from "@/component/Error";

export default function CertificatesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex-1 min-h-screen bg-transparent relative overflow-hidden">
      <ErrorState
        title="Failed to load certificates"
        message={
          error.message ||
          "An unexpected error occurred while loading certificates."
        }
        onRetry={reset}
        fullPage
      />
    </main>
  );
}
