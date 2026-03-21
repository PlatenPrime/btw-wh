import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { SkuGridCardSkeleton } from "@/modules/skus/components/cards/sku-grid-card";

interface SkusGridSkeletonProps {
  count?: number;
}

export function SkusGridSkeleton({ count = 10 }: SkusGridSkeletonProps) {
  return (
    <Wrapper className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <SkuGridCardSkeleton key={index} />
      ))}
    </Wrapper>
  );
}
