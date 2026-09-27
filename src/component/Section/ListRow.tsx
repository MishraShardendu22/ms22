import { Check, ChevronRight, Loader2, X } from "lucide-react";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/utils/cn";

export type ListRowStatus = "success" | "danger" | "running" | "none";

export interface ListRowProps
  extends Omit<ComponentPropsWithoutRef<"a">, "title"> {
  /** 'a' when 'href' is set, else 'div'; pass next/link for client navigation. */
  component?: ElementType;
  icon?: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
  status?: ListRowStatus;
  /** Extra content before the status mark (a badge, tags, stats). */
  trailing?: ReactNode;
  /** Shows a chevron when the row opens a detail page. Defaults to true with an href. */
  chevron?: boolean;
}

/** A sleek Observatory row: icon tile, title with meta description, badges, and trailing chevron. */
export function ListRow({
  component,
  href,
  icon,
  title,
  meta,
  status = "none",
  trailing,
  chevron,
  className,
  ...rest
}: ListRowProps) {
  const Component: ElementType = component ?? (href ? "a" : "div");
  const showChevron = chevron ?? Boolean(href);

  return (
    <Component className={cn("list-row", className)} href={href} {...rest}>
      {icon && <span className="list-row__icon">{icon}</span>}
      <span className="list-row__text">
        <span className="list-row__title">{title}</span>
        {meta && <span className="list-row__meta">{meta}</span>}
      </span>
      <span
        className={cn(
          "list-row__status",
          status !== "none" && `list-row__status--${status}`,
        )}
      >
        {trailing}
        {status === "success" && <Check aria-label="Completed" />}
        {status === "danger" && <X aria-label="Failed" />}
        {status === "running" && (
          <Loader2 className="animate-spin" aria-label="Running" />
        )}
        {showChevron && (
          <span className="list-row__chevron">
            <ChevronRight aria-hidden="true" />
          </span>
        )}
      </span>
    </Component>
  );
}

export function List({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("list", className)} {...rest}>
      {children}
    </div>
  );
}
