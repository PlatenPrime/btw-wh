import { Skeleton } from "@/components/ui/skeleton";
import { RowsGridSkeleton } from "@/modules/rows/components/lists/rows-grid/RowsGridSkeleton";

export function RowsContainerSkeleton() {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
      <RowsGridSkeleton />
    </div>
  );
}
