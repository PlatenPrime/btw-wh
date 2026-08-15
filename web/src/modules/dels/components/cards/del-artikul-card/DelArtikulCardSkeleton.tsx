import { ListRowCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";

export function DelArtikulCardSkeleton() {
  return (
    <ListRowCard className="flex flex-col gap-2 p-2 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Skeleton className="size-12 shrink-0 rounded" />
        <div className="grid min-w-0 flex-1 gap-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <div className="flex w-full shrink-0 items-center justify-between gap-2 sm:w-auto">
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <Skeleton className="size-6 shrink-0 rounded-md" />
            <Skeleton className="h-4 w-6" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="size-6 shrink-0 rounded-md" />
            <Skeleton className="h-4 w-6" />
          </div>
        </div>
        <Skeleton className="size-8 rounded-md" />
      </div>
    </ListRowCard>
  );
}
