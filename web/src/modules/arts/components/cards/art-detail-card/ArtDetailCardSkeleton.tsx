import { DetailPanelCard } from "@/components/shared/cards";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { BtradeArtDataPanelEmbeddedSkeleton } from "@/modules/arts/components/elements/btrade-art-data-panel";

export function ArtDetailCardSkeleton() {
  return (
    <DetailPanelCard className="gap-0 overflow-hidden p-0">
      <div className="flex flex-col lg:flex-row lg:items-start">
        <section className="flex min-w-0 flex-1 items-start gap-4 p-4 sm:p-5">
          <Skeleton className="size-16 shrink-0 rounded-lg sm:size-20" />
          <div className="grid min-w-0 flex-1 gap-2">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-4 w-full max-w-md" />
            <div className="flex items-center gap-2">
              <Skeleton className="size-6 shrink-0 rounded-md" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </section>

        <Separator className="lg:hidden" />
        <Separator orientation="vertical" className="hidden self-stretch lg:block" />

        <section className="grid shrink-0 gap-3 self-start p-4 sm:p-5 lg:w-44 xl:w-48">
          <Skeleton className="h-3 w-12" />
          <div className="grid gap-3">
            <div className="flex items-start gap-2">
              <Skeleton className="mt-0.5 size-4 shrink-0 rounded-sm" />
              <div className="grid min-w-0 flex-1 gap-1">
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-4 w-14" />
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Skeleton className="mt-0.5 size-4 shrink-0 rounded-sm" />
              <div className="grid min-w-0 flex-1 gap-1">
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        </section>

        <Separator className="lg:hidden" />
        <Separator orientation="vertical" className="hidden self-stretch lg:block" />

        <section className="grid shrink-0 gap-3 self-start p-4 sm:p-5 lg:w-52 xl:w-56">
          <Skeleton className="h-3 w-16" />
          <BtradeArtDataPanelEmbeddedSkeleton />
        </section>
      </div>
    </DetailPanelCard>
  );
}
