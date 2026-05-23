import { ChartSection } from "@/components/shared/charts/chart-section/ChartSection";
import { Skeleton } from "@/components/ui/skeleton";

export function SkuChartsSectionSkeleton() {
  return (
    <div className="grid gap-3">
      <div className="grid gap-2 rounded-lg border p-2 sm:grid-cols-3">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full sm:justify-self-end sm:w-24" />
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
  );
}
