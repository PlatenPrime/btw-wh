import { Dialog } from "@/components/ui/dialog";
import type { IPallet } from "@/modules/pallets/api/types";
import { DeletePalletDialogTrigger } from "./DeletePalletDialogTrigger";
import { DeletePalletDialogView } from "./DeletePalletDialogView";
import { useDeletePalletDialog } from "./useDeletePalletDialog";

interface DeletePalletDialogProps {
  pallet: IPallet;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DeletePalletDialog({
  pallet,
  trigger,
  onSuccess,
  open: controlledOpen,
  onOpenChange,
}: DeletePalletDialogProps) {
  const { isDeleting, handleDelete } = useDeletePalletDialog({
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
        <DeletePalletDialogTrigger trigger={trigger} />
      )}
      <DeletePalletDialogView
        pallet={pallet}
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
