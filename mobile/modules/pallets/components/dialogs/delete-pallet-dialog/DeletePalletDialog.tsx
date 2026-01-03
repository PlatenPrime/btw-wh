import { useState } from "react";
import type { IPallet } from "@/modules/pallets/api/types";
import { DeletePalletDialogView } from "./DeletePalletDialogView";
import { useDeletePalletDialog } from "./useDeletePalletDialog";

interface DeletePalletDialogProps {
  pallet: IPallet;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeletePalletDialog({
  pallet,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeletePalletDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { isDeleting, handleDelete } = useDeletePalletDialog({
    pallet,
    onSuccess,
  });

  const handleDeleteAndClose = async () => {
    await handleDelete();
    handleOpenChange?.(false);
  };

  const handleCancel = () => {
    handleOpenChange?.(false);
  };

  return (
    <DeletePalletDialogView
      pallet={pallet}
      visible={open}
      onClose={handleCancel}
      onDelete={handleDeleteAndClose}
      isDeleting={isDeleting}
    />
  );
}

