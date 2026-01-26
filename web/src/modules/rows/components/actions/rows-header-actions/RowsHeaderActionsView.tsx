import { ExportPosesStocksDialog } from "@/modules/poses/components/dialogs/export-poses-stocks-dialog";

interface RowsHeaderActionsViewProps {
  exportDialogOpen: boolean;
  onExportDialogOpenChange: (open: boolean) => void;
}

export function RowsHeaderActionsView({
  exportDialogOpen,
  onExportDialogOpenChange,
}: RowsHeaderActionsViewProps) {
  return (
    <ExportPosesStocksDialog
      open={exportDialogOpen}
      onOpenChange={onExportDialogOpenChange}
    />
  );
}

