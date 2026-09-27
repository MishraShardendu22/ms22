import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface StatStripItem {
  value: ReactNode;
  label: ReactNode;
}

/** A row of headline numbers separated by hairlines, inspired by Observatory. */
export function StatStrip({
  items,
  className,
  ...rest
}: ComponentPropsWithoutRef<"div"> & { items: StatStripItem[] }) {
  return (
    <div className={cn("stat-strip", className)} {...rest}>
      {items.map((item, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: items are static copy without ids
        <div className="stat-strip__item" key={index}>
          <div className="stat-strip__value">{item.value}</div>
          <div className="stat-strip__label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
