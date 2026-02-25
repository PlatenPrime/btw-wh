import type { ConstantDto } from "@/modules/constants/api/types";
import { DeleteConstantDialog } from "@/modules/constants/components/dialogs/delete-constant-dialog/DeleteConstantDialog";
import { AddConstantEntryDialog } from "@/modules/constants/components/dialogs/add-constant-entry-dialog";

interface ConstantDetailHeaderActionsViewProps {
  constant: ConstantDto;
  addEntryDialogOpen: boolean;
  onAddEntryDialogOpenChange: (open: boolean) => void;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  onDeleteSuccess: () => void;
}

export function ConstantDetailHeaderActionsView({
  constant,
  addEntryDialogOpen,
  onAddEntryDialogOpenChange,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  onDeleteSuccess,
}: ConstantDetailHeaderActionsViewProps) {
  return (
    <>
      <AddConstantEntryDialog
        constant={constant}
        open={addEntryDialogOpen}
        onOpenChange={onAddEntryDialogOpenChange}
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

