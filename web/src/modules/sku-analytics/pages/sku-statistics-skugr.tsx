import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import { SkuStatisticsSkugrHeaderActions } from "@/modules/sku-analytics/components/actions/sku-statistics-skugr-header-actions";
import { SkuStatisticsSkugrControls } from "@/modules/sku-analytics/components/controls/sku-statistics-skugr-controls";
import { SkuStatisticsSkugrShareExcelDialog } from "@/modules/sku-analytics/components/dialogs/sku-statistics-skugr-share-excel-dialog";
import { SkuStatisticsSkugrFetcher } from "@/modules/sku-analytics/components/fetchers/sku-statistics-skugr-fetcher";
import { useSkuStatisticsSkugrParams } from "@/modules/sku-analytics/hooks/useSkuStatisticsSkugrParams";
import { useState } from "react";

export function SkuStatisticsSkugr() {
  const { skugrId, dateFrom, dateTo, konk, prod, setDateRange } =
    useSkuStatisticsSkugrParams();
  const [excelDialogOpen, setExcelDialogOpen] = useState(false);
  const isFiltersReady = Boolean(skugrId && dateFrom && dateTo);

  return (
    <SidebarInsetLayout headerText="Статистика по товарах">
      <div className="grid gap-4 p-2">
        <SkuStatisticsSkugrHeaderActions
          canExport={isFiltersReady}
          onExcelDialogOpenChange={setExcelDialogOpen}
        />
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

        <SkuStatisticsSkugrShareExcelDialog
          skugrId={skugrId}
          dateFrom={dateFrom}
          dateTo={dateTo}
          open={excelDialogOpen}
          onOpenChange={setExcelDialogOpen}
        />
      </div>
    </SidebarInsetLayout>
  );
}
