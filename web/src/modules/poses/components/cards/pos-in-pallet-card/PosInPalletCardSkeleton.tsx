import { GridTileCard } from "@/components/shared/cards";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PosInPalletCardSkeleton() {
  return (
    <GridTileCard className="flex h-full flex-col justify-between gap-2 overflow-hidden p-2">
      <CardHeader className="flex min-h-0 shrink-0 items-start gap-3 p-0">
        <div className="flex min-h-0 flex-1 items-start gap-3">
          <Skeleton className="size-10 rounded-md" />
          <div className="flex min-h-0 flex-1 flex-col gap-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <div className="grid gap-1">
          <Skeleton className="size-6" />
          <Skeleton className="size-6" />
        </div>
      </CardHeader>

      <CardContent className="shrink-0 p-0">
        <div className="grid grid-cols-3 gap-1.5">
          <div className="flex min-h-8 items-center justify-center gap-1 rounded-lg bg-muted/30 px-2 py-1">
            <Skeleton className="size-6 shrink-0 rounded-md" />
            <Skeleton className="h-3 w-12" />
          </div>
          <div className="flex min-h-8 items-center justify-center gap-1 rounded-lg bg-muted/30 px-2 py-1">
            <Skeleton className="size-6 shrink-0 rounded-md" />
            <Skeleton className="h-3 w-8" />
          </div>
          <div className="flex min-h-8 items-center justify-center gap-1 rounded-lg bg-muted/30 px-2 py-1">
            <Skeleton className="size-6 shrink-0 rounded-md" />
            <Skeleton className="h-3 w-8" />
          </div>
        </div>
      </CardContent>
    </GridTileCard>
  );
}
