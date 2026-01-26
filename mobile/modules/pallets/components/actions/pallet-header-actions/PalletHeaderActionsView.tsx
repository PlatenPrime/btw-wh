import type { IPallet } from "@/modules/pallets/api/types";
import { ClearPalletDialog } from "@/modules/pallets/components/dialogs/clear-pallet-dialog/ClearPalletDialog";
import { DeletePalletDialog } from "@/modules/pallets/components/dialogs/delete-pallet-dialog/DeletePalletDialog";
import { DeletePalletEmptyPosesDialog } from "@/modules/pallets/components/dialogs/delete-pallet-empty-poses-dialog/DeletePalletEmptyPosesDialog";
import { MovePalletPosesDialog } from "@/modules/pallets/components/dialogs/move-pallet-poses-dialog/MovePalletPosesDialog";

interface PalletHeaderActionsViewProps {
  pallet: IPallet;
  clearDialogOpen: boolean;
  onClearDialogOpenChange: (open: boolean) => void;
  deleteEmptyPosesDialogOpen: boolean;
  onDeleteEmptyPosesDialogOpenChange: (open: boolean) => void;
  moveDialogOpen: boolean;
  onMoveDialogOpenChange: (open: boolean) => void;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  onDeleteSuccess: () => void;
}

export function PalletHeaderActionsView({
  pallet,
  clearDialogOpen,
  onClearDialogOpenChange,
  deleteEmptyPosesDialogOpen,
  onDeleteEmptyPosesDialogOpenChange,
  moveDialogOpen,
  onMoveDialogOpenChange,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  onDeleteSuccess,
}: PalletHeaderActionsViewProps) {
  return (
    <>
      <ClearPalletDialog
        pallet={pallet}
        onSuccess={() => {}}
        open={clearDialogOpen}
        onOpenChange={onClearDialogOpenChange}
      />
      <DeletePalletEmptyPosesDialog
        pallet={pallet}
        onSuccess={() => {}}
        open={deleteEmptyPosesDialogOpen}
        onOpenChange={onDeleteEmptyPosesDialogOpenChange}
      />
      <MovePalletPosesDialog
        pallet={pallet}
        open={moveDialogOpen}
        onOpenChange={onMoveDialogOpenChange}
      />
      <DeletePalletDialog
        pallet={pallet}
        onSuccess={onDeleteSuccess}
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
      />
    </>
  );
}

