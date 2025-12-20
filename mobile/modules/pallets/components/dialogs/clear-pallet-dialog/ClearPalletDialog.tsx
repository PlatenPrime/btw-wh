import { useState } from "react";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
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
  const colorScheme = useColorScheme() ?? "light";
  const bgColor = colorScheme === "light" ? "#fff" : "#1f2937";
  const textColor =
    colorScheme === "light" ? Colors.light.text : Colors.dark.text;
  const borderColor = colorScheme === "light" ? "#d1d5db" : "#4b5563";

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

