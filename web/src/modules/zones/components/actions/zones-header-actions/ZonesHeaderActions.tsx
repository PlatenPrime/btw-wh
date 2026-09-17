import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { useStartExcelJob } from "@/modules/excel-jobs";
import { ZonesHeaderActionsView } from "@/modules/zones/components/actions/zones-header-actions/ZonesHeaderActionsView";
import { Download, FileSpreadsheet, Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

export function ZonesHeaderActions() {
  const navigate = useNavigate();
  const { startJob, isStarting } = useStartExcelJob();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const openCreateDialog = useCallback(() => {
    setCreateDialogOpen(true);
  }, []);

  const handleExport = useCallback(() => {
    if (isStarting) return;
    void startJob({ kind: "zones-export", title: "Експорт зон" });
  }, [isStarting, startJob]);

  const handleImport = useCallback(() => {
    navigate("/wh/zones-import-export");
  }, [navigate]);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "create-zone",
        label: "Створити зону",
        icon: Plus,
        iconColor: "emerald",
        variant: "default",
        onClick: openCreateDialog,
      },
      {
        id: "export-zones",
        label: "Експорт зон",
        icon: Download,
        iconColor: "blue",
        variant: "default",
        onClick: handleExport,
      },
      {
        id: "import-zones",
        label: "Імпорт зон",
        icon: FileSpreadsheet,
        iconColor: "emerald",
        variant: "default",
        onClick: handleImport,
      },
    ],
    [handleExport, handleImport, openCreateDialog],
  );

  useRegisterHeaderActions(headerActions);

  return (
    <ZonesHeaderActionsView
      createDialogOpen={createDialogOpen}
      onCreateDialogOpenChange={setCreateDialogOpen}
    />
  );
}
