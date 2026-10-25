import { ART_CHART_PLOT_CLASS } from "@/modules/arts/components/charts/art-chart-plot-height";
import { ArtMetricCard } from "@/modules/arts/components/charts/art-metric-card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ArtStockChartSkeleton() {
  return (
    <div className="grid gap-3">
      <ArtMetricCard className="w-fit self-start">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 shrink-0 rounded-sm" />
          <div className="grid gap-1">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </ArtMetricCard>
      <Skeleton className={cn(ART_CHART_PLOT_CLASS)} />
    </div>
  );
}
