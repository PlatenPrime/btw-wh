import { SurfaceSection } from "@/components/shared/layout";
import { GraboSkuGridCardSkeleton } from "@/modules/grabo-skus/components/cards/grabo-sku-grid-card";

interface GraboSkusGridSkeletonProps {
  count?: number;
}

export function GraboSkusGridSkeleton({
  count = 10,
}: GraboSkusGridSkeletonProps) {
  return (
    <SurfaceSection className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <GraboSkuGridCardSkeleton key={index} />
      ))}
    </SurfaceSection>
  );
}
