import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { PalletsListSkeleton } from "@/modules/pallets/components/lists/pallets-list/PalletsListSkeleton";

export function RowContainerSkeleton() {
  return (
    <div className="grid gap-2">
      {/* Header skeleton */}
      <Wrapper className="flex items-start justify-between">
        {/* Create pallet button skeleton */}
        <Skeleton className="h-9 w-32" />
        {/* Delete row button skeleton */}
        <Skeleton className="h-9 w-9" />
      </Wrapper>

      {/* Pallet list skeleton */}
      <PalletsListSkeleton />
    </div>
  );
}
