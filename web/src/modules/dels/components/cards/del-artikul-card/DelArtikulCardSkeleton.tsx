import { ListRowCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";

export function DelArtikulCardSkeleton() {
  return (
    <ListRowCard className="flex flex-row items-center gap-2 p-2">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Skeleton className="size-12 shrink-0 rounded" />
        <Skeleton className="h-5 min-w-0 max-w-32 flex-1" />
        <Skeleton className="h-4 w-8 shrink-0" />
        <Skeleton className="h-4 w-8 shrink-0" />
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Skeleton className="h-8 w-24" />
      </div>
    </ListRowCard>
  );
}
