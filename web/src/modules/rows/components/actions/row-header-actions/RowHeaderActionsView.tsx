import type { RowDto } from "@/modules/rows/api/types/dto";
import { DeleteRowDialog } from "@/modules/rows/components/dialogs/delete-row-dialog/DeleteRowDialog";
import { CreatePalletDialog } from "@/modules/pallets/components/dialogs/create-pallet-dialog/CreatePalletDialog";

interface RowHeaderActionsViewProps {
  row: RowDto;
  showCreatePalletDialog?: boolean;
  showDeleteRowDialog?: boolean;
  createPalletDialogOpen: boolean;
  onCreatePalletDialogOpenChange: (open: boolean) => void;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  onDeleteSuccess: () => void;
}

export function RowHeaderActionsView({
  row,
  showCreatePalletDialog = true,
  showDeleteRowDialog = true,
  createPalletDialogOpen,
  onCreatePalletDialogOpenChange,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  onDeleteSuccess,
}: RowHeaderActionsViewProps) {
  return (
    <>
      {showCreatePalletDialog ? (
        <CreatePalletDialog
          row={row}
          open={createPalletDialogOpen}
          onOpenChange={onCreatePalletDialogOpenChange}
          showTrigger={false}
        />
      ) : null}
      {showDeleteRowDialog ? (
        <DeleteRowDialog
          row={row}
          onSuccess={onDeleteSuccess}
          open={deleteDialogOpen}
          onOpenChange={onDeleteDialogOpenChange}
        />
      ) : null}
    </>
  );
}

