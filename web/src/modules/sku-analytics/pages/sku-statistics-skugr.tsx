import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import { SkuStatisticsSkugrControls } from "@/modules/sku-analytics/components/controls/sku-statistics-skugr-controls";
import { SkuStatisticsSkugrFetcher } from "@/modules/sku-analytics/components/fetchers/sku-statistics-skugr-fetcher";
import { useSkuStatisticsSkugrParams } from "@/modules/sku-analytics/hooks/useSkuStatisticsSkugrParams";

export function SkuStatisticsSkugr() {
  const { skugrId, dateFrom, dateTo, konk, prod, setDateRange } =
    useSkuStatisticsSkugrParams();
  const isFiltersReady = Boolean(skugrId && dateFrom && dateTo);

  return (
    <SidebarInsetLayout headerText="Статистика по товарах">
      <div className="grid gap-4 p-2">
        <SkuStatisticsSkugrControls
          dateFrom={dateFrom}
          dateTo={dateTo}
          onDateRangeChange={setDateRange}
          konk={konk || undefined}
          prod={prod || undefined}
        />

        {!isFiltersReady ? (
          <p className="text-muted-foreground text-sm">
            Відкрийте цю сторінку з рядка товарної групи та оберіть період
            (потрібні skugrId, dateFrom, dateTo).
          </p>
        ) : null}

        {isFiltersReady ? (
          <SkuStatisticsSkugrFetcher
            skugrId={skugrId}
            dateFrom={dateFrom}
            dateTo={dateTo}
            konk={konk || undefined}
            prod={prod || undefined}
          />
        ) : null}
      </div>
    </SidebarInsetLayout>
  );
}
