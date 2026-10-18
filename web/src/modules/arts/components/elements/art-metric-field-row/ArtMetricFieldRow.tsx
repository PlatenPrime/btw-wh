import {
  MetricChip,
  type IconWellTone,
} from "@/components/shared/elements";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface ArtMetricFieldRowProps {
  icon: LucideIcon;
  tone?: IconWellTone;
  label: string;
  value: ReactNode;
  className?: string;
}

export function ArtMetricFieldRow({
  icon,
  tone = "muted",
  label,
  value,
  className,
}: ArtMetricFieldRowProps) {
  return (
    <MetricChip
      icon={icon}
      tone={tone}
      label={label}
      value={value}
      className={className}
    />
  );
}
