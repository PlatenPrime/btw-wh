import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { Warehouse } from "lucide-react";
import { useCallback, useMemo } from "react";

interface StockHeaderActionsProps {
  onExcelDialogOpenChange?: (open: boolean) => void;
}

export function StockHeaderActions({
  onExcelDialogOpenChange,
}: StockHeaderActionsProps) {
  const openExcelDialog = useCallback(() => {
    onExcelDialogOpenChange?.(true);
  }, [onExcelDialogOpenChange]);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "export-stock-excel",
        label: "Експорт Excel порівняння залишків",
        icon: Warehouse,
        iconColor: "emerald",
        variant: "default",
        onClick: openExcelDialog,
      },
    ],
    [openExcelDialog],
  );

  useRegisterHeaderActions(headerActions);

  return null;
}
