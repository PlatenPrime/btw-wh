import { useState } from "react";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
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
  const colorScheme = useColorScheme() ?? "light";
  const bgColor = colorScheme === "light" ? "#fff" : "#1f2937";
  const textColor =
    colorScheme === "light" ? Colors.light.text : Colors.dark.text;
  const borderColor = colorScheme === "light" ? "#d1d5db" : "#4b5563";

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

