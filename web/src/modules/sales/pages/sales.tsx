import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import { KonkBtradeSalesComparisonExcelDialog } from "@/modules/analogs/components/dialogs/konk-btrade-sales-comparison-excel-dialog/KonkBtradeSalesComparisonExcelDialog";
import { SalesHeaderActions } from "@/modules/sales/components/actions/sales-header-actions/SalesHeaderActions";
import { SalesControls } from "@/modules/sales/components/controls/sales-controls/SalesControls";
import { SalesFetcher } from "@/modules/sales/components/fetchers/sales-fetcher";
import { useSalesParams } from "@/modules/sales/hooks/useSalesParams";
import { useState } from "react";

export function Sales() {
  const { konk, prod, dateFrom, dateTo, abc, setKonk, setProd, setDateRange, setAbc } =
    useSalesParams();
  const [excelDialogOpen, setExcelDialogOpen] = useState(false);

  const isFiltersReady = Boolean(konk && prod && dateFrom && dateTo);

  return (
    <SidebarInsetLayout headerText="Продажі">
      <div className="grid gap-4 p-2">
        <SalesHeaderActions onExcelDialogOpenChange={setExcelDialogOpen} />
        <SalesControls
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
            продаж.
          </p>
        )}

        {isFiltersReady ? (
          <SalesFetcher
            params={{ konk, prod, dateFrom, dateTo, abc }}
          />
        ) : null}

        <KonkBtradeSalesComparisonExcelDialog
          open={excelDialogOpen}
          onOpenChange={setExcelDialogOpen}
        />
      </div>
    </SidebarInsetLayout>
  );
}
