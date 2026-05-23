import { ListRowCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";

export function SegmentCardSkeleton() {
  return (
    <ListRowCard>
      <div className="flex items-center justify-between gap-2 p-0">
        <div className="flex flex-1 items-center gap-2">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="size-6 rounded-md" />
      </div>
    </ListRowCard>
  );
}
