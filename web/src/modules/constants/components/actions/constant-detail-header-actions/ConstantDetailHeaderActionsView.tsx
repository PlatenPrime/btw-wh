import type { ConstantDto } from "@/modules/constants/api/types";
import { DeleteConstantDialog } from "@/modules/constants/components/dialogs/delete-constant-dialog/DeleteConstantDialog";
import { UpdateConstantDialog } from "@/modules/constants/components/dialogs/update-constant-dialog/UpdateConstantDialog";

interface ConstantDetailHeaderActionsViewProps {
  constant: ConstantDto;
  updateDialogOpen: boolean;
  onUpdateDialogOpenChange: (open: boolean) => void;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  onDeleteSuccess: () => void;
}

export function ConstantDetailHeaderActionsView({
  constant,
  updateDialogOpen,
  onUpdateDialogOpenChange,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  onDeleteSuccess,
}: ConstantDetailHeaderActionsViewProps) {
  return (
    <>
      <UpdateConstantDialog
        constant={constant}
        open={updateDialogOpen}
        onOpenChange={onUpdateDialogOpenChange}
      />

      <DeleteConstantDialog
        constant={constant}
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
        onSuccess={onDeleteSuccess}
      />
    </>
  );
}
