import { MetricChipSkeleton } from "@/components/shared/elements";
import { Skeleton } from "@/components/ui/skeleton";
import { BtradeArtDataPanelSkeleton } from "@/modules/arts/components/elements/btrade-art-data-panel";

export function AskDetailsPanelsSectionSkeleton() {
  return (
    <div className="border-border/40 grid gap-3 border-t p-4 sm:grid-cols-2">
      <div className="bg-muted/30 grid gap-2.5 rounded-lg p-3">
        <Skeleton className="h-3 w-12" />
        <div className="flex flex-wrap gap-2">
          <MetricChipSkeleton />
        </div>
      </div>

      <BtradeArtDataPanelSkeleton />
    </div>
  );
}
