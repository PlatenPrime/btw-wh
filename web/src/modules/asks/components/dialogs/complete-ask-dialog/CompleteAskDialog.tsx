import { Dialog } from "@/components/ui/dialog";
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
  const { isCompleting, handleComplete } = useCompleteAskDialog({
    askId,
    onSuccess,
  });

  const handleCompleteAndClose = async () => {
    await handleComplete();
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <CompleteAskDialogView
        artikul={artikul}
        isCompleting={isCompleting}
        onComplete={handleCompleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
