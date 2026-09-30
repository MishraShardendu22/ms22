import { FileText, Mail, MessageSquare, User } from "lucide-react";
import { SubmitButton } from "./SubmitButton";

interface ContactFormProps {
  variant?: "default" | "compact";
  includeSubject?: boolean;
  state?: {
    success: boolean;
    message: string;
    errors?: {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };
  } | null;
}

export function ContactForm({
  variant = "default",
  includeSubject = true,
  state = null,
}: ContactFormProps) {
  const isCompact = variant === "compact";

  return (
    <>
      {/* Name and Email Fields - Grid Layout */}
      <div className={isCompact ? "space-y-4" : "grid md:grid-cols-2 gap-4"}>
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm sm:text-base font-semibold text-[#f3ebdd] mb-2.5"
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#d9a55b]" />
              Name
            </div>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className={`w-full bg-[#161311] border-[#2f2923] focus:border-[#d9a55b] focus:ring-2 focus:ring-[#d9a55b]/20 ${
              isCompact
                ? "px-4 py-3 text-sm"
                : "px-4 sm:px-5 py-3.5 text-base sm:text-lg"
            } border rounded-xl text-[#f3ebdd] placeholder-[#8e8374] outline-none transition-all ${
              state?.errors?.name ? "border-red-500" : ""
            }`}
            placeholder={isCompact ? "Full name" : "Your name"}
          />
          {state?.errors?.name && (
            <p className="text-red-400 text-xs mt-1">{state.errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm sm:text-base font-semibold text-[#f3ebdd] mb-2.5"
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#d9a55b]" />
              Email
            </div>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={`w-full bg-[#161311] border-[#2f2923] focus:border-[#d9a55b] focus:ring-2 focus:ring-[#d9a55b]/20 ${
              isCompact
                ? "px-4 py-3 text-sm"
                : "px-4 sm:px-5 py-3.5 text-base sm:text-lg"
            } border rounded-xl text-[#f3ebdd] placeholder-[#8e8374] outline-none transition-all ${
              state?.errors?.email ? "border-red-500" : ""
            }`}
            placeholder={isCompact ? "Email address" : "your.email@example.com"}
          />
          {state?.errors?.email && (
            <p className="text-red-400 text-xs mt-1">{state.errors.email}</p>
          )}
        </div>
      </div>

      {/* Subject Field */}
      {includeSubject && (
        <div>
          <label
            htmlFor="subject"
            className="block text-sm sm:text-base font-semibold text-[#f3ebdd] mb-2.5"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#d9a55b]" />
              Subject
            </div>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            className={`w-full bg-[#161311] border-[#2f2923] focus:border-[#d9a55b] focus:ring-2 focus:ring-[#d9a55b]/20 ${
              isCompact
                ? "px-4 py-3 text-sm"
                : "px-4 sm:px-5 py-3.5 text-base sm:text-lg"
            } border rounded-xl text-[#f3ebdd] placeholder-[#8e8374] outline-none transition-all ${
              state?.errors?.subject ? "border-red-500" : ""
            }`}
            placeholder="What's this about?"
          />
          {state?.errors?.subject && (
            <p className="text-red-400 text-xs mt-1">{state.errors.subject}</p>
          )}
        </div>
      )}

      {/* Hidden subject for compact form */}
      {!includeSubject && (
        <input type="hidden" name="subject" value="Portfolio Contact" />
      )}

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm sm:text-base font-semibold text-[#f3ebdd] mb-2.5"
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-[#d9a55b]" />
            Message
          </div>
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={isCompact ? 4 : 5}
          className={`w-full bg-[#161311] border-[#2f2923] focus:border-[#d9a55b] focus:ring-2 focus:ring-[#d9a55b]/20 ${
            isCompact
              ? "px-4 py-3 text-sm"
              : "px-4 sm:px-5 py-3.5 text-base sm:text-lg"
          } border rounded-xl text-[#f3ebdd] placeholder-[#8e8374] outline-none transition-all resize-none ${
            state?.errors?.message ? "border-red-500" : ""
          }`}
          placeholder={
            isCompact
              ? "Share details or say hello..."
              : "Tell me about your project or inquiry..."
          }
        />
        {state?.errors?.message && (
          <p className="text-red-400 text-xs mt-1">{state.errors.message}</p>
        )}
      </div>

      <SubmitButton variant={variant} />
    </>
  );
}
