import { useState } from "react";
import type { IPos } from "@/modules/poses/api/types";
import { DeletePosDialogView } from "./DeletePosDialogView";
import { useDeletePosDialog } from "./useDeletePosDialog";

interface DeletePosDialogProps {
  pos: IPos;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeletePosDialog({
  pos,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeletePosDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { isDeleting, handleDelete } = useDeletePosDialog({
    pos,
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
    <DeletePosDialogView
      pos={pos}
      visible={open}
      onClose={handleCancel}
      onDelete={handleDeleteAndClose}
      isDeleting={isDeleting}
    />
  );
}

