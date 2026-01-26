import { CreateRowDialog } from "@/modules/rows/components/dialogs/create-row-dialog/CreateRowDialog";

interface RowsHeaderActionsViewProps {
  createDialogOpen: boolean;
  onCreateDialogOpenChange: (open: boolean) => void;
  onCreateSuccess: () => void;
}

export function RowsHeaderActionsView({
  createDialogOpen,
  onCreateDialogOpenChange,
  onCreateSuccess,
}: RowsHeaderActionsViewProps) {
  return (
    <CreateRowDialog
      open={createDialogOpen}
      onOpenChange={onCreateDialogOpenChange}
      onSuccess={onCreateSuccess}
    />
  );
}

