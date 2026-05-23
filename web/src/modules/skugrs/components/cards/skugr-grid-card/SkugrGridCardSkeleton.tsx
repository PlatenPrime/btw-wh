import { GridTileCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";

export function SkugrGridCardSkeleton() {
  return (
    <GridTileCard className="flex h-full w-full flex-col gap-0 overflow-hidden p-0">
      <Skeleton className="h-8 w-full rounded-none" />
      <div className="flex justify-center py-2">
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex items-center justify-between border-t border-border/80 px-2 py-1.5">
        <div className="flex items-center gap-2">
          <Skeleton className="size-6 rounded-md" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-4 w-8" />
      </div>
    </GridTileCard>
  );
}
