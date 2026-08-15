import { ListRowCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";

export function ZonesGridCardSkeleton() {
  return (
    <ListRowCard>
      <div className="flex flex-col gap-2 p-0">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="size-6 rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="size-6 shrink-0 rounded-md" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="size-6 shrink-0 rounded-md" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </ListRowCard>
  );
}
