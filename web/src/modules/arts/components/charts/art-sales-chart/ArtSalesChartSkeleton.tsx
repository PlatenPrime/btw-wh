import { ART_CHART_PLOT_CLASS } from "@/modules/arts/components/charts/art-chart-plot-height";
import { ArtChartCard } from "@/modules/arts/components/charts/art-chart-card";
import { ArtMetricCardSkeleton } from "@/modules/arts/components/charts/art-metric-card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function ArtSalesChartLegendSkeleton() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-9 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-9 rounded-full" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
}

export function ArtSalesChartSkeleton() {
  return (
    <div className="grid h-full gap-3 grid-rows-[auto_1fr]">
      <div className="grid gap-4 sm:grid-cols-2 sm:items-stretch">
        <ArtMetricCardSkeleton valueWidthClassName="w-28" />
        <ArtMetricCardSkeleton valueWidthClassName="w-32" />
      </div>
      <ArtChartCard>
        <div className="grid h-full min-h-0 grid-rows-[auto_1fr] gap-3">
          <ArtSalesChartLegendSkeleton />
          <Skeleton className={cn("min-h-0 flex-1", ART_CHART_PLOT_CLASS)} />
        </div>
      </ArtChartCard>
    </div>
  );
}
