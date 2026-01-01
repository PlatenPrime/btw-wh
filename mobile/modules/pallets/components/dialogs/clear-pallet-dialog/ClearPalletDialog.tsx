import { useState } from "react";
import { useThemeColors } from "@/hooks/use-theme-colors";
import type { IPallet } from "@/modules/pallets/api/types";
import { ClearPalletDialogView } from "./ClearPalletDialogView";
import { useClearPalletDialog } from "./useClearPalletDialog";

interface ClearPalletDialogProps {
  pallet: IPallet;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function ClearPalletDialog({
  pallet,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: ClearPalletDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const { dialog, text } = useThemeColors();
  const bgColor = dialog.bg;
  const textColor = text.primary;
  const borderColor = dialog.border;

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { isClearing, handleClear } = useClearPalletDialog({
    pallet,
    onSuccess,
  });

  const handleClearAndClose = async () => {
    await handleClear();
    handleOpenChange?.(false);
  };

  const handleCancel = () => {
    handleOpenChange?.(false);
  };

  return (
    <ClearPalletDialogView
      pallet={pallet}
      visible={open}
      onClose={handleCancel}
      onClear={handleClearAndClose}
      isClearing={isClearing}
      bgColor={bgColor}
      textColor={textColor}
      borderColor={borderColor}
    />
  );
}

