import { GridTileCard } from "@/components/shared/cards";
import { CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RowsGridCardSkeleton() {
  return (
    <GridTileCard className="group/row h-full w-full">
      <CardHeader className="flex items-center justify-between gap-3 px-3 py-2">
        <div className="flex-1">
          <Skeleton className="h-5 w-32 max-w-full" />
        </div>
        <Skeleton className="size-7 shrink-0 rounded-md" />
      </CardHeader>
    </GridTileCard>
  );
}
