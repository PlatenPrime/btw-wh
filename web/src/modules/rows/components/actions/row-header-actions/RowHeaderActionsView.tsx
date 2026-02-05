import type { RowDto } from "@/modules/rows/api/types/dto";
import { DeleteRowDialog } from "@/modules/rows/components/dialogs/delete-row-dialog/DeleteRowDialog";
import { CreatePalletDialog } from "@/modules/pallets/components/dialogs/create-pallet-dialog/CreatePalletDialog";

interface RowHeaderActionsViewProps {
  row: RowDto;
  createPalletDialogOpen: boolean;
  onCreatePalletDialogOpenChange: (open: boolean) => void;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  onDeleteSuccess: () => void;
}

export function RowHeaderActionsView({
  row,
  createPalletDialogOpen,
  onCreatePalletDialogOpenChange,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  onDeleteSuccess,
}: RowHeaderActionsViewProps) {
  return (
    <>
      <CreatePalletDialog
        row={row}
        open={createPalletDialogOpen}
        onOpenChange={onCreatePalletDialogOpenChange}
        showTrigger={false}
      />
      <DeleteRowDialog
        row={row}
        onSuccess={onDeleteSuccess}
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
      />
    </>
  );
}

