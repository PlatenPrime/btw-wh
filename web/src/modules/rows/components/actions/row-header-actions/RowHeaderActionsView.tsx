import type { RowDto } from "@/modules/rows/api/types/dto";
import { DeleteRowDialog } from "@/modules/rows/components/dialogs/delete-row-dialog/DeleteRowDialog";

interface RowHeaderActionsViewProps {
  row: RowDto;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  onDeleteSuccess: () => void;
}

export function RowHeaderActionsView({
  row,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  onDeleteSuccess,
}: RowHeaderActionsViewProps) {
  return (
    <DeleteRowDialog
      row={row}
      onSuccess={onDeleteSuccess}
      open={deleteDialogOpen}
      onOpenChange={onDeleteDialogOpenChange}
    />
  );
}

