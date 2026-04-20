import { SkuDetailCardSkeleton } from "@/modules/skus/components/cards/sku-detail-card/SkuDetailCardSkeleton";
import { SkuChartsSectionSkeleton } from "@/modules/skus/components/charts/sku-charts-section/SkuChartsSectionSkeleton";

export function SkuContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <SkuDetailCardSkeleton />
      <SkuChartsSectionSkeleton />
    </div>
  );
}
