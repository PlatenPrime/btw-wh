import { Dialog } from "@/components/ui/dialog";
import {
  DEFAULT_SKU_STOCK_EXCEL_METRICS,
  useStartExcelJob,
  type SkuStockExcelMetric,
} from "@/modules/excel-jobs";
import type { SkuMultiSelectPick } from "@/modules/skus/components/controls/sku-multi-select-control";
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
      picks.length === 0
    ) {
      return;
    }
    const dateFrom = format(from, "yyyy-MM-dd");
    const dateTo = format(to, "yyyy-MM-dd");
    try {
      const job = await startJob({
        kind: "sku-selection-stock",
        params: {
          skuIds: picks.map((pick) => pick.id),
          dateFrom,
          dateTo,
          metrics: selectedMetrics,
        },
        title: `SKU (обрані) залишки · ${picks.length}`,
      });
      if (job) handleOpenChange(false);
    } catch {
      // toast in provider
    }
  }, [dateRange, selectedMetrics, picks, startJob, handleOpenChange]);

  const handleCancel = useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  useEffect(() => {
    if (open) {
      setPicks([]);
      setDateRange(getDefaultDateRange());
      setSelectedMetrics([...DEFAULT_SKU_STOCK_EXCEL_METRICS]);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <SkuSelectionStockExcelDialogView
        picks={picks}
        onPicksChange={setPicks}
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
