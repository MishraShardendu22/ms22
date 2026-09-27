import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
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

export interface PageHeaderProps
  extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  kicker?: ReactNode;
  /** The serif title. Wrap one word in <em> for the italic accent. */
  title: ReactNode;
  /** 'h1' by default. */
  titleAs?: ElementType;
  subtitle?: ReactNode;
  /** Optional action buttons or badges. */
  actions?: ReactNode;
}

/** The top of an Observatory page: kicker, serif title, subtitle, and action buttons. */
export function PageHeader({
  kicker,
  title,
  titleAs: Heading = "h1",
  subtitle,
  actions,
  className,
  ...rest
}: PageHeaderProps) {
  return (
    <div className={cn("page-header", className)} {...rest}>
      <div className="page-header__text">
        {kicker && <Kicker>{kicker}</Kicker>}
        <Heading className="page-title">{title}</Heading>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {actions && (
        <div className="page-header__actions mt-4 flex flex-wrap items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}
