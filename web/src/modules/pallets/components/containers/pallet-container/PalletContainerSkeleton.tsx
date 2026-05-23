import { SurfaceSection } from "@/components/shared/wrappers/SurfaceSection";
import { Skeleton } from "@/components/ui/skeleton";
import { PosesByPalletContainerSkeleton } from "@/modules/poses/components/containers/poses-by-pallet-container";

export function PalletContainerSkeleton() {
  return (
    <div className="grid gap-2">
      {/* Header skeleton */}
      <SurfaceSection className="grid gap-2">
        <div className="grid place-content-center gap-2 md:grid-cols-3">
          {/* PalletSortControls skeleton */}
          <Skeleton className="h-9 w-32" />
          {/* Pallet info skeleton */}
          <Skeleton className="h-9 w-24" />
          {/* Create pos button skeleton */}
          <Skeleton className="h-9 w-32" />
        </div>
      </SurfaceSection>

      {/* Poses list skeleton */}
      <PosesByPalletContainerSkeleton />
    </div>
  );
}
