import { ChartSection } from "@/components/shared/charts/chart-section/ChartSection";
import { Skeleton } from "@/components/ui/skeleton";
import { SkugrDetailCardSkeleton } from "@/modules/skugrs/components/cards/skugr-detail-card/SkugrDetailCardSkeleton";

export function SkugrContainerSkeleton() {
  return (
    <div className="grid gap-4">
      <SkugrDetailCardSkeleton />
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <ChartSection title="Динаміка залишків (група)">
          <Skeleton className="h-64 w-full" />
        </ChartSection>
        <ChartSection title="Динаміка продаж (група)">
          <Skeleton className="h-64 w-full" />
        </ChartSection>
      </div>
      <Skeleton className="h-9 w-64" />
      <Skeleton className="h-24 w-full rounded-lg" />
    </div>
  );
}
