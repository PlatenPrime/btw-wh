import { Dialog } from "@/components/ui/dialog";
import type { SkuDto } from "@/modules/skus/api/types";
import { useDownloadSkuSliceExcelMutation } from "@/modules/skus/api/hooks/mutations/useDownloadSkuSliceExcelMutation";
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

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const mutation = useDownloadSkuSliceExcelMutation();
  const isDownloading = mutation.isPending;

  const handleDownload = useCallback(async () => {
    const from = dateRange?.from;
    const to = dateRange?.to;
    if (!from || !to || from > to) return;
    const dateFrom = format(from, "yyyy-MM-dd");
    const dateTo = format(to, "yyyy-MM-dd");
    try {
      await mutation.mutateAsync({
        skuId: sku._id,
        dateFrom,
        dateTo,
      });
      handleOpenChange(false);
    } catch {
      // toast handled in mutation onError
    }
  }, [sku._id, dateRange, mutation, handleOpenChange]);

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
      <SkuSliceExcelDialogView
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        isDownloading={isDownloading}
        onDownload={handleDownload}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
