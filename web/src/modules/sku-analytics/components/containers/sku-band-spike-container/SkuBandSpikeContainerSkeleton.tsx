import { SurfaceSection } from "@/components/shared/layout";
import { Skeleton } from "@/components/ui/skeleton";
import { SkuBandSpikeTableSkeleton } from "@/modules/sku-analytics/components/tables/sku-band-spike-table";

export function SkuBandSpikeContainerSkeleton() {
  return (
    <SurfaceSection className="grid gap-3 p-0">
      <div className="flex items-baseline gap-2 px-3 pt-3">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-3 w-32" />
      </div>
      <SkuBandSpikeTableSkeleton />
    </SurfaceSection>
  );
}
