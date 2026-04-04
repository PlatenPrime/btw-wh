import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { Download } from "lucide-react";
import { useCallback, useMemo } from "react";

interface SkuKonkProdStockHeaderActionsProps {
  onExcelDialogOpenChange?: (open: boolean) => void;
}

export function SkuKonkProdStockHeaderActions({
  onExcelDialogOpenChange,
}: SkuKonkProdStockHeaderActionsProps) {
  const openExcelDialog = useCallback(() => {
    onExcelDialogOpenChange?.(true);
  }, [onExcelDialogOpenChange]);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "sku-konk-prod-download-slice-excel",
        label: "Скачати залишки",
        icon: Download,
        iconColor: "blue",
        variant: "default",
        onClick: openExcelDialog,
      },
    ],
    [openExcelDialog],
  );

  useRegisterHeaderActions(headerActions);

  return null;
}
