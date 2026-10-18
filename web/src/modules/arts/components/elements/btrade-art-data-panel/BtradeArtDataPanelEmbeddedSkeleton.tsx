import { MetricChipSkeleton } from "@/components/shared/elements";

export function BtradeArtDataPanelEmbeddedSkeleton() {
  return (
    <div className="grid gap-2">
      <MetricChipSkeleton className="w-full" />
      <MetricChipSkeleton className="w-full" />
    </div>
  );
}