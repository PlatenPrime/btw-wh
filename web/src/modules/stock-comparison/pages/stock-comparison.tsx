import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { KonkBtradeComparisonExcelDialog } from "@/modules/analogs/components/dialogs/konk-btrade-comparison-excel-dialog/KonkBtradeComparisonExcelDialog";
import { useStockComparisonQuery } from "@/modules/stock-comparison/api/hooks/queries/useStockComparisonQuery";
import { StockHeaderActions } from "@/modules/stock-comparison/components/actions/stock-header-actions/StockHeaderActions";
import { StockChartContainer } from "@/modules/stock-comparison/components/containers/stock-chart-container/StockChartContainer";
import { StockChartSkeleton } from "@/modules/stock-comparison/components/containers/stock-chart-container/StockChartSkeleton";
import { StockSummaryView } from "@/modules/stock-comparison/components/containers/stock-summary-container/StockSummaryView";
import { StockControls } from "@/modules/stock-comparison/components/controls/stock-controls/StockControls";
import { useStockParams } from "@/modules/stock-comparison/hooks/useStockParams";
import { isAxiosError } from "axios";
import { useState } from "react";

export function StockComparison() {
  const { konk, prod, dateFrom, dateTo, abc, setKonk, setProd, setDateRange, setAbc } =
    useStockParams();
  const [excelDialogOpen, setExcelDialogOpen] = useState(false);

  const isFiltersReady = Boolean(konk && prod && dateFrom && dateTo);

  const stockQuery = useStockComparisonQuery({
    konk,
    prod,
    dateFrom,
    dateTo,
    abc,
  });

  const days = stockQuery.data?.data?.days ?? [];
  const summary = stockQuery.data?.data?.summary;

  return (
    <SidebarInsetLayout headerText="Залишки">
      <div className="grid gap-4 p-2">
        <StockHeaderActions onExcelDialogOpenChange={setExcelDialogOpen} />
        <StockControls
          konk={konk}
          prod={prod}
          dateFrom={dateFrom}
          dateTo={dateTo}
          abc={abc}
          onKonkChange={setKonk}
          onProdChange={setProd}
          onDateRangeChange={setDateRange}
          onAbcChange={setAbc}
        />

        {!isFiltersReady && (
          <p className="text-muted-foreground text-sm">
            Оберіть конкурента, виробника та період для перегляду порівняння
            залишків.
          </p>
        )}

        {isFiltersReady && stockQuery.isLoading && <StockChartSkeleton />}

        {isFiltersReady &&
          stockQuery.error &&
          isAxiosError(stockQuery.error) &&
          stockQuery.error.response?.status === 404 && (
            <LoadingNoData description="Аналоги для обраної пари конкурент / виробник не знайдено" />
          )}

        {isFiltersReady &&
          stockQuery.error &&
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

        {isFiltersReady && stockQuery.isSuccess && !days.length && (
          <LoadingNoData description="Немає даних про залишки за обраний період" />
        )}

        {isFiltersReady && stockQuery.isSuccess && days.length > 0 && (
          <>
            {summary && <StockSummaryView summary={summary} />}
            <StockChartContainer days={days} />
          </>
        )}
        <KonkBtradeComparisonExcelDialog
          open={excelDialogOpen}
          onOpenChange={setExcelDialogOpen}
        />
      </div>
    </SidebarInsetLayout>
  );
}
