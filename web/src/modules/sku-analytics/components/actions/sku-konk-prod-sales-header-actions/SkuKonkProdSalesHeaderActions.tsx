import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { TrendingUp } from "lucide-react";
import { useCallback, useMemo } from "react";

interface SkuKonkProdSalesHeaderActionsProps {
  onExcelDialogOpenChange?: (open: boolean) => void;
}

export function SkuKonkProdSalesHeaderActions({
  onExcelDialogOpenChange,
}: SkuKonkProdSalesHeaderActionsProps) {
  const openExcelDialog = useCallback(() => {
    onExcelDialogOpenChange?.(true);
  }, [onExcelDialogOpenChange]);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "sku-konk-prod-download-sales-excel",
        label: "Скачати продажі",
        icon: TrendingUp,
        iconColor: "green",
        variant: "default",
        onClick: openExcelDialog,
      },
    ],
    [openExcelDialog],
  );

  useRegisterHeaderActions(headerActions);

  return null;
}
