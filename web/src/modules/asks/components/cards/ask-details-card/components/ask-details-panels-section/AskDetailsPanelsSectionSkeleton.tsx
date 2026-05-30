import { Skeleton } from "@/components/ui/skeleton";
import {
  BtradeArtDataPanelSkeleton,
  BtradeArtDataPanelView,
} from "@/modules/arts/components/elements/btrade-art-data-panel";

export function AskDetailsPanelsSectionSkeleton() {
  return (
    <div className="border-border/40 grid gap-3 border-t p-4 sm:grid-cols-2">
      <div className="bg-muted/30 grid gap-2.5 rounded-lg p-3">
        <Skeleton className="h-3 w-12" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
          <div className="grid gap-0.5">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>
      </div>

      <BtradeArtDataPanelView>
        <BtradeArtDataPanelSkeleton />
      </BtradeArtDataPanelView>
    </div>
  );
}
