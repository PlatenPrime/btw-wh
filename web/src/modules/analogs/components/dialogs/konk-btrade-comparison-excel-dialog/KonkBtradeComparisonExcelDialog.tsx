import { Dialog } from "@/components/ui/dialog";
import { useDownloadKonkBtradeComparisonExcelMutation } from "@/modules/analogs/api/hooks/mutations/useDownloadKonkBtradeComparisonExcelMutation";
import { KonkBtradeComparisonExcelDialogView } from "@/modules/analogs/components/dialogs/konk-btrade-comparison-excel-dialog/KonkBtradeComparisonExcelDialogView";
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

interface KonkBtradeComparisonExcelDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function KonkBtradeComparisonExcelDialog({
  open: controlledOpen,
  onOpenChange,
}: KonkBtradeComparisonExcelDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    getDefaultDateRange,
  );
  const [selectedKonk, setSelectedKonk] = useState("");
  const [selectedProd, setSelectedProd] = useState("");
  const [selectedAbc, setSelectedAbc] = useState("");
  const [sortByAbc, setSortByAbc] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (nextOpen: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const konksQuery = useKonksQuery();
  const prodsQuery = useProdsQuery();
  const konks = konksQuery.data?.data ?? [];
  const prods = prodsQuery.data?.data ?? [];

  const mutation = useDownloadKonkBtradeComparisonExcelMutation();
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
        ...(selectedAbc && { abc: selectedAbc }),
        ...(sortByAbc && { sortBy: "abc" as const }),
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
    selectedAbc,
    sortByAbc,
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
      setSelectedAbc("");
      setSortByAbc(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <KonkBtradeComparisonExcelDialogView
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        konks={konks}
        prods={prods}
        selectedKonk={selectedKonk}
        onSelectedKonkChange={setSelectedKonk}
        selectedProd={selectedProd}
        onSelectedProdChange={setSelectedProd}
        selectedAbc={selectedAbc}
        onSelectedAbcChange={setSelectedAbc}
        sortByAbc={sortByAbc}
        onSortByAbcChange={setSortByAbc}
        isDownloading={isDownloading}
        onDownload={handleDownload}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}

