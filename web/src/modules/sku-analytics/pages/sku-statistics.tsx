import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { SkuStatisticsControls } from "@/modules/sku-analytics/components/controls/sku-statistics-controls/SkuStatisticsControls";
import { SkuStatisticsFetcher } from "@/modules/sku-analytics/components/fetchers/sku-statistics-fetcher";
import { useSkuStatisticsParams } from "@/modules/sku-analytics/hooks/useSkuStatisticsParams";

export function SkuStatistics() {
  const { konk, dateFrom, dateTo, setKonk, setDateRange } =
    useSkuStatisticsParams();

  const isFiltersReady = Boolean(konk && dateFrom && dateTo);

  return (
    <SidebarInsetLayout headerText="Статистика по виробникам">
      <div className="grid gap-4 p-2">
        <SkuStatisticsControls
          konk={konk}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onKonkChange={setKonk}
          onDateRangeChange={setDateRange}
        />

        {!isFiltersReady && (
          <p className="text-muted-foreground text-sm">
            Оберіть конкурента та період для перегляду статистики за виробниками.
          </p>
        )}

        {isFiltersReady ? (
          <SkuStatisticsFetcher
            konk={konk}
            dateFrom={dateFrom}
            dateTo={dateTo}
          />
        ) : null}
      </div>
    </SidebarInsetLayout>
  );
}
