import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { ZonesHeaderActionsView } from "@/modules/zones/components/actions/zones-header-actions/ZonesHeaderActionsView";
import { handleExportZones } from "@/modules/zones/utils/handle-export-zones/handleExportZones";
import { Download, FileSpreadsheet, Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

export function ZonesHeaderActions() {
  const navigate = useNavigate();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const openCreateDialog = useCallback(() => {
    setCreateDialogOpen(true);
  }, []);

  const handleExport = useCallback(() => {
    handleExportZones();
  }, []);

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

