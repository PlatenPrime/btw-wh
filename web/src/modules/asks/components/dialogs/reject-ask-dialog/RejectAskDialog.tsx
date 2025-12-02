import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
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

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const { isRejecting, handleReject } = useRejectAskDialog({
    askId,
    onSuccess,
  });

  const handleRejectAndClose = async () => {
    await handleReject();
    handleOpenChange(false);
  };

  const handleCancel = () => {
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <RejectAskDialogView
        artikul={artikul}
        isRejecting={isRejecting}
        onReject={handleRejectAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
