import { Dialog } from "@/components/ui/dialog";
import { RunPostCorrectionsDialogView } from "@/modules/sku-analytics/components/dialogs/run-post-corrections-dialog/RunPostCorrectionsDialogView";
import { useRunPostCorrectionsDialog } from "@/modules/sku-analytics/components/dialogs/run-post-corrections-dialog/useRunPostCorrectionsDialog";
import { differenceInCalendarDays, format, subDays } from "date-fns";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import { POST_CORRECTIONS_MAX_RANGE_DAYS } from "./RunPostCorrectionsDialogView";

function getDefaultDateRange(): DateRange {
  const to = new Date();
  const from = subDays(to, 6);
  return { from, to };
}

interface RunPostCorrectionsDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function RunPostCorrectionsDialog({
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: RunPostCorrectionsDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    getDefaultDateRange,
  );
  const [apply, setApply] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const { isRunning, handleRun } = useRunPostCorrectionsDialog({
    onSuccess,
  });

  useEffect(() => {
    if (open) {
      setDateRange(getDefaultDateRange());
      setApply(false);
    }
  }, [open]);

  const handleRunAndClose = () => {
    const from = dateRange?.from;
    const to = dateRange?.to;
    if (!from || !to || from > to) return;

    const daySpan = differenceInCalendarDays(to, from) + 1;
    if (daySpan > POST_CORRECTIONS_MAX_RANGE_DAYS) return;

    const started = handleRun({
      dateFrom: format(from, "yyyy-MM-dd"),
      dateTo: format(to, "yyyy-MM-dd"),
      apply,
    });
    if (started) {
      handleOpenChange(false);
    }
  };

  const handleCancel = () => {
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <RunPostCorrectionsDialogView
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        apply={apply}
        onApplyChange={setApply}
        isRunning={isRunning}
        onRun={handleRunAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
