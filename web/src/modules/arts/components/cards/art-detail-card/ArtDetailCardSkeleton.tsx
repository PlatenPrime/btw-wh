import { DetailPanelCard } from "@/components/shared/cards";
import { MetricChipSkeleton } from "@/components/shared/elements";
import { Skeleton } from "@/components/ui/skeleton";
import { BtradeArtDataPanelEmbeddedSkeleton } from "@/modules/arts/components/elements/btrade-art-data-panel";

export function ArtDetailCardSkeleton() {
  return (
    <DetailPanelCard className="gap-0 overflow-hidden p-0">
      <div className="grid lg:grid-cols-3 lg:items-stretch">
        <section className="grid min-w-0 gap-3 self-start border-border p-4 sm:p-5 lg:border-r">
          <div className="flex min-w-0 items-start gap-4">
            <Skeleton className="size-16 shrink-0 rounded-lg sm:size-20" />
            <div className="grid min-w-0 flex-1 gap-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-full max-w-md" />
            </div>
          </div>
          <MetricChipSkeleton className="w-full" />
        </section>

        <section className="grid min-w-0 gap-3 self-start border-t border-border p-4 sm:p-5 lg:border-t-0 lg:border-r">
          <Skeleton className="h-3 w-12" />
          <div className="grid gap-2">
            <MetricChipSkeleton className="w-full" />
            <MetricChipSkeleton className="w-full" />
            <MetricChipSkeleton className="w-full" />
            <MetricChipSkeleton className="w-full" />
          </div>
        </section>

        <section className="grid min-w-0 gap-3 self-start border-t border-border p-4 sm:p-5 lg:border-t-0">
          <Skeleton className="h-3 w-16" />
          <BtradeArtDataPanelEmbeddedSkeleton />
        </section>
      </div>
    </DetailPanelCard>
  );
}
