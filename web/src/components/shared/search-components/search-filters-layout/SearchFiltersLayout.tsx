import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SearchFiltersLayoutProps {
  searchSlot: ReactNode;
  filtersSlot: ReactNode;
  className?: string;
  searchSlotClassName?: string;
  filtersSlotClassName?: string;
}

export function SearchFiltersLayout({
  searchSlot,
  filtersSlot,
  className,
  searchSlotClassName,
  filtersSlotClassName,
}: SearchFiltersLayoutProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-2 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start",
        className,
      )}
    >
      <div className={cn("min-w-0", searchSlotClassName)}>{searchSlot}</div>
      <div className={cn("min-w-0 lg:justify-self-end", filtersSlotClassName)}>
        {filtersSlot}
      </div>
    </div>
  );
}
