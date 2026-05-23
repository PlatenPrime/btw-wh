import { GridTileCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";

export function SkuGridCardSkeleton() {
  return (
    <GridTileCard className="flex flex-col gap-2 overflow-hidden p-0">
      <Skeleton className="h-8 w-full rounded-none" />
      <div className="flex flex-col gap-2 px-2 pb-1">
        <div className="flex min-h-0 min-w-0 items-start gap-3">
          <Skeleton className="aspect-square w-full max-w-[6rem] shrink-0 rounded-lg" />
          <div className="grid flex-1 gap-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="mt-1 h-3 w-2/3" />
          </div>
        </div>
      </div>
    </GridTileCard>
  );
}
