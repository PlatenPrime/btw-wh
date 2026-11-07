import { GridTileCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";

export function SkuGridCardSkeleton() {
  return (
    <GridTileCard className="flex flex-col gap-2 overflow-hidden p-2">
      <div className="flex min-h-0 min-w-0 items-start gap-3">
        <Skeleton className="size-14 shrink-0 rounded-lg" />
        <div className="grid flex-1 gap-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-3/4" />
          <div className="mt-0.5 flex items-center gap-1">
            <Skeleton className="size-6 rounded" />
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="flex items-center gap-1.5">
            <Skeleton className="size-8 rounded-md" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      </div>
    </GridTileCard>
  );
}
