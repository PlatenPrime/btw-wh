import { useState } from "react";
import { useThemeColors } from "@/hooks/use-theme-colors";
import type { IPallet } from "@/modules/pallets/api/types";
import { MovePalletPosesDialogView } from "./MovePalletPosesDialogView";
import { useMovePalletPosesDialog } from "./useMovePalletPosesDialog";

interface MovePalletPosesDialogProps {
  pallet: IPallet;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function MovePalletPosesDialog({
  pallet,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: MovePalletPosesDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const { dialog, text } = useThemeColors();
  const bgColor = dialog.bg;
  const textColor = text.primary;
  const borderColor = dialog.border;

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const {
    isMoving,
    isSourceEmpty,
    mutationError,
    handleSubmit,
    handleDialogOpenChange,
  } = useMovePalletPosesDialog({
    pallet,
    onOpenChange: handleOpenChange,
    onSuccess,
  });

  const handleCancel = () => {
    handleDialogOpenChange(false);
  };

  return (
    <MovePalletPosesDialogView
      pallet={pallet}
      visible={open}
      onClose={handleCancel}
      onSubmit={handleSubmit}
      isSourceEmpty={isSourceEmpty}
      mutationError={mutationError}
      isMoving={isMoving}
      bgColor={bgColor}
      textColor={textColor}
      borderColor={borderColor}
    />
  );
}

