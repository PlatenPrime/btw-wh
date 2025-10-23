import { ZonesGridCardSkeleton } from "@/modules/zones/components/cards/zones-grid-card";

interface ZonesGridSkeletonProps {
  count?: number;
}

export function ZonesGridSkeleton({ count = 8 }: ZonesGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <ZonesGridCardSkeleton key={index} />
      ))}
    </div>
  );
}

