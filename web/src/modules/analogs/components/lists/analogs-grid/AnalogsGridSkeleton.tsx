import { SurfaceSection } from "@/components/shared/layout";
import { AnalogGridCardSkeleton } from "@/modules/analogs/components/cards/analog-grid-card/AnalogGridCardSkeleton";

interface AnalogsGridSkeletonProps {
  count?: number;
}

export function AnalogsGridSkeleton({ count = 10 }: AnalogsGridSkeletonProps) {
  return (
    <SurfaceSection className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <AnalogGridCardSkeleton key={index} />
      ))}
    </SurfaceSection>
  );
}
