import { MetricChipSkeleton } from "@/components/shared/elements";

export function BtradeArtDataPanelEmbeddedSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      <MetricChipSkeleton />
      <MetricChipSkeleton />
    </div>
  );
}
