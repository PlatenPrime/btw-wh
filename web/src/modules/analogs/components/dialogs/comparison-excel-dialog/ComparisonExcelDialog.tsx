import { Dialog } from "@/components/ui/dialog";
import type { AnalogDto } from "@/modules/analogs/api/types";
import { useStartExcelJob } from "@/modules/excel-jobs";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { useCallback, useEffect, useState } from "react";
import { ComparisonExcelDialogView } from "./ComparisonExcelDialogView";

function getDefaultDateRange(): DateRange {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), 1);
  const to = new Date(now);
  return { from, to };
}

interface ComparisonExcelDialogProps {
  analog: AnalogDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ComparisonExcelDialog({
  analog,
  open: controlledOpen,
  onOpenChange,
}: ComparisonExcelDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    getDefaultDateRange,
  );

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const { startJob, isStarting } = useStartExcelJob();

  const handleDownload = useCallback(async () => {
    const from = dateRange?.from;
    const to = dateRange?.to;
    if (!from || !to || from > to) return;
    const dateFrom = format(from, "yyyy-MM-dd");
    const dateTo = format(to, "yyyy-MM-dd");
    try {
      const job = await startJob({
        kind: "analog-comparison",
        params: { analogId: analog._id, dateFrom, dateTo },
        title: "Аналог: порівняння",
      });
      if (job) handleOpenChange(false);
    } catch {
      // toast in provider
    }
  }, [analog._id, dateRange, startJob, handleOpenChange]);

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
      <ComparisonExcelDialogView
        analog={analog}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        isDownloading={isStarting}
        onDownload={handleDownload}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
