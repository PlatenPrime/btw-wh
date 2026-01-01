import { useState } from "react";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { CreateAskDialogView } from "./CreateAskDialogView";

interface CreateAskDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
  preFilledArtikul?: string;
}

export function CreateAskDialog({
  open: controlledOpen,
  onOpenChange,
  onSuccess,
  preFilledArtikul,
}: CreateAskDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const { dialog, text } = useThemeColors();
  const bgColor = dialog.bg;
  const textColor = text.primary;
  const borderColor = dialog.border;

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const handleSuccess = () => {
    handleOpenChange?.(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    handleOpenChange?.(false);
  };

  return (
    <CreateAskDialogView
      visible={open}
      onClose={handleCancel}
      onSuccess={handleSuccess}
      preFilledArtikul={preFilledArtikul}
      bgColor={bgColor}
      textColor={textColor}
      borderColor={borderColor}
    />
  );
}

