import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SummaryFieldProps {
  label: string;
  value: ReactNode;
  className?: string;
  valueClassName?: string;
}

export function SummaryField({
  label,
  value,
  className,
  valueClassName,
}: SummaryFieldProps) {
  return (
    <div className={cn("grid min-w-0 gap-0.5", className)}>
      <span className="text-muted-foreground text-xs leading-none">
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
