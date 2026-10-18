import { DetailPanelCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";
import { AskDetailsMetaPanelSkeleton } from "@/modules/asks/components/cards/ask-details-card/components/ask-details-meta-panel/AskDetailsMetaPanelSkeleton";
import { BtradeArtDataPanelEmbeddedSkeleton } from "@/modules/arts/components/elements/btrade-art-data-panel";

export function AskDetailsCardSkeleton() {
  return (
    <DetailPanelCard className="gap-0 overflow-hidden p-0">
      <section className="grid min-w-0 gap-3 border-b border-border p-4 sm:p-5">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-start gap-4">
            <Skeleton className="size-16 shrink-0 rounded-lg sm:size-20" />
            <div className="grid min-w-0 flex-1 gap-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-full max-w-md" />
            </div>
          </div>
          <Skeleton className="h-5 w-20 shrink-0 rounded-md" />
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="size-4 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="size-4 shrink-0" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </section>

      <div className="grid sm:grid-cols-2 sm:items-stretch">
        <section className="grid min-w-0 gap-3 self-start border-border p-4 sm:border-r sm:p-5">
          <AskDetailsMetaPanelSkeleton />
        </section>

        <section className="grid min-w-0 gap-3 self-start border-t border-border p-4 sm:border-t-0 sm:p-5">
          <Skeleton className="h-3 w-16" />
          <BtradeArtDataPanelEmbeddedSkeleton />
        </section>
      </div>
    </DetailPanelCard>
  );
}
