import { DefsStatsSkeleton } from "@/modules/defs/components/elements/defs-stats/DefsStatsSkeleton";
import { DefsGridSkeleton } from "@/modules/defs/components/lists/defs-grid/DefsGridSkeleton";

export function DefsContainerSkeleton() {
  return (
    <div className="grid gap-2">
      {/* Statistics skeleton */}
      <DefsStatsSkeleton />

      {/* Defs grid skeleton */}
      <DefsGridSkeleton />
    </div>
  );
}
