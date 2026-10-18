import type { IPallet } from "@/modules/pallets/api/types";
import { ChangePalletGroupDialog } from "@/modules/pallets/components/dialogs/change-pallet-group-dialog/ChangePalletGroupDialog";
import { ClearPalletDialog } from "@/modules/pallets/components/dialogs/clear-pallet-dialog/ClearPalletDialog";
import { DeletePalletDialog } from "@/modules/pallets/components/dialogs/delete-pallet-dialog/DeletePalletDialog";
import { DeletePalletEmptyPosesDialog } from "@/modules/pallets/components/dialogs/delete-pallet-empty-poses-dialog/DeletePalletEmptyPosesDialog";
import { MovePalletPosesDialog } from "@/modules/pallets/components/dialogs/move-pallet-poses-dialog/MovePalletPosesDialog";

interface PalletHeaderActionsViewProps {
  pallet: IPallet;
  showEditorDialogs?: boolean;
  showDeletePalletDialog?: boolean;
  showChangeGroupDialog?: boolean;
  clearDialogOpen: boolean;
  onClearDialogOpenChange: (open: boolean) => void;
  deleteEmptyPosesDialogOpen: boolean;
  onDeleteEmptyPosesDialogOpenChange: (open: boolean) => void;
  moveDialogOpen: boolean;
  onMoveDialogOpenChange: (open: boolean) => void;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  changeGroupDialogOpen: boolean;
  onChangeGroupDialogOpenChange: (open: boolean) => void;
  onDeleteSuccess: () => void;
}

export function PalletHeaderActionsView({
  pallet,
  showEditorDialogs = true,
  showDeletePalletDialog = true,
  showChangeGroupDialog = false,
  clearDialogOpen,
  onClearDialogOpenChange,
  deleteEmptyPosesDialogOpen,
  onDeleteEmptyPosesDialogOpenChange,
  moveDialogOpen,
  onMoveDialogOpenChange,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  changeGroupDialogOpen,
  onChangeGroupDialogOpenChange,
  onDeleteSuccess,
}: PalletHeaderActionsViewProps) {
  const currentGroupId =
    typeof pallet.palgr?.id === "string"
      ? pallet.palgr.id
      : pallet.palgr?.id != null
        ? String(pallet.palgr.id)
        : undefined;

  return (
    <>
      {showChangeGroupDialog ? (
        <ChangePalletGroupDialog
          open={changeGroupDialogOpen}
          onOpenChange={onChangeGroupDialogOpenChange}
          palletId={pallet._id}
          palletTitle={pallet.title}
          currentGroupId={currentGroupId}
        />
      ) : null}
      {showEditorDialogs ? (
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
        </>
      ) : null}
      {showDeletePalletDialog ? (
        <DeletePalletDialog
          pallet={pallet}
          onSuccess={onDeleteSuccess}
          open={deleteDialogOpen}
          onOpenChange={onDeleteDialogOpenChange}
        />
      ) : null}
    </>
  );
}
