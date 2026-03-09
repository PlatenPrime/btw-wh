import { Dialog } from "@/components/ui/dialog";
import { useDownloadKonkSalesComparisonExcelMutation } from "@/modules/analogs/api/hooks/mutations/useDownloadKonkSalesComparisonExcelMutation";
import { KonkBtradeSalesComparisonExcelDialogView } from "@/modules/analogs/components/dialogs/konk-btrade-sales-comparison-excel-dialog/KonkBtradeSalesComparisonExcelDialogView";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";

function getDefaultDateRange(): DateRange {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), 1);
  const to = new Date(now);
  return { from, to };
}

interface KonkBtradeSalesComparisonExcelDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function KonkBtradeSalesComparisonExcelDialog({
  open: controlledOpen,
  onOpenChange,
}: KonkBtradeSalesComparisonExcelDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    getDefaultDateRange,
  );
  const [selectedKonk, setSelectedKonk] = useState("");
  const [selectedProd, setSelectedProd] = useState("");

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (nextOpen: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const konksQuery = useKonksQuery();
  const prodsQuery = useProdsQuery();
  const konks = konksQuery.data?.data ?? [];
  const prods = prodsQuery.data?.data ?? [];

  const mutation = useDownloadKonkSalesComparisonExcelMutation();
  const isDownloading = mutation.isPending;

  const handleDownload = useCallback(async () => {
    const from = dateRange?.from;
    const to = dateRange?.to;

    if (!from || !to || from > to) return;
    if (!selectedKonk || !selectedProd) return;

    const dateFrom = format(from, "yyyy-MM-dd");
    const dateTo = format(to, "yyyy-MM-dd");

    try {
      await mutation.mutateAsync({
        konk: selectedKonk,
        prod: selectedProd,
        dateFrom,
        dateTo,
      });
      handleOpenChange(false);
    } catch {
      // toast handled in mutation onError
    }
  }, [
    dateRange,
    mutation,
    selectedKonk,
    selectedProd,
    handleOpenChange,
  ]);

  const handleCancel = useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  useEffect(() => {
    if (open) {
      setDateRange(getDefaultDateRange());
      setSelectedKonk("");
      setSelectedProd("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <KonkBtradeSalesComparisonExcelDialogView
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        konks={konks}
        prods={prods}
        selectedKonk={selectedKonk}
        onSelectedKonkChange={setSelectedKonk}
        selectedProd={selectedProd}
        onSelectedProdChange={setSelectedProd}
        isDownloading={isDownloading}
        onDownload={handleDownload}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
