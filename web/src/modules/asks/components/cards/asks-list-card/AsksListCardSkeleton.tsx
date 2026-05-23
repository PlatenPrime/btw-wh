import { ListRowCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";

export function AsksListCardSkeleton() {
  return (
    <ListRowCard className="grid gap-2">
      <div className="flex items-start gap-3">
        <Skeleton className="size-16 rounded-md" />
        <div className="grid gap-1">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-20 rounded-md" />
          </div>
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      <div className="grid gap-2 pl-12">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="size-4" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    </ListRowCard>
  );
}
