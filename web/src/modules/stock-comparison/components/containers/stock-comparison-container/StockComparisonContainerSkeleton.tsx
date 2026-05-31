import { StockChartSkeleton } from "@/modules/stock-comparison/components/containers/stock-chart-container/StockChartSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function StockComparisonContainerSkeleton() {
  return (
    <div className="grid gap-4">
      <Skeleton className="h-24 w-full rounded-xl" />
      <StockChartSkeleton />
    </div>
  );
}
