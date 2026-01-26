import type { RowDto } from "@/modules/rows/api/types/dto";
import { CreatePalletDialog } from "@/modules/pallets/components/dialogs/create-pallet-dialog/CreatePalletDialog";

interface RowDetailHeaderActionsViewProps {
  row: RowDto;
  createDialogOpen: boolean;
  onCreateDialogOpenChange: (open: boolean) => void;
  onCreateSuccess: () => void;
}

export function RowDetailHeaderActionsView({
  row,
  createDialogOpen,
  onCreateDialogOpenChange,
  onCreateSuccess,
}: RowDetailHeaderActionsViewProps) {
  return (
    <CreatePalletDialog
      row={row}
      open={createDialogOpen}
      onOpenChange={onCreateDialogOpenChange}
      onSuccess={onCreateSuccess}
    />
  );
}

