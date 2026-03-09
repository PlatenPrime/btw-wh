import { Dialog } from "@/components/ui/dialog";
import type { AnalogDto } from "@/modules/analogs/api/types";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { useCallback, useEffect, useState } from "react";
import { SalesComparisonExcelDialogView } from "./SalesComparisonExcelDialogView";
import { useDownloadAnalogSalesComparisonExcelMutation } from "@/modules/analogs/api/hooks/mutations/useDownloadAnalogSalesComparisonExcelMutation";

function getDefaultDateRange(): DateRange {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), 1);
  const to = new Date(now);
  return { from, to };
}

interface SalesComparisonExcelDialogProps {
  analog: AnalogDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SalesComparisonExcelDialog({
  analog,
  open: controlledOpen,
  onOpenChange,
}: SalesComparisonExcelDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    getDefaultDateRange,
  );

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const mutation = useDownloadAnalogSalesComparisonExcelMutation();
  const isDownloading = mutation.isPending;

  const handleDownload = useCallback(async () => {
    const from = dateRange?.from;
    const to = dateRange?.to;
    if (!from || !to || from > to) return;
    const dateFrom = format(from, "yyyy-MM-dd");
    const dateTo = format(to, "yyyy-MM-dd");
    try {
      await mutation.mutateAsync({
        analogId: analog._id,
        dateFrom,
        dateTo,
      });
      handleOpenChange(false);
    } catch {
      // toast handled in mutation onError
    }
  }, [analog._id, dateRange, mutation, handleOpenChange]);

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
      <SalesComparisonExcelDialogView
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        isDownloading={isDownloading}
        onDownload={handleDownload}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
