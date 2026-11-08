import { ListRowCard } from "@/components/shared/cards";
import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkuStockBandCardSkeleton() {
  return (
    <ListRowCard>
      <CardContent className="flex items-center gap-3 p-0">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="grid shrink-0 gap-1">
          <Skeleton className="ml-auto h-4 w-24" />
          <Skeleton className="ml-auto h-3 w-20" />
        </div>
      </CardContent>
    </ListRowCard>
  );
}
