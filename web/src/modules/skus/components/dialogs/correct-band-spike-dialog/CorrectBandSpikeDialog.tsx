import { Dialog } from "@/components/ui/dialog";
import { CorrectBandSpikeDialogView } from "@/modules/skus/components/dialogs/correct-band-spike-dialog/CorrectBandSpikeDialogView";
import { useCorrectBandSpikeDialog } from "@/modules/skus/components/dialogs/correct-band-spike-dialog/useCorrectBandSpikeDialog";
import { differenceInCalendarDays, format, isValid, parseISO } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import { BAND_SPIKE_MAX_RANGE_DAYS } from "./CorrectBandSpikeDialogView";

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

function toStockInput(value?: number): string {
  if (value === undefined || !Number.isFinite(value)) return "";
  return String(value);
}

function parseNonNegativeNumber(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return parsed;
}

interface CorrectBandSpikeDialogProps {
  skuId: string;
  skuTitle: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Prefill from chart / discovery (YYYY-MM-DD). */
  initialDateFrom?: string;
  initialDateTo?: string;
  initialStockMin?: number;
  initialStockMax?: number;
}

export function CorrectBandSpikeDialog({
  skuId,
  skuTitle,
  open: controlledOpen,
  onOpenChange,
  initialDateFrom,
  initialDateTo,
  initialStockMin,
  initialStockMax,
}: CorrectBandSpikeDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() =>
    parseInitialRange(initialDateFrom, initialDateTo),
  );
  const [stockMin, setStockMin] = useState(() => toStockInput(initialStockMin));
  const [stockMax, setStockMax] = useState(() => toStockInput(initialStockMax));

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
  } = useCorrectBandSpikeDialog({
    skuId,
    isOpen: open,
    onApplied: handleApplied,
  });

  useEffect(() => {
    if (open) {
      setDateRange(parseInitialRange(initialDateFrom, initialDateTo));
      setStockMin(toStockInput(initialStockMin));
      setStockMax(toStockInput(initialStockMax));
    }
  }, [
    open,
    initialDateFrom,
    initialDateTo,
    initialStockMin,
    initialStockMax,
  ]);

  const resolveParams = (): {
    dateFrom: string;
    dateTo: string;
    stockMin: number;
    stockMax: number;
  } | null => {
    const from = dateRange?.from;
    const to = dateRange?.to;
    if (!from || !to || from > to) return null;
    const daySpan = differenceInCalendarDays(to, from) + 1;
    if (daySpan > BAND_SPIKE_MAX_RANGE_DAYS) return null;
    const min = parseNonNegativeNumber(stockMin);
    const max = parseNonNegativeNumber(stockMax);
    if (min === null || max === null || min > max) return null;
    return {
      dateFrom: format(from, "yyyy-MM-dd"),
      dateTo: format(to, "yyyy-MM-dd"),
      stockMin: min,
      stockMax: max,
    };
  };

  const onPreview = () => {
    const params = resolveParams();
    if (!params) return;
    handlePreview(params);
  };

  const onApply = () => {
    const params = resolveParams();
    if (!params) return;
    handleApply(params);
  };

  const handleCancel = () => {
    handleOpenChange(false);
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    clearPreview();
  };

  const handleStockMinChange = (value: string) => {
    setStockMin(value);
    clearPreview();
  };

  const handleStockMaxChange = (value: string) => {
    setStockMax(value);
    clearPreview();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <CorrectBandSpikeDialogView
        skuTitle={skuTitle}
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        stockMin={stockMin}
        stockMax={stockMax}
        onStockMinChange={handleStockMinChange}
        onStockMaxChange={handleStockMaxChange}
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
