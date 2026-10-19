import { DetailPanelCard } from "@/components/shared/cards";
import { MetricChipSkeleton } from "@/components/shared/elements";
import { Skeleton } from "@/components/ui/skeleton";

export function SkugrDetailCardSkeleton() {
  return (
    <DetailPanelCard className="gap-0 overflow-hidden p-0">
      <Skeleton className="h-10 w-full rounded-none" />
      <div className="grid gap-3 p-4 sm:p-5">
        <Skeleton className="h-5 w-48" />
        <div className="grid gap-2 sm:grid-cols-2">
          <MetricChipSkeleton className="w-full" />
          <MetricChipSkeleton className="w-full" />
        </div>
      </div>
    </DetailPanelCard>
  );
}
