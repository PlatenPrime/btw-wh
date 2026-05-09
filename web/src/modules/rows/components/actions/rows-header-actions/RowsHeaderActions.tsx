import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RowsHeaderActionsView } from "@/modules/rows/components/actions/rows-header-actions/RowsHeaderActionsView";
import { usePermission } from "@/modules/auth/hooks/usePermission";
import { FileSpreadsheet, Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export function RowsHeaderActions() {
  const { can } = usePermission();
  const canCreateRow = can("create:rows");
  const canExportStocks = can("edit:poses");
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [createRowDialogOpen, setCreateRowDialogOpen] = useState(false);

  const openExportDialog = useCallback(() => {
    setExportDialogOpen(true);
  }, []);

  const openCreateRowDialog = useCallback(() => {
    setCreateRowDialogOpen(true);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(() => {
    const actions: HeaderAction[] = [];
    if (canCreateRow) {
      actions.push({
        id: "create-row",
        label: "Створити ряд",
        icon: Plus,
        variant: "default",
        onClick: openCreateRowDialog,
      });
    }
    if (canExportStocks) {
      actions.push({
        id: "export-poses-stocks",
        label: "Експорт залишків",
        icon: FileSpreadsheet,
        iconColor: "emerald",
        variant: "default",
        onClick: openExportDialog,
      });
    }
    return actions;
  }, [canCreateRow, canExportStocks, openCreateRowDialog, openExportDialog]);

  useRegisterHeaderActions(headerActions);

  return (
    <RowsHeaderActionsView
      showCreateRowDialog={canCreateRow}
      showExportDialog={canExportStocks}
      exportDialogOpen={exportDialogOpen}
      onExportDialogOpenChange={setExportDialogOpen}
      createRowDialogOpen={createRowDialogOpen}
      onCreateRowDialogOpenChange={setCreateRowDialogOpen}
    />
  );
}

