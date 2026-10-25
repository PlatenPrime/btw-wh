import { MetricChip } from "@/components/shared/elements";
import { Package } from "lucide-react";

interface AskEventsPullInfoProps {
  totalQuant: number;
  totalBoxes?: number;
}

export function AskEventsPullInfo({
  totalQuant,
  totalBoxes,
}: AskEventsPullInfoProps) {
  return (
    <MetricChip
      icon={Package}
      tone="success"
      label="Знято"
      value={`${totalQuant} шт. / ${totalBoxes ?? 0} кор.`}
      className="w-full"
    />
  );
}
