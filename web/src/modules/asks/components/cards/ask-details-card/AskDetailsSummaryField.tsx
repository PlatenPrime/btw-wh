import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface AskDetailsSummaryFieldProps {
  label: string;
  value: ReactNode;
  className?: string;
  valueClassName?: string;
}

export function AskDetailsSummaryField({
  label,
  value,
  className,
  valueClassName,
}: AskDetailsSummaryFieldProps) {
  return (
    <div className={cn("grid min-w-0 gap-0.5", className)}>
      <span className="text-muted-foreground/80 text-xs leading-none">
        {label}
      </span>
      <span
        className={cn(
          "text-foreground text-sm leading-snug font-medium",
          valueClassName,
        )}
      >
        {value}
      </span>
    </div>
  );
}
