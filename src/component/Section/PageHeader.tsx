import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

export interface KickerProps extends ComponentPropsWithoutRef<"div"> {
  muted?: boolean;
}

/** The uppercase eyebrow above a headline (accent) or a stat (muted). */
export function Kicker({
  muted = false,
  className,
  children,
  ...rest
}: KickerProps) {
  return (
    <div
      className={cn("kicker", muted && "kicker--muted", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
