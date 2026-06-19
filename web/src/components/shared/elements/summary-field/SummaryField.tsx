import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";
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
      <span className={typography.label}>{label}</span>
      <span className={cn(typography.value, valueClassName)}>
        {value}
      </span>
    </div>
  );
}
