import type { VariantDto } from "@/modules/variants/api/types";
import { DeleteVariantDialog } from "@/modules/variants/components/dialogs/delete-variant-dialog";
import { UpdateVariantDialog } from "@/modules/variants/components/dialogs/update-variant-dialog";

interface VariantDetailHeaderActionsViewProps {
  variant: VariantDto;
  updateDialogOpen: boolean;
  onUpdateDialogOpenChange: (open: boolean) => void;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  onDeleteSuccess: () => void;
}

export function VariantDetailHeaderActionsView({
  variant,
  updateDialogOpen,
  onUpdateDialogOpenChange,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  onDeleteSuccess,
}: VariantDetailHeaderActionsViewProps) {
  return (
    <>
      <UpdateVariantDialog
        variant={variant}
        open={updateDialogOpen}
        onOpenChange={onUpdateDialogOpenChange}
      />
      <DeleteVariantDialog
        variant={variant}
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
        onSuccess={onDeleteSuccess}
      />
    </>
  );
}

