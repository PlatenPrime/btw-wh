import { Skeleton } from "@/components/ui/skeleton";
import { ArtsGridSkeleton } from "../../lists/arts-grid/ArtsGridSkeleton";

export function ArtsContainerSkeleton() {
  return (
    <main className="grid max-w-screen grid-cols-1 gap-2 p-2 md:gap-4 md:p-4">
      <div className="flex flex-col items-center gap-4 xl:flex-row">
        {/* SearchPanel skeleton */}
        <div className="relative flex w-full items-center gap-2">
          <Skeleton className="absolute top-1/2 left-2 size-4 -translate-y-1/2" />
          <Skeleton className="h-10 w-full pl-8" />
        </div>
      </div>

      {/* ArtsGrid skeleton */}
      <ArtsGridSkeleton />

      {/* Bottom spacing skeleton */}
      <div className="h-8" />
    </main>
  );
}
