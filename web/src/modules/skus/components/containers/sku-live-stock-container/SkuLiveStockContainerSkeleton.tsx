import { MetricChipSkeleton } from "@/components/shared/elements";

export function SkuLiveStockContainerSkeleton() {
  return (
    <div className="contents">
      <MetricChipSkeleton className="w-full" />
      <MetricChipSkeleton className="w-full" />
    </div>
  );
}
