import { CreateRowDialog } from "@/modules/rows/components/dialogs/create-row-dialog/CreateRowDialog";
import { ExportPosesStocksDialog } from "@/modules/poses/components/dialogs/export-poses-stocks-dialog";

interface RowsHeaderActionsViewProps {
  exportDialogOpen: boolean;
  onExportDialogOpenChange: (open: boolean) => void;
  createRowDialogOpen: boolean;
  onCreateRowDialogOpenChange: (open: boolean) => void;
}

export function RowsHeaderActionsView({
  exportDialogOpen,
  onExportDialogOpenChange,
  createRowDialogOpen,
  onCreateRowDialogOpenChange,
}: RowsHeaderActionsViewProps) {
  return (
    <>
      <CreateRowDialog
        open={createRowDialogOpen}
        onOpenChange={onCreateRowDialogOpenChange}
      />
      <ExportPosesStocksDialog
        open={exportDialogOpen}
        onOpenChange={onExportDialogOpenChange}
      />
    </>
  );
}

