import { useState } from "react";
import { DeleteAskDialogView } from "./DeleteAskDialogView";
import { useDeleteAskDialog } from "./useDeleteAskDialog";

interface DeleteAskDialogProps {
  askId: string;
  artikul: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteAskDialog({
  askId,
  artikul,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeleteAskDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { isDeleting, handleDelete } = useDeleteAskDialog({
    askId,
    onSuccess: () => {
      handleOpenChange?.(false);
      onSuccess?.();
    },
  });

  const handleDeleteAndClose = async () => {
    await handleDelete();
  };

  const handleCancel = () => {
    handleOpenChange?.(false);
  };

  return (
    <DeleteAskDialogView
      artikul={artikul}
      isDeleting={isDeleting}
      onDelete={handleDeleteAndClose}
      onCancel={handleCancel}
      visible={open}
    />
  );
}

