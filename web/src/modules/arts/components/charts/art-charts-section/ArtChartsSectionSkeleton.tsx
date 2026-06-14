import { ChartSection } from "@/components/shared/charts/chart-section/ChartSection";
import { ArtSalesChartSkeleton } from "@/modules/arts/components/charts/art-sales-chart/ArtSalesChartSkeleton";
import { ArtStockChartSkeleton } from "@/modules/arts/components/charts/art-stock-chart/ArtStockChartSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function ArtChartsSectionSkeleton() {
  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center justify-center gap-3 rounded-xl border border-border/60 bg-surface-1/90 p-2 shadow-elevation-1">
        <Skeleton className="h-9 min-w-[220px] w-full max-w-sm" />
      </div>
      <div className="grid grid-cols-1 items-stretch gap-2 lg:grid-cols-2">
        <ChartSection title="Динаміка залишків" className="h-full">
          <ArtStockChartSkeleton />
        </ChartSection>
        <ChartSection title="Динаміка продаж" className="h-full">
          <ArtSalesChartSkeleton />
        </ChartSection>
      </div>
    </div>
  );
}
