import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { TrendingUp } from "lucide-react";
import { useCallback, useMemo } from "react";

interface SalesHeaderActionsProps {
  onExcelDialogOpenChange?: (open: boolean) => void;
}

export function SalesHeaderActions({
  onExcelDialogOpenChange,
}: SalesHeaderActionsProps) {
  const openExcelDialog = useCallback(() => {
    onExcelDialogOpenChange?.(true);
  }, [onExcelDialogOpenChange]);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "export-sales-excel",
        label: "Експорт Excel порівняння продаж",
        icon: TrendingUp,
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
