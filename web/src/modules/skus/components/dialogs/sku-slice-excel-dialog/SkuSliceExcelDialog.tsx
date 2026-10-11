import { Dialog } from "@/components/ui/dialog";
import {
  DEFAULT_SKU_STOCK_EXCEL_METRICS,
  useStartExcelJob,
  type SkuStockExcelMetric,
} from "@/modules/excel-jobs";
import type { SkuDto } from "@/modules/skus/api/types";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { useCallback, useEffect, useState } from "react";
import { SkuSliceExcelDialogView } from "./SkuSliceExcelDialogView";

function getDefaultDateRange(): DateRange {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), 1);
  const to = new Date(now);
  return { from, to };
}

interface SkuSliceExcelDialogProps {
  sku: SkuDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SkuSliceExcelDialog({
  sku,
  open: controlledOpen,
  onOpenChange,
}: SkuSliceExcelDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
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
    if (!from || !to || from > to || selectedMetrics.length === 0) return;
    const dateFrom = format(from, "yyyy-MM-dd");
    const dateTo = format(to, "yyyy-MM-dd");
    try {
      const job = await startJob({
        kind: "sku-one-stock",
        params: {
          skuId: sku._id,
          dateFrom,
          dateTo,
          metrics: selectedMetrics,
        },
        title: `SKU залишки · ${sku.title || sku._id}`,
      });
      if (job) handleOpenChange(false);
    } catch {
      // toast in provider
    }
  }, [
    sku._id,
    sku.title,
    dateRange,
    selectedMetrics,
    startJob,
    handleOpenChange,
  ]);

  const handleCancel = useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  useEffect(() => {
    if (open) {
      setDateRange(getDefaultDateRange());
      setSelectedMetrics([...DEFAULT_SKU_STOCK_EXCEL_METRICS]);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <SkuSliceExcelDialogView
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        selectedMetrics={selectedMetrics}
        onSelectedMetricsChange={setSelectedMetrics}
        isDownloading={isStarting}
        onDownload={handleDownload}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
