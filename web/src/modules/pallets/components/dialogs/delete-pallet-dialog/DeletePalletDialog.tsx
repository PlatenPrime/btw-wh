import { Dialog } from "@/components/ui/dialog";
import type { IPallet } from "@/modules/pallets/api/types";
import { useState } from "react";
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
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const { isDeleting, handleDelete } = useDeletePalletDialog({
    pallet,
    onSuccess,
  });

  const handleDeleteAndClose = async () => {
    await handleDelete();
    handleOpenChange(false);
  };

  const handleCancel = () => {
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
