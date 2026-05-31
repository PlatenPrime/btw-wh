import { SalesChartSkeleton } from "@/modules/sales/components/containers/sales-chart-container/SalesChartSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function SalesContainerSkeleton() {
  return (
    <div className="grid gap-4">
      <Skeleton className="h-24 w-full rounded-xl" />
      <SalesChartSkeleton />
    </div>
  );
}
