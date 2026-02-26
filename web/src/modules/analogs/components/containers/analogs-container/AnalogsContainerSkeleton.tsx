import { Skeleton } from "@/components/ui/skeleton";
import { AnalogsGridSkeleton } from "@/modules/analogs/components/lists/analogs-grid/AnalogsGridSkeleton";

export function AnalogsContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <Skeleton className="h-12" />
      <AnalogsGridSkeleton count={10} />
    </div>
  );
}
