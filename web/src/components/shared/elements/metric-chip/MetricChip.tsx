import {
  IconWell,
  type IconWellTone,
} from "@/components/shared/elements/icon-well";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface MetricChipProps {
  icon: LucideIcon;
  tone?: IconWellTone;
  label: string;
  value: ReactNode;
  className?: string;
}

export function MetricChip({
  icon,
  tone = "muted",
  label,
  value,
  className,
}: MetricChipProps) {
  return (
    <div
      className={cn(
        "flex max-w-full min-w-0 items-center gap-2 rounded-xl border border-border/50 px-2.5 py-2 shadow-elevation-1 glass-inset",
        className,
      )}
    >
      <IconWell icon={icon} tone={tone} size="md" />
      <div className="grid min-w-0 gap-0.5">
        <span className={typography.caption}>{label}</span>
        <span className={cn("break-words", typography.value)}>{value}</span>
      </div>
    </div>
  );
}
