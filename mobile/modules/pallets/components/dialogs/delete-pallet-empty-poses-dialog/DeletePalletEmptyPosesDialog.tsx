import { useState } from "react";
import { useThemeColors } from "@/hooks/use-theme-colors";
import type { IPallet } from "@/modules/pallets/api/types";
import { DeletePalletEmptyPosesDialogView } from "./DeletePalletEmptyPosesDialogView";
import { useDeletePalletEmptyPosesDialog } from "./useDeletePalletEmptyPosesDialog";

interface DeletePalletEmptyPosesDialogProps {
  pallet: IPallet;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeletePalletEmptyPosesDialog({
  pallet,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeletePalletEmptyPosesDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const { dialog, text } = useThemeColors();
  const bgColor = dialog.bg;
  const textColor = text.primary;
  const borderColor = dialog.border;

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { isDeleting, handleDelete } = useDeletePalletEmptyPosesDialog({
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
    <DeletePalletEmptyPosesDialogView
      pallet={pallet}
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

