import { Dialog } from "@/components/ui/dialog";
import {
  DEFAULT_SKU_SALES_EXCEL_METRICS,
  useStartExcelJob,
  type SkuSalesExcelMetric,
} from "@/modules/excel-jobs";
import type { SkuDto } from "@/modules/skus/api/types";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { useCallback, useEffect, useState } from "react";
import { SkuSalesExcelDialogView } from "./SkuSalesExcelDialogView";

function getDefaultDateRange(): DateRange {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), 1);
  const to = new Date(now);
  return { from, to };
}

interface SkuSalesExcelDialogProps {
  sku: SkuDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SkuSalesExcelDialog({
  sku,
  open: controlledOpen,
  onOpenChange,
}: SkuSalesExcelDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    getDefaultDateRange,
  );
  const [selectedMetrics, setSelectedMetrics] = useState<SkuSalesExcelMetric[]>(
    () => [...DEFAULT_SKU_SALES_EXCEL_METRICS],
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
        kind: "sku-one-sales",
        params: {
          skuId: sku._id,
          dateFrom,
          dateTo,
          metrics: selectedMetrics,
        },
        title: `SKU продажі · ${sku.title || sku._id}`,
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
      setSelectedMetrics([...DEFAULT_SKU_SALES_EXCEL_METRICS]);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <SkuSalesExcelDialogView
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        selectedMetrics={selectedMetrics}
        onSelectedMetricsChange={setSelectedMetrics}
        isExporting={isStarting}
        onDownload={handleDownload}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
