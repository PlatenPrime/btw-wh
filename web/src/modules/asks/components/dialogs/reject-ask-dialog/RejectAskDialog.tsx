import { RejectAskDialogView } from "@/modules/asks/components/dialogs/reject-ask-dialog/RejectAskDialogView.tsx";

interface RejectAskDialogProps {
  handleRejectAsk: () => void;
  isPending: boolean;
  artikul: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RejectAskDialog({
  handleRejectAsk,
  isPending,
  artikul,
  open,
  onOpenChange,
}: RejectAskDialogProps) {
  const handleReject = async () => {
    try {
      onOpenChange(false);
      await handleRejectAsk();
    } catch (error) {
      console.error("Error rejecting ask:", error);
    }
  };

  return (
    <RejectAskDialogView
      open={open}
      setOpen={onOpenChange}
      handleReject={handleReject}
      isPending={isPending}
      artikul={artikul}
    />
  );
}
