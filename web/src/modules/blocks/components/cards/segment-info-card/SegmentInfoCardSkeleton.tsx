import { ListRowCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";

export function SegmentInfoCardSkeleton() {
  return (
    <ListRowCard className="gap-2">
      <div className="grid gap-2 p-0">
        <div className="flex gap-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-8" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-8" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-8" />
        </div>
      </div>
    </ListRowCard>
  );
}
