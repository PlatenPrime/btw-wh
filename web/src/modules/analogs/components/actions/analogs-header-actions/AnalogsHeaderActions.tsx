import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { FileSpreadsheet, Plus, TrendingUp } from "lucide-react";
import { useCallback, useMemo } from "react";

interface AnalogsHeaderActionsProps {
  onCreateDialogOpenChange?: (open: boolean) => void;
  onGroupExcelDialogOpenChange?: (open: boolean) => void;
  onGroupSalesExcelDialogOpenChange?: (open: boolean) => void;
}

export function AnalogsHeaderActions({
  onCreateDialogOpenChange,
  onGroupExcelDialogOpenChange,
  onGroupSalesExcelDialogOpenChange,
}: AnalogsHeaderActionsProps) {
  const openCreateDialog = useCallback(() => {
    onCreateDialogOpenChange?.(true);
  }, [onCreateDialogOpenChange]);

  const openGroupExcelDialog = useCallback(() => {
    onGroupExcelDialogOpenChange?.(true);
  }, [onGroupExcelDialogOpenChange]);

  const openGroupSalesExcelDialog = useCallback(() => {
    onGroupSalesExcelDialogOpenChange?.(true);
  }, [onGroupSalesExcelDialogOpenChange]);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "create-analog",
        label: "Створити аналог",
        icon: Plus,
        iconColor: "emerald",
        variant: "default",
        onClick: openCreateDialog,
      },
      {
        id: "export-konk-btrade-excel",
        label: "Експорт Excel конкурента/Btrade",
        icon: FileSpreadsheet,
        iconColor: "emerald",
        variant: "default",
        onClick: openGroupExcelDialog,
      },
      {
        id: "export-konk-btrade-sales-excel",
        label: "Експорт Excel порівняння продаж",
        icon: TrendingUp,
        iconColor: "emerald",
        variant: "default",
        onClick: openGroupSalesExcelDialog,
      },
    ],
    [openCreateDialog, openGroupExcelDialog, openGroupSalesExcelDialog],
  );

  useRegisterHeaderActions(headerActions);

  return null;
}
