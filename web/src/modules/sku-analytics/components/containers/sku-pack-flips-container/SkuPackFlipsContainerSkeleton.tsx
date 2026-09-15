import { SurfaceSection } from "@/components/shared/layout";
import { Skeleton } from "@/components/ui/skeleton";
import { SkuPackFlipsTableSkeleton } from "@/modules/sku-analytics/components/tables/sku-pack-flips-table";

export function SkuPackFlipsContainerSkeleton() {
  return (
    <div className="grid gap-4">
      <Skeleton className="h-4 w-56" />

      <SurfaceSection className="grid gap-3 p-0">
        <div className="grid gap-1 px-3 pt-3">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <SkuPackFlipsTableSkeleton variant="patched" />
      </SurfaceSection>

      <SurfaceSection className="grid gap-3 p-0">
        <div className="grid gap-1 px-3 pt-3">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-4 w-64" />
        </div>
        <SkuPackFlipsTableSkeleton variant="priceOnly" />
      </SurfaceSection>

      <SurfaceSection className="grid gap-3 p-0">
        <div className="grid gap-1 px-3 pt-3">
          <Skeleton className="h-5 w-52" />
          <Skeleton className="h-4 w-80" />
        </div>
        <SkuPackFlipsTableSkeleton variant="ambiguous" />
      </SurfaceSection>
    </div>
  );
}
