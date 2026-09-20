import { SurfaceSection } from "@/components/shared/layout";
import { Skeleton } from "@/components/ui/skeleton";
import { SkuPackFlipsTableSkeleton } from "@/modules/sku-analytics/components/tables/sku-pack-flips-table";
import type { SkuPackFlipsTableVariant } from "@/modules/sku-analytics/components/tables/sku-pack-flips-table/SkuPackFlipsTable";

const SECTIONS: SkuPackFlipsTableVariant[] = [
  "patched",
  "priceOnly",
  "ambiguous",
];

export function SkuPackFlipsContainerSkeleton() {
  return (
    <div className="grid gap-4">
      {SECTIONS.map((variant) => (
        <SurfaceSection key={variant} className="grid gap-3 p-0">
          <div className="flex items-baseline gap-2 px-3 pt-3">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-3 w-6" />
          </div>
          <SkuPackFlipsTableSkeleton variant={variant} />
        </SurfaceSection>
      ))}
    </div>
  );
}
