import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { KonkBtradeSalesComparisonExcelDialog } from "@/modules/analogs/components/dialogs/konk-btrade-sales-comparison-excel-dialog/KonkBtradeSalesComparisonExcelDialog";
import { useSalesComparisonQuery } from "@/modules/sales/api/hooks/queries/useSalesComparisonQuery";
import { SalesHeaderActions } from "@/modules/sales/components/actions/sales-header-actions/SalesHeaderActions";
import { SalesChartContainer } from "@/modules/sales/components/containers/sales-chart-container/SalesChartContainer";
import { SalesChartSkeleton } from "@/modules/sales/components/containers/sales-chart-container/SalesChartSkeleton";
import { SalesSummaryView } from "@/modules/sales/components/containers/sales-summary-container/SalesSummaryView";
import { SalesControls } from "@/modules/sales/components/controls/sales-controls/SalesControls";
import { useSalesParams } from "@/modules/sales/hooks/useSalesParams";
import { isAxiosError } from "axios";
import { useState } from "react";

export function Sales() {
  const { konk, prod, dateFrom, dateTo, setKonk, setProd, setDateRange } =
    useSalesParams();
  const [excelDialogOpen, setExcelDialogOpen] = useState(false);

  const isFiltersReady = Boolean(konk && prod && dateFrom && dateTo);

  const salesQuery = useSalesComparisonQuery({
    konk,
    prod,
    dateFrom,
    dateTo,
  });

  const days = salesQuery.data?.data?.days ?? [];
  const summary = salesQuery.data?.data?.summary;

  return (
    <SidebarInsetLayout headerText="Продажі">
      <div className="grid gap-4 p-2">
        <SalesHeaderActions onExcelDialogOpenChange={setExcelDialogOpen} />
        <SalesControls
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
            продаж.
          </p>
        )}

        {isFiltersReady && salesQuery.isLoading && <SalesChartSkeleton />}

        {isFiltersReady &&
          salesQuery.error &&
          isAxiosError(salesQuery.error) &&
          salesQuery.error.response?.status === 404 && (
            <LoadingNoData description="Аналоги для обраної пари конкурент / виробник не знайдено" />
          )}

        {isFiltersReady &&
          salesQuery.error &&
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

        {isFiltersReady && salesQuery.isSuccess && !days.length && (
          <LoadingNoData description="Немає даних про продажі за обраний період" />
        )}

        {isFiltersReady && salesQuery.isSuccess && days.length > 0 && (
          <>
            {summary && <SalesSummaryView summary={summary} />}
            <SalesChartContainer days={days} />
          </>
        )}
        <KonkBtradeSalesComparisonExcelDialog
          open={excelDialogOpen}
          onOpenChange={setExcelDialogOpen}
        />
      </div>
    </SidebarInsetLayout>
  );
}
