import { DetailPanelCard } from "@/components/shared/cards";
import { CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkugrDetailCardSkeleton() {
  return (
    <DetailPanelCard className="gap-2 overflow-hidden p-0">
      <Skeleton className="h-8 w-full rounded-none" />
      <CardHeader className="gap-2 p-2">
        <Skeleton className="h-5 w-48" />
        <div className="flex items-center gap-2">
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-4 w-40" />
      </CardHeader>
    </DetailPanelCard>
  );
}
