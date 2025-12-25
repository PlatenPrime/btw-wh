import { useState } from "react";
import { useDialogThemeColors } from "@/hooks/use-dialog-theme-colors";
import { CreateAskDialogView } from "./CreateAskDialogView";

interface CreateAskDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateAskDialog({
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: CreateAskDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const { bgColor, textColor, borderColor } = useDialogThemeColors();

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
      bgColor={bgColor}
      textColor={textColor}
      borderColor={borderColor}
    />
  );
}

