import { useState } from "react";
import { useDialogThemeColors } from "@/hooks/use-dialog-theme-colors";
import { RejectAskDialogView } from "./RejectAskDialogView";
import { useRejectAskDialog } from "./useRejectAskDialog";

interface RejectAskDialogProps {
  askId: string;
  artikul: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function RejectAskDialog({
  askId,
  artikul,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: RejectAskDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const { bgColor, textColor, borderColor } = useDialogThemeColors();

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { isRejecting, handleReject } = useRejectAskDialog({
    askId,
    onSuccess: () => {
      handleOpenChange?.(false);
      onSuccess?.();
    },
  });

  const handleRejectAndClose = async () => {
    await handleReject();
  };

  const handleCancel = () => {
    handleOpenChange?.(false);
  };

  return (
    <RejectAskDialogView
      artikul={artikul}
      isRejecting={isRejecting}
      onReject={handleRejectAndClose}
      onCancel={handleCancel}
      visible={open}
      bgColor={bgColor}
      textColor={textColor}
      borderColor={borderColor}
    />
  );
}

