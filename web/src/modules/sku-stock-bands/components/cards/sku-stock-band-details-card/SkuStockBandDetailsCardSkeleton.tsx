import { DetailPanelCard } from "@/components/shared/cards";
import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkuStockBandDetailsCardSkeleton() {
  return (
    <DetailPanelCard>
      <CardContent className="grid gap-3 p-0">
        <div className="grid gap-1">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </DetailPanelCard>
  );
}
