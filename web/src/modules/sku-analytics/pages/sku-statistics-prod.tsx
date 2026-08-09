import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import { SkuStatisticsProdControls } from "@/modules/sku-analytics/components/controls/sku-statistics-prod-controls";
import { SkuStatisticsProdFetcher } from "@/modules/sku-analytics/components/fetchers/sku-statistics-prod-fetcher";
import { useSkuStatisticsProdParams } from "@/modules/sku-analytics/hooks/useSkuStatisticsProdParams";

export function SkuStatisticsProd() {
  const {
    konk,
    prod,
    dateFrom,
    dateTo,
    setKonk,
    setProd,
    setDateRange,
  } = useSkuStatisticsProdParams();
  const isFiltersReady = Boolean(konk && prod && dateFrom && dateTo);

  return (
    <SidebarInsetLayout headerText="Статистика по товарних групах">
      <div className="grid gap-4 p-2">
        <SkuStatisticsProdControls
          konk={konk}
          prod={prod}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onKonkChange={setKonk}
          onProdChange={setProd}
          onDateRangeChange={setDateRange}
        />

        {!isFiltersReady ? (
          <p className="text-muted-foreground text-sm">
            Оберіть конкурента, виробника та період для перегляду статистики за
            товарними групами.
          </p>
        ) : null}

        {isFiltersReady ? (
          <SkuStatisticsProdFetcher
            konk={konk}
            prod={prod}
            dateFrom={dateFrom}
            dateTo={dateTo}
          />
        ) : null}
      </div>
    </SidebarInsetLayout>
  );
}
