import { Dialog } from "@/components/ui/dialog";
import type { IPallet } from "@/modules/pallets/api/types";
import { DeletePalletEmptyPosesDialogTrigger } from "./DeletePalletEmptyPosesDialogTrigger";
import { DeletePalletEmptyPosesDialogView } from "./DeletePalletEmptyPosesDialogView";
import { useDeletePalletEmptyPosesDialog } from "./useDeletePalletEmptyPosesDialog";

interface DeletePalletEmptyPosesDialogProps {
  pallet: IPallet;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DeletePalletEmptyPosesDialog({
  pallet,
  trigger,
  onSuccess,
  open: controlledOpen,
  onOpenChange,
}: DeletePalletEmptyPosesDialogProps) {
  const { isDeleting, handleDelete } = useDeletePalletEmptyPosesDialog({
    pallet,
    onSuccess,
  });

  const handleDeleteAndClose = async () => {
    await handleDelete();
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      {trigger !== undefined && (
        <DeletePalletEmptyPosesDialogTrigger trigger={trigger} />
      )}
      <DeletePalletEmptyPosesDialogView
        pallet={pallet}
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
