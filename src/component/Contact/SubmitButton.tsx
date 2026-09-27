"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  variant?: "default" | "compact";
}

export function SubmitButton({ variant = "default" }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const isCompact = variant === "compact";

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full ${
        isCompact
          ? "bg-[#d9a55b] hover:bg-[#e6b56c] text-sm py-3"
          : "bg-[#d9a55b] hover:bg-[#e6b56c] hover:shadow-[0_4px_20px_rgba(217,165,91,0.25)] text-base py-3"
      } disabled:bg-[#2f2923] disabled:text-[#8e8374] text-[#0e0c0a] font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed`}
    >
      {pending ? (
        <>
          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-[#0e0c0a] border-t-transparent rounded-full animate-spin" />
          Sending...
        </>
      ) : (
        <>Send message</>
      )}
    </button>
  );
}
