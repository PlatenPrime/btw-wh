import { ZonesGridCardSkeleton } from "@/modules/zones/components/cards/zones-grid-card";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";

interface ZonesGridSkeletonProps {
  count?: number;
}

export function ZonesGridSkeleton({ count = 20 }: ZonesGridSkeletonProps) {
  return (
    <Wrapper className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <ZonesGridCardSkeleton key={index} />
      ))}
    </Wrapper>
  );
}



