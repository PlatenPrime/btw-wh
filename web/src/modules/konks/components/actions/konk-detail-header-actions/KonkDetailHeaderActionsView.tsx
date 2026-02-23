import type { KonkDto } from "@/modules/konks/api/types";
import { DeleteKonkDialog } from "@/modules/konks/components/dialogs/delete-konk-dialog/DeleteKonkDialog";
import { UpdateKonkDialog } from "@/modules/konks/components/dialogs/update-konk-dialog/UpdateKonkDialog";

interface KonkDetailHeaderActionsViewProps {
  konk: KonkDto;
  updateDialogOpen: boolean;
  onUpdateDialogOpenChange: (open: boolean) => void;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  onDeleteSuccess: () => void;
}

export function KonkDetailHeaderActionsView({
  konk,
  updateDialogOpen,
  onUpdateDialogOpenChange,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  onDeleteSuccess,
}: KonkDetailHeaderActionsViewProps) {
  return (
    <>
      <UpdateKonkDialog
        konk={konk}
        open={updateDialogOpen}
        onOpenChange={onUpdateDialogOpenChange}
      />

      <DeleteKonkDialog
        konk={konk}
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
        onSuccess={onDeleteSuccess}
      />
    </>
  );
}
