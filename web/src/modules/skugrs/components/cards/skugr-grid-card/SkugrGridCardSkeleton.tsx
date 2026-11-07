import { GridTileCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";

export function SkugrGridCardSkeleton() {
  return (
    <GridTileCard className="relative flex h-full w-full flex-col gap-2 overflow-hidden p-2">
      <div className="absolute top-1 right-1">
        <Skeleton className="size-7 rounded-full" />
      </div>
      <div className="grid gap-1 px-1 pt-1 pr-8">
        <div className="flex justify-center">
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex justify-center">
          <div className="flex items-center gap-1">
            <Skeleton className="size-6 rounded" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>
      <div className="border-border/80 flex items-center justify-between border-t px-1 pt-1.5">
        <div className="flex items-center gap-1.5">
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-4 w-8" />
      </div>
    </GridTileCard>
  );
}
