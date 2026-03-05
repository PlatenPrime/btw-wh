import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { FileSpreadsheet, Plus } from "lucide-react";
import { useCallback, useMemo } from "react";

interface AnalogsHeaderActionsProps {
  onCreateDialogOpenChange?: (open: boolean) => void;
  onGroupExcelDialogOpenChange?: (open: boolean) => void;
}

export function AnalogsHeaderActions({
  onCreateDialogOpenChange,
  onGroupExcelDialogOpenChange,
}: AnalogsHeaderActionsProps) {
  const openCreateDialog = useCallback(() => {
    onCreateDialogOpenChange?.(true);
  }, [onCreateDialogOpenChange]);

  const openGroupExcelDialog = useCallback(() => {
    onGroupExcelDialogOpenChange?.(true);
  }, [onGroupExcelDialogOpenChange]);

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
    ],
    [openCreateDialog, openGroupExcelDialog],
  );

  useRegisterHeaderActions(headerActions);

  return null;
}
