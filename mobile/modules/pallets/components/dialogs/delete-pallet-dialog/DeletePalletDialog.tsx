import { useState } from "react";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
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
  const colorScheme = useColorScheme() ?? "light";
  const bgColor = colorScheme === "light" ? "#fff" : "#1f2937";
  const textColor =
    colorScheme === "light" ? Colors.light.text : Colors.dark.text;
  const borderColor = colorScheme === "light" ? "#d1d5db" : "#4b5563";

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
      bgColor={bgColor}
      textColor={textColor}
      borderColor={borderColor}
    />
  );
}

