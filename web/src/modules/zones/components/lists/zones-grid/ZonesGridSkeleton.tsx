import { SurfaceSection } from "@/components/shared/layout";
import { ZonesGridCardSkeleton } from "@/modules/zones/components/cards/zones-grid-card";

interface ZonesGridSkeletonProps {
  count?: number;
}

export function ZonesGridSkeleton({ count = 20 }: ZonesGridSkeletonProps) {
  return (
    <SurfaceSection className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <ZonesGridCardSkeleton key={index} />
      ))}
    </SurfaceSection>
  );
}



