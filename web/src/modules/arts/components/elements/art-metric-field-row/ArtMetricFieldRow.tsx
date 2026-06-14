import { SummaryField } from "@/components/shared/elements/summary-field";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface ArtMetricFieldRowProps {
  icon: LucideIcon;
  iconClassName: string;
  label: string;
  value: ReactNode;
}

export function ArtMetricFieldRow({
  icon: Icon,
  iconClassName,
  label,
  value,
}: ArtMetricFieldRowProps) {
  return (
    <div className="flex items-start gap-2">
      <Icon className={cn("mt-0.5 size-4 shrink-0", iconClassName)} />
      <SummaryField label={label} value={value} className="min-w-0 flex-1" />
    </div>
  );
}
