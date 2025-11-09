import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { PosesByPalletContainerSkeleton } from "@/modules/poses/components/containers/poses-by-pallet-container";

export function PalletContainerSkeleton() {
  return (
    <div className="grid gap-2">
      {/* Header skeleton */}
      <Wrapper className="flex flex-wrap items-center justify-between gap-2">
        {/* Create pos button skeleton */}
        <Skeleton className="h-9 w-32" />
        {/* Pallet info skeleton */}
        <Skeleton className="h-9 w-24" />
        {/* Pallet control skeleton */}
        <Skeleton className="h-9 w-16" />
      </Wrapper>

      {/* Poses list skeleton */}
      <PosesByPalletContainerSkeleton />
    </div>
  );
}
