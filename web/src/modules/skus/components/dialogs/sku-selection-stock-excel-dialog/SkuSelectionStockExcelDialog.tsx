import { Dialog } from "@/components/ui/dialog";
import {
  DEFAULT_SKU_STOCK_EXCEL_METRICS,
  useStartExcelJob,
  type SkuStockExcelMetric,
} from "@/modules/excel-jobs";
import {
  buildSkuSelectionJobParams,
  hasSkuSelection,
  skuSelectionTitleCount,
} from "@/modules/excel-jobs/utils/build-sku-selection-params";
import type {
  SkuMultiSelectPick,
  SkuMultiSelectQuery,
} from "@/modules/skus/components/controls/sku-multi-select-control";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { useCallback, useEffect, useState } from "react";
import { SkuSelectionStockExcelDialogView } from "./SkuSelectionStockExcelDialogView";

function getDefaultDateRange(): DateRange {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), 1);
  const to = new Date(now);
  return { from, to };
}

const EMPTY_QUERY: SkuMultiSelectQuery = {
  search: "",
  konkName: "",
  prodName: "",
};

interface SkuSelectionStockExcelDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SkuSelectionStockExcelDialog({
  open: controlledOpen,
  onOpenChange,
}: SkuSelectionStockExcelDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [picks, setPicks] = useState<SkuMultiSelectPick[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectionQuery, setSelectionQuery] =
    useState<SkuMultiSelectQuery>(EMPTY_QUERY);
  const [matchedTotal, setMatchedTotal] = useState(0);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    getDefaultDateRange,
  );
  const [selectedMetrics, setSelectedMetrics] = useState<SkuStockExcelMetric[]>(
    () => [...DEFAULT_SKU_STOCK_EXCEL_METRICS],
  );

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const { startJob, isStarting } = useStartExcelJob();

  const handleDownload = useCallback(async () => {
    const from = dateRange?.from;
    const to = dateRange?.to;
    if (
      !from ||
      !to ||
      from > to ||
      selectedMetrics.length === 0 ||
      !hasSkuSelection({ selectAll, pickCount: picks.length })
    ) {
      return;
    }
    const dateFrom = format(from, "yyyy-MM-dd");
    const dateTo = format(to, "yyyy-MM-dd");
    const countLabel = skuSelectionTitleCount({
      selectAll,
      matchedTotal,
      pickCount: picks.length,
    });
    try {
      const job = await startJob({
        kind: "sku-selection-stock",
        params: buildSkuSelectionJobParams({
          selectAll,
          skuIds: picks.map((pick) => pick.id),
          query: selectionQuery,
          dateFrom,
          dateTo,
          metrics: selectedMetrics,
        }),
        title: `SKU (обрані) залишки · ${countLabel}`,
      });
      if (job) handleOpenChange(false);
    } catch {
      // toast in provider
    }
  }, [
    dateRange,
    selectedMetrics,
    picks,
    selectAll,
    selectionQuery,
    matchedTotal,
    startJob,
    handleOpenChange,
  ]);

  const handleCancel = useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  useEffect(() => {
    if (!open) return;
    setPicks([]);
    setSelectAll(false);
    setSelectionQuery(EMPTY_QUERY);
    setMatchedTotal(0);
    setDateRange(getDefaultDateRange());
    setSelectedMetrics([...DEFAULT_SKU_STOCK_EXCEL_METRICS]);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <SkuSelectionStockExcelDialogView
        picks={picks}
        onPicksChange={setPicks}
        selectAll={selectAll}
        onSelectAllChange={setSelectAll}
        onSelectionQueryChange={setSelectionQuery}
        onMatchedTotalChange={setMatchedTotal}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        selectedMetrics={selectedMetrics}
        onSelectedMetricsChange={setSelectedMetrics}
        isDownloading={isStarting}
        onDownload={() => {
          void handleDownload();
        }}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
