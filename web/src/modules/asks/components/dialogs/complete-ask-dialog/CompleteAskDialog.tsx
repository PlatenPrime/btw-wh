import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { CompleteAskDialogView } from "./CompleteAskDialogView";
import { useCompleteAskDialog } from "./useCompleteAskDialog";

interface CompleteAskDialogProps {
  askId: string;
  artikul: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CompleteAskDialog({
  askId,
  artikul,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: CompleteAskDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const { isCompleting, handleComplete } = useCompleteAskDialog({
    askId,
    onSuccess,
  });

  const handleCompleteAndClose = async () => {
    await handleComplete();
    handleOpenChange(false);
  };

  const handleCancel = () => {
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <CompleteAskDialogView
        artikul={artikul}
        isCompleting={isCompleting}
        onComplete={handleCompleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
