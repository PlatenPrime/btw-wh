import { Dialog } from "@/components/ui/dialog";
import { CorrectBalunBandSpikeDialogView } from "@/modules/skus/components/dialogs/correct-balun-band-spike-dialog/CorrectBalunBandSpikeDialogView";
import { useCorrectBalunBandSpikeDialog } from "@/modules/skus/components/dialogs/correct-balun-band-spike-dialog/useCorrectBalunBandSpikeDialog";
import { differenceInCalendarDays, format, isValid, parseISO } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import { BALUN_BAND_SPIKE_MAX_RANGE_DAYS } from "./CorrectBalunBandSpikeDialogView";

function parseInitialRange(
  dateFrom?: string,
  dateTo?: string,
): DateRange | undefined {
  if (!dateFrom || !dateTo) return undefined;
  const from = parseISO(dateFrom);
  const to = parseISO(dateTo);
  if (!isValid(from) || !isValid(to) || from > to) return undefined;
  return { from, to };
}

interface CorrectBalunBandSpikeDialogProps {
  skuId: string;
  skuTitle: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Prefill from chart period (YYYY-MM-DD). */
  initialDateFrom?: string;
  initialDateTo?: string;
}

export function CorrectBalunBandSpikeDialog({
  skuId,
  skuTitle,
  open: controlledOpen,
  onOpenChange,
  initialDateFrom,
  initialDateTo,
}: CorrectBalunBandSpikeDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() =>
    parseInitialRange(initialDateFrom, initialDateTo),
  );

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const handleApplied = useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  const {
    preview,
    isPreviewing,
    isApplying,
    handlePreview,
    handleApply,
    clearPreview,
  } = useCorrectBalunBandSpikeDialog({
    skuId,
    isOpen: open,
    onApplied: handleApplied,
  });

  useEffect(() => {
    if (open) {
      setDateRange(parseInitialRange(initialDateFrom, initialDateTo));
    }
  }, [open, initialDateFrom, initialDateTo]);

  const resolveDates = (): { dateFrom: string; dateTo: string } | null => {
    const from = dateRange?.from;
    const to = dateRange?.to;
    if (!from || !to || from > to) return null;
    const daySpan = differenceInCalendarDays(to, from) + 1;
    if (daySpan > BALUN_BAND_SPIKE_MAX_RANGE_DAYS) return null;
    return {
      dateFrom: format(from, "yyyy-MM-dd"),
      dateTo: format(to, "yyyy-MM-dd"),
    };
  };

  const onPreview = () => {
    const dates = resolveDates();
    if (!dates) return;
    handlePreview(dates.dateFrom, dates.dateTo);
  };

  const onApply = () => {
    const dates = resolveDates();
    if (!dates) return;
    handleApply(dates.dateFrom, dates.dateTo);
  };

  const handleCancel = () => {
    handleOpenChange(false);
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    clearPreview();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <CorrectBalunBandSpikeDialogView
        skuTitle={skuTitle}
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        preview={preview}
        isPreviewing={isPreviewing}
        isApplying={isApplying}
        onPreview={onPreview}
        onApply={onApply}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
