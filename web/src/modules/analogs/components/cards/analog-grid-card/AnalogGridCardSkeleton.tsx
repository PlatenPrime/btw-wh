import { GridTileCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";

export function AnalogGridCardSkeleton() {
  return (
    <GridTileCard className="gap-0 p-2">
      <div className="flex items-center justify-between gap-2 p-0">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-6 shrink-0" />
      </div>
      <div className="grid gap-2 p-0 pt-2">
        <div className="flex items-start gap-3">
          <Skeleton className="aspect-square w-full max-w-[6rem] rounded-lg" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </GridTileCard>
  );
}
