import { ListRowCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";

export function DelCardSkeleton() {
  return (
    <ListRowCard>
      <div className="flex items-center gap-2 p-0">
        <Skeleton className="size-12 shrink-0 rounded-lg" />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <Skeleton className="h-4 w-3/4" />
          <div className="flex items-center gap-2">
            <Skeleton className="size-6 shrink-0 rounded-md" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <Skeleton className="size-8 rounded-md" />
      </div>
    </ListRowCard>
  );
}
