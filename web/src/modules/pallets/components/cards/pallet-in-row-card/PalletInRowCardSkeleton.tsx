import { GridTileCard } from "@/components/shared/cards";
import { CardAction, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PalletInRowCardSkeleton() {
  return (
    <GridTileCard className="h-full w-full gap-2 p-2">
      <CardHeader className="p-0">
        <div className="flex min-w-0 items-center gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-5 w-14 shrink-0 rounded-md" />
        </div>
        <CardAction>
          <Skeleton className="size-8 shrink-0 rounded-md" />
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-2 p-0">
        <div className="flex items-center justify-start gap-2">
          <Skeleton className="size-6 shrink-0 rounded-md" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex items-center justify-start gap-2">
          <Skeleton className="size-6 shrink-0 rounded-md" />
          <Skeleton className="h-3 w-8" />
        </div>
        <div className="flex items-center justify-start gap-2">
          <Skeleton className="size-6 shrink-0 rounded-md" />
          <Skeleton className="h-3 w-24" />
        </div>
      </CardContent>
    </GridTileCard>
  );
}
