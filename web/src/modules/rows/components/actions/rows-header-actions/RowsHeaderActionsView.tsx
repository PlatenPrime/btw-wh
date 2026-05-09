import { CreateRowDialog } from "@/modules/rows/components/dialogs/create-row-dialog/CreateRowDialog";
import { ExportPosesStocksDialog } from "@/modules/poses/components/dialogs/export-poses-stocks-dialog";

interface RowsHeaderActionsViewProps {
  showCreateRowDialog?: boolean;
  showExportDialog?: boolean;
  exportDialogOpen: boolean;
  onExportDialogOpenChange: (open: boolean) => void;
  createRowDialogOpen: boolean;
  onCreateRowDialogOpenChange: (open: boolean) => void;
}

export function RowsHeaderActionsView({
  showCreateRowDialog = true,
  showExportDialog = true,
  exportDialogOpen,
  onExportDialogOpenChange,
  createRowDialogOpen,
  onCreateRowDialogOpenChange,
}: RowsHeaderActionsViewProps) {
  return (
    <>
      {showCreateRowDialog ? (
        <CreateRowDialog
          open={createRowDialogOpen}
          onOpenChange={onCreateRowDialogOpenChange}
        />
      ) : null}
      {showExportDialog ? (
        <ExportPosesStocksDialog
          open={exportDialogOpen}
          onOpenChange={onExportDialogOpenChange}
        />
      ) : null}
    </>
  );
}

