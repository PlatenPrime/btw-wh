import { Dialog } from "@/components/ui/dialog";
import { useDownloadSkugrSalesExcelMutation } from "@/modules/skugrs/api/hooks/mutations/useDownloadSkugrSalesExcelMutation";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { useCallback, useEffect, useState } from "react";
import { SkugrSalesExcelDialogView } from "./SkugrSalesExcelDialogView";

function getDefaultDateRange(): DateRange {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), 1);
  const to = new Date(now);
  return { from, to };
}

interface SkugrSalesExcelDialogProps {
  skugrId: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SkugrSalesExcelDialog({
  skugrId,
  open: controlledOpen,
  onOpenChange,
}: SkugrSalesExcelDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    getDefaultDateRange,
  );

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const mutation = useDownloadSkugrSalesExcelMutation();
  const isExporting = mutation.isPending;

  const handleDownload = useCallback(async () => {
    const from = dateRange?.from;
    const to = dateRange?.to;
    if (!from || !to || from > to) return;
    const dateFrom = format(from, "yyyy-MM-dd");
    const dateTo = format(to, "yyyy-MM-dd");
    try {
      await mutation.mutateAsync({
        skugrId,
        dateFrom,
        dateTo,
      });
      handleOpenChange(false);
    } catch {
      // toast handled in mutation onError
    }
  }, [skugrId, dateRange, mutation, handleOpenChange]);

  const handleCancel = useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  useEffect(() => {
    if (open) {
      setDateRange(getDefaultDateRange());
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <SkugrSalesExcelDialogView
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        isExporting={isExporting}
        onDownload={handleDownload}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
