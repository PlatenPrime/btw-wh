import { DetailPanelCard } from "@/components/shared/cards";
import { CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProdDetailsCardSkeleton() {
  return (
    <DetailPanelCard className="p-2">
      <CardContent className="flex items-start gap-2 p-0">
        <Skeleton className="aspect-square w-16 shrink-0 rounded-lg" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <CardTitle className="p-0">
            <Skeleton className="h-5 w-32" />
          </CardTitle>
          <Skeleton className="h-3 w-24" />
        </div>
      </CardContent>
    </DetailPanelCard>
  );
}
