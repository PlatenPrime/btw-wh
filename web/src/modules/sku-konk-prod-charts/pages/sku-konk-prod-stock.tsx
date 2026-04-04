import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { DataRefetchOverlay } from "@/components/shared/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { KonkSliceExcelDialog } from "@/modules/konks/components/dialogs/konk-slice-excel-dialog/KonkSliceExcelDialog";
import { SkuKonkProdStockHeaderActions } from "@/modules/sku-konk-prod-charts/components/actions/sku-konk-prod-stock-header-actions/SkuKonkProdStockHeaderActions";
import { SkuKonkProdChartControls } from "@/modules/sku-konk-prod-charts/components/controls/sku-konk-prod-chart-controls/SkuKonkProdChartControls";
import { useSkuKonkProdChartParams } from "@/modules/sku-konk-prod-charts/hooks/useSkuKonkProdChartParams";
import { useSkuKonkProdStockChartQuery } from "@/modules/sku-slices/api/hooks/queries/useSkuKonkProdStockChartQuery";
import { StockChartContainer } from "@/modules/stock-comparison/components/containers/stock-chart-container/StockChartContainer";
import { StockChartSkeleton } from "@/modules/stock-comparison/components/containers/stock-chart-container/StockChartSkeleton";
import { StockSummaryView } from "@/modules/stock-comparison/components/containers/stock-summary-container/StockSummaryView";
import { isAxiosError } from "axios";
import { useState } from "react";

export function SkuKonkProdStock() {
  const { konk, prod, dateFrom, dateTo, setKonk, setProd, setDateRange } =
    useSkuKonkProdChartParams();
  const [excelDialogOpen, setExcelDialogOpen] = useState(false);

  const isFiltersReady = Boolean(konk && prod && dateFrom && dateTo);

  const stockQuery = useSkuKonkProdStockChartQuery({
    konk,
    prod,
    dateFrom,
    dateTo,
  });

  const days = stockQuery.data?.data?.days ?? [];
  const summary = stockQuery.data?.data?.summary;

  return (
    <SidebarInsetLayout headerText="Залишки конкурентів">
      <div className="grid gap-4 p-2">
        <SkuKonkProdStockHeaderActions
          onExcelDialogOpenChange={setExcelDialogOpen}
        />
        <SkuKonkProdChartControls
          konk={konk}
          prod={prod}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onKonkChange={setKonk}
          onProdChange={setProd}
          onDateRangeChange={setDateRange}
        />

        {!isFiltersReady && (
          <p className="text-muted-foreground text-sm">
            Оберіть конкурента, виробника та період для перегляду порівняння
            залишків.
          </p>
        )}

        {isFiltersReady && stockQuery.isLoading && !stockQuery.data && (
          <StockChartSkeleton />
        )}

        {isFiltersReady &&
          stockQuery.isError &&
          !stockQuery.data &&
          isAxiosError(stockQuery.error) &&
          stockQuery.error.response?.status === 404 && (
            <LoadingNoData description="Немає SKU з productId для обраної пари конкурент / виробник" />
          )}

        {isFiltersReady &&
          stockQuery.isError &&
          !stockQuery.data &&
          !(
            isAxiosError(stockQuery.error) &&
            stockQuery.error.response?.status === 404
          ) && (
            <ErrorDisplay
              error={stockQuery.error}
              title="Помилка завантаження даних залишків"
              description="Не вдалося завантажити дані для порівняння залишків"
              onRetry={() => void stockQuery.refetch()}
              variant="compact"
            />
          )}

        {isFiltersReady &&
          stockQuery.data &&
          stockQuery.isSuccess &&
          !days.length && (
            <LoadingNoData description="Немає даних про залишки за обраний період" />
          )}

        {isFiltersReady && stockQuery.data && days.length > 0 && (
          <DataRefetchOverlay
            isFetching={stockQuery.isFetching}
            isLoading={stockQuery.isLoading}
          >
            <div className="grid gap-4">
              {summary && <StockSummaryView summary={summary} />}
              <StockChartContainer days={days} />
            </div>
          </DataRefetchOverlay>
        )}
        <KonkSliceExcelDialog
          open={excelDialogOpen}
          onOpenChange={setExcelDialogOpen}
        />
      </div>
    </SidebarInsetLayout>
  );
}
