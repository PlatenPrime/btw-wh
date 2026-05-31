import { SurfaceSection } from "@/components/shared/layout";
import { SkugrGridCardSkeleton } from "@/modules/skugrs/components/cards/skugr-grid-card/SkugrGridCardSkeleton";

interface SkugrsGridSkeletonProps {
  count?: number;
}

export function SkugrsGridSkeleton({ count = 8 }: SkugrsGridSkeletonProps) {
  return (
    <SurfaceSection className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <SkugrGridCardSkeleton key={index} />
      ))}
    </SurfaceSection>
  );
}
