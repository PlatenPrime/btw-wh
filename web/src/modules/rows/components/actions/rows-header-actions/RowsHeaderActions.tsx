import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RowsHeaderActionsView } from "@/modules/rows/components/actions/rows-header-actions/RowsHeaderActionsView";
import { FileSpreadsheet, Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export function RowsHeaderActions() {
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [createRowDialogOpen, setCreateRowDialogOpen] = useState(false);

  const openExportDialog = useCallback(() => {
    setExportDialogOpen(true);
  }, []);

  const openCreateRowDialog = useCallback(() => {
    setCreateRowDialogOpen(true);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "create-row",
        label: "Створити ряд",
        icon: Plus,
        variant: "default",
        onClick: openCreateRowDialog,
      },
      {
        id: "export-poses-stocks",
        label: "Експорт залишків",
        icon: FileSpreadsheet,
        iconColor: "emerald",
        variant: "default",
        onClick: openExportDialog,
      },
    ],
    [openCreateRowDialog, openExportDialog],
  );

  useRegisterHeaderActions(headerActions);

  return (
    <RowsHeaderActionsView
      exportDialogOpen={exportDialogOpen}
      onExportDialogOpenChange={setExportDialogOpen}
      createRowDialogOpen={createRowDialogOpen}
      onCreateRowDialogOpenChange={setCreateRowDialogOpen}
    />
  );
}

