import { ART_CHART_PLOT_CLASS } from "@/modules/arts/components/charts/art-chart-plot-height";
import { ArtChartCard } from "@/modules/arts/components/charts/art-chart-card";
import { ArtMetricCard } from "@/modules/arts/components/charts/art-metric-card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ArtStockChartSkeleton() {
  return (
    <div className="grid h-full gap-3 grid-rows-[auto_1fr]">
      <ArtMetricCard className="self-start">
        <div className="flex w-full items-center gap-2">
          <Skeleton className="size-4 shrink-0 rounded-sm" />
          <div className="grid flex-1 gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </ArtMetricCard>
      <ArtChartCard>
        <Skeleton className={cn("flex-1", ART_CHART_PLOT_CLASS)} />
      </ArtChartCard>
    </div>
  );
}
