import { GridTileCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";

export function ArtGridCardSkeleton() {
  return (
    <GridTileCard className="h-full w-full gap-1 p-0">
      <div className="h-full rounded-xl p-1">
        <div className="flex min-h-0 flex-1 items-start gap-3">
          <Skeleton className="h-12 w-12 shrink-0 rounded-lg" />
          <div className="flex h-full w-full flex-col justify-between gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      </div>
    </GridTileCard>
  );
}
