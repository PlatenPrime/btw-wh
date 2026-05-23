import { ChartSection } from "@/components/shared/charts/chart-section/ChartSection";
import { Skeleton } from "@/components/ui/skeleton";
import { AnalogDetailsCardSkeleton } from "@/modules/analogs/components/cards/analog-details-card";

export function AnalogContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <AnalogDetailsCardSkeleton />
      <div className="grid gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-9 w-[120px]" />
        </div>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <ChartSection title="Динаміка залишків та ціни">
            <Skeleton className="h-64 w-full" />
          </ChartSection>
          <ChartSection title="Динаміка продаж">
            <Skeleton className="h-64 w-full" />
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
