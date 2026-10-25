import { DetailPanelCard } from "@/components/shared/cards";
import { MetricChipSkeleton } from "@/components/shared/elements";
import { Skeleton } from "@/components/ui/skeleton";

export function ApiTaskDetailContainerSkeleton() {
  return (
    <div className="grid gap-3">
      <Skeleton className="h-8 w-40" />

      <DetailPanelCard className="gap-0 overflow-hidden p-0">
        <section className="grid gap-3 border-b border-border p-4 sm:p-5">
          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="grid min-w-0 flex-1 gap-2">
              <Skeleton className="h-5 w-64" />
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="h-6 w-24 shrink-0 rounded-md" />
          </div>
        </section>

        <div className="grid sm:grid-cols-2 sm:items-stretch">
          <section className="grid min-w-0 gap-3 self-start border-border p-4 sm:border-r sm:p-5">
            <Skeleton className="h-3 w-16" />
            <div className="grid gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <MetricChipSkeleton key={index} className="w-full" />
              ))}
            </div>
          </section>

          <section className="grid min-w-0 gap-3 self-start border-t border-border p-4 sm:border-t-0 sm:p-5">
            <Skeleton className="h-3 w-16" />
            <div className="grid gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <MetricChipSkeleton key={index} className="w-full" />
              ))}
            </div>
          </section>
        </div>

        <section className="grid gap-3 border-t border-border p-4 sm:p-5">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-40 w-full rounded-md" />
        </section>
      </DetailPanelCard>
    </div>
  );
}
