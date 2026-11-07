import { GridTileCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";

export function VariantGridCardSkeleton() {
  return (
    <GridTileCard className="relative flex flex-col gap-2 overflow-hidden p-2">
      <div className="absolute top-1 right-1">
        <Skeleton className="size-7 rounded-full" />
      </div>
      <div className="flex items-start gap-2 pr-8">
        <Skeleton className="size-14 shrink-0 rounded-lg" />
        <div className="grid flex-1 gap-1">
          <Skeleton className="h-4 w-24" />
          <div className="flex items-center gap-1">
            <Skeleton className="size-6 rounded" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <div className="border-border/80 flex items-center gap-1.5 border-t pt-1.5">
        <Skeleton className="size-8 rounded-md" />
        <Skeleton className="h-3 w-28" />
      </div>
    </GridTileCard>
  );
}
