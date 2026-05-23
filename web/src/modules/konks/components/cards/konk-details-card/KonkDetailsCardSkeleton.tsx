import { DetailPanelCard } from "@/components/shared/cards";
import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function KonkDetailsCardSkeleton() {
  return (
    <DetailPanelCard className="overflow-hidden">
      <CardContent className="grid grid-cols-[auto_1fr] items-start gap-3 p-0">
        <Skeleton className="aspect-square w-16 shrink-0 rounded-xl" />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-40" />
        </div>
      </CardContent>
    </DetailPanelCard>
  );
}
