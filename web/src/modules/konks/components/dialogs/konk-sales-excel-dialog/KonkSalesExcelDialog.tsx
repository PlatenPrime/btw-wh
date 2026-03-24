import { Dialog } from "@/components/ui/dialog";
import { useDownloadKonkSalesExcelMutation } from "@/modules/konks/api/hooks/mutations/useDownloadKonkSalesExcelMutation";
import type { KonkDto } from "@/modules/konks/api/types";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { useCallback, useEffect, useState } from "react";
import { KonkSalesExcelDialogView } from "./KonkSalesExcelDialogView";

function getDefaultDateRange(): DateRange {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), 1);
  const to = new Date(now);
  return { from, to };
}

interface KonkSalesExcelDialogProps {
  konk: KonkDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function KonkSalesExcelDialog({
  konk,
  open: controlledOpen,
  onOpenChange,
}: KonkSalesExcelDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    getDefaultDateRange,
  );
  const [selectedProd, setSelectedProd] = useState("");

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const mutation = useDownloadKonkSalesExcelMutation();
  const prodsQuery = useProdsQuery();
  const prods = prodsQuery.data?.data ?? [];
  const isExporting = mutation.isPending;

  const handleDownload = useCallback(async () => {
    const from = dateRange?.from;
    const to = dateRange?.to;
    if (!from || !to || from > to || !selectedProd) return;

    const dateFrom = format(from, "yyyy-MM-dd");
    const dateTo = format(to, "yyyy-MM-dd");
    try {
      await mutation.mutateAsync({
        konk: konk.name,
        prod: selectedProd,
        dateFrom,
        dateTo,
      });
      handleOpenChange(false);
    } catch {
      // toast handled in mutation onError
    }
  }, [dateRange, selectedProd, mutation, konk.name, handleOpenChange]);

  const handleCancel = useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  useEffect(() => {
    if (open) {
      setDateRange(getDefaultDateRange());
      setSelectedProd("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <KonkSalesExcelDialogView
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        selectedProd={selectedProd}
        onSelectedProdChange={setSelectedProd}
        prods={prods}
        isExporting={isExporting}
        onDownload={handleDownload}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
