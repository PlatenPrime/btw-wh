import { Dialog } from "@/components/ui/dialog";
import { useDownloadKonkSalesExcelMutation } from "@/modules/konks/api/hooks/mutations/useDownloadKonkSalesExcelMutation";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import type { KonkDto } from "@/modules/konks/api/types";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { SKU_KONK_PROD_QUERY_ALL } from "@/modules/sku-konk-prod-charts/constants";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  KonkSalesExcelDialogView,
  type KonkSalesExcelExportSort,
} from "./KonkSalesExcelDialogView";

function getDefaultDateRange(): DateRange {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), 1);
  const to = new Date(now);
  return { from, to };
}

interface KonkSalesExcelDialogProps {
  konk?: KonkDto;
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
  const [selectedKonkName, setSelectedKonkName] = useState("");
  const [selectedSkugrIds, setSelectedSkugrIds] = useState<string[]>([]);
  const [exportSort, setExportSort] =
    useState<KonkSalesExcelExportSort>("default");

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const showKonkSelect = !konk;
  const resolvedKonkName = konk?.name ?? selectedKonkName;

  const mutation = useDownloadKonkSalesExcelMutation();
  const prodsQuery = useProdsQuery();
  const konksQuery = useKonksQuery();
  const prods = (prodsQuery.data?.data ?? []).filter(
    (p) => p.name !== SKU_KONK_PROD_QUERY_ALL,
  );
  const konks = konksQuery.data?.data ?? [];
  const isExporting = mutation.isPending;

  const handleDownload = useCallback(async () => {
    const from = dateRange?.from;
    const to = dateRange?.to;
    if (!from || !to || from > to || !selectedProd || !resolvedKonkName) return;

    const dateFrom = format(from, "yyyy-MM-dd");
    const dateTo = format(to, "yyyy-MM-dd");
    const sortBy =
      exportSort === "sales"
        ? ("sales" as const)
        : exportSort === "revenue"
          ? ("revenue" as const)
          : undefined;
    try {
      await mutation.mutateAsync({
        konk: resolvedKonkName,
        prod: selectedProd,
        dateFrom,
        dateTo,
        ...(sortBy ? { sortBy } : {}),
        ...(selectedSkugrIds.length ? { skugrIds: selectedSkugrIds } : {}),
      });
      handleOpenChange(false);
    } catch {
      // toast handled in mutation onError
    }
  }, [
    dateRange,
    selectedProd,
    selectedSkugrIds,
    exportSort,
    mutation,
    resolvedKonkName,
    handleOpenChange,
  ]);

  const handleCancel = useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  useEffect(() => {
    if (open) {
      setDateRange(getDefaultDateRange());
      setSelectedProd("");
      setSelectedKonkName("");
      setSelectedSkugrIds([]);
      setExportSort("default");
    }
  }, [open]);

  const prevKonkRef = useRef(resolvedKonkName);
  const prevProdRef = useRef(selectedProd);

  useEffect(() => {
    if (prevKonkRef.current !== resolvedKonkName) {
      setSelectedSkugrIds([]);
      prevKonkRef.current = resolvedKonkName;
      prevProdRef.current = selectedProd;
      return;
    }
    const prevProd = prevProdRef.current;
    const isSpecificProd = (value: string) =>
      Boolean(value) && value !== SKU_KONK_PROD_QUERY_ALL;
    if (
      isSpecificProd(prevProd) &&
      isSpecificProd(selectedProd) &&
      prevProd !== selectedProd
    ) {
      setSelectedSkugrIds([]);
    }
    prevProdRef.current = selectedProd;
  }, [resolvedKonkName, selectedProd]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <KonkSalesExcelDialogView
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        showKonkSelect={showKonkSelect}
        selectedKonkName={selectedKonkName}
        onSelectedKonkNameChange={setSelectedKonkName}
        konks={konks}
        resolvedKonkName={resolvedKonkName}
        selectedProd={selectedProd}
        onSelectedProdChange={setSelectedProd}
        prods={prods}
        selectedSkugrIds={selectedSkugrIds}
        onSelectedSkugrIdsChange={setSelectedSkugrIds}
        exportSort={exportSort}
        onExportSortChange={setExportSort}
        isExporting={isExporting}
        onDownload={handleDownload}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
