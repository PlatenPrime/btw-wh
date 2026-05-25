import { ChartSection } from "@/components/shared/charts/chart-section/ChartSection";
import { SalesRangeChartSkeleton } from "@/components/shared/charts/sales-range-chart";
import { SliceRangeChartSkeleton } from "@/components/shared/charts/slice-range-chart";
import { Skeleton } from "@/components/ui/skeleton";

export function SkugrChartsSectionSkeleton() {
  return (
    <div className="grid gap-3">
      <Skeleton className="h-9 w-64" />
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <ChartSection title="Динаміка залишків (група)">
          <SliceRangeChartSkeleton />
        </ChartSection>
        <ChartSection title="Динаміка продаж (група)">
          <SalesRangeChartSkeleton />
        </ChartSection>
      </div>
    </div>
  );
}
