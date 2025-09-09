import { Skeleton } from "@/components/ui/skeleton";
import { AsksListSkeleton } from "@/modules/asks/components/lists/asks-list/AsksListSkeleton";
import { DateNavigationSkeleton } from "../../../../../components/date-navigation/DateNavigationSkeleton";

export function AsksContainerSkeleton() {
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <DateNavigationSkeleton />
        {/* Counter skeleton */}
        <Skeleton className="h-5 w-20" />
      </div>
      <AsksListSkeleton />
    </div>
  );
}
