import { Dialog } from "@/components/ui/dialog";
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
  const { isRejecting, handleReject } = useRejectAskDialog({
    askId,
    onSuccess,
  });

  const handleRejectAndClose = async () => {
    await handleReject();
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <RejectAskDialogView
        artikul={artikul}
        isRejecting={isRejecting}
        onReject={handleRejectAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
