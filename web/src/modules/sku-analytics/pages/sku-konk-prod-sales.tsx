import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { KonkSalesExcelDialog } from "@/modules/konks/components/dialogs/konk-sales-excel-dialog/KonkSalesExcelDialog";
import { useSkuKonkProdSalesChartQuery } from "@/modules/sku-analytics/api/hooks/queries/useSkuKonkProdSalesChartQuery";
import { SkuKonkProdSalesHeaderActions } from "@/modules/sku-analytics/components/actions/sku-konk-prod-sales-header-actions/SkuKonkProdSalesHeaderActions";
import { SkuKonkProdChartControls } from "@/modules/sku-analytics/components/controls/sku-konk-prod-chart-controls/SkuKonkProdChartControls";
import { SkuKonkProdSkugrGroupsSection } from "@/modules/sku-analytics/components/containers/sku-konk-prod-skugr-groups-section/SkuKonkProdSkugrGroupsSection";
import { useSkuKonkProdChartParams } from "@/modules/sku-analytics/hooks/useSkuKonkProdChartParams";
import { SalesChartContainer } from "@/modules/sales/components/containers/sales-chart-container/SalesChartContainer";
import { SalesChartSkeleton } from "@/modules/sales/components/containers/sales-chart-container/SalesChartSkeleton";
import { SalesSummaryView } from "@/modules/sales/components/containers/sales-summary-container/SalesSummaryView";
import { isAxiosError } from "axios";
import { useState } from "react";

export function SkuKonkProdSales() {
  const {
    konk,
    prod,
    dateFrom,
    dateTo,
    skugrIds,
    setKonk,
    setProd,
    setDateRange,
    setSkugrIds,
  } = useSkuKonkProdChartParams();
  const [excelDialogOpen, setExcelDialogOpen] = useState(false);

  const isFiltersReady = Boolean(konk && prod && dateFrom && dateTo);

  const salesQuery = useSkuKonkProdSalesChartQuery({
    konk,
    prod,
    dateFrom,
    dateTo,
    skugrIds,
  });

  const days = salesQuery.data?.data?.days ?? [];
  const summary = salesQuery.data?.data?.summary;

  return (
    <SidebarInsetLayout headerText="Продажі конкурентів">
      <div className="grid gap-4 p-2">
        <SkuKonkProdSalesHeaderActions
          onExcelDialogOpenChange={setExcelDialogOpen}
        />
        <SkuKonkProdChartControls
          konk={konk}
          prod={prod}
          dateFrom={dateFrom}
          dateTo={dateTo}
          skugrIds={skugrIds}
          onKonkChange={setKonk}
          onProdChange={setProd}
          onDateRangeChange={setDateRange}
          onSkugrIdsChange={setSkugrIds}
        />

        {!isFiltersReady && (
          <p className="text-muted-foreground text-sm">
            Оберіть конкурента, виробника та період для перегляду порівняння
            продаж.
          </p>
        )}

        {isFiltersReady && salesQuery.isLoading && !salesQuery.data && (
          <SalesChartSkeleton />
        )}

        {isFiltersReady &&
          salesQuery.isError &&
          !salesQuery.data &&
          isAxiosError(salesQuery.error) &&
          salesQuery.error.response?.status === 404 && (
            <LoadingNoData description="Немає SKU з productId для обраної пари конкурент / виробник" />
          )}

        {isFiltersReady &&
          salesQuery.isError &&
          !salesQuery.data &&
          !(
            isAxiosError(salesQuery.error) &&
            salesQuery.error.response?.status === 404
          ) && (
            <ErrorDisplay
              error={salesQuery.error}
              title="Помилка завантаження даних продаж"
              description="Не вдалося завантажити дані для порівняння продаж"
              onRetry={() => void salesQuery.refetch()}
              variant="compact"
            />
          )}

        {isFiltersReady &&
          salesQuery.data &&
          salesQuery.isSuccess &&
          !days.length && (
            <LoadingNoData description="Немає даних про продажі за обраний період" />
          )}

        {isFiltersReady && salesQuery.data && days.length > 0 && (
          <div className="grid gap-4">
            <DataRefetchOverlay
              isFetching={salesQuery.isFetching}
              isLoading={salesQuery.isLoading}
              busyLabel="Оновлення графіка…"
            >
              <div className="grid gap-4">
                {summary && <SalesSummaryView summary={summary} />}
                <SalesChartContainer days={days} />
              </div>
            </DataRefetchOverlay>
            <SkuKonkProdSkugrGroupsSection
              konk={konk}
              prod={prod}
              dateFrom={dateFrom}
              dateTo={dateTo}
              hasActiveSkugrFilter={skugrIds.length > 0}
            />
          </div>
        )}
        <KonkSalesExcelDialog
          open={excelDialogOpen}
          onOpenChange={setExcelDialogOpen}
        />
      </div>
    </SidebarInsetLayout>
  );
}
