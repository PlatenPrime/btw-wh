import { useState } from "react";
import { useThemeColors } from "@/hooks/use-theme-colors";
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
  const { dialog, text } = useThemeColors();
  const bgColor = dialog.bg;
  const textColor = text.primary;
  const borderColor = dialog.border;

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
      bgColor={bgColor}
      textColor={textColor}
      borderColor={borderColor}
    />
  );
}

