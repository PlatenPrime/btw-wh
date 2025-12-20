import { useState } from "react";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
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
  const colorScheme = useColorScheme() ?? "light";
  const bgColor = colorScheme === "light" ? "#fff" : "#1f2937";
  const textColor =
    colorScheme === "light" ? Colors.light.text : Colors.dark.text;
  const borderColor = colorScheme === "light" ? "#d1d5db" : "#4b5563";

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

