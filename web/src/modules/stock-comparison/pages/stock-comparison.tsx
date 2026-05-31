import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { KonkBtradeComparisonExcelDialog } from "@/modules/analogs/components/dialogs/konk-btrade-comparison-excel-dialog/KonkBtradeComparisonExcelDialog";
import { StockHeaderActions } from "@/modules/stock-comparison/components/actions/stock-header-actions/StockHeaderActions";
import { StockControls } from "@/modules/stock-comparison/components/controls/stock-controls/StockControls";
import { StockComparisonFetcher } from "@/modules/stock-comparison/components/fetchers/stock-comparison-fetcher";
import { useStockParams } from "@/modules/stock-comparison/hooks/useStockParams";
import { useState } from "react";

export function StockComparison() {
  const { konk, prod, dateFrom, dateTo, abc, setKonk, setProd, setDateRange, setAbc } =
    useStockParams();
  const [excelDialogOpen, setExcelDialogOpen] = useState(false);

  const isFiltersReady = Boolean(konk && prod && dateFrom && dateTo);

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

        {isFiltersReady ? (
          <StockComparisonFetcher
            params={{ konk, prod, dateFrom, dateTo, abc }}
          />
        ) : null}

        <KonkBtradeComparisonExcelDialog
          open={excelDialogOpen}
          onOpenChange={setExcelDialogOpen}
        />
      </div>
    </SidebarInsetLayout>
  );
}
