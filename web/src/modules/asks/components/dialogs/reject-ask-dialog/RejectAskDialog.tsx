import { useState } from "react";
import { RejectAskDialogView } from "@/modules/asks/components/dialogs/reject-ask-dialog/RejectAskDialogView.tsx";

interface RejectAskDialogProps {
  handleRejectAsk: () => void;
  isPending: boolean;
  artikul: string;
}

export function RejectAskDialog({
  handleRejectAsk,
  isPending,
  artikul,
}: RejectAskDialogProps) {
  const [open, setOpen] = useState(false);

  const handleReject = async () => {
    try {
      await handleRejectAsk();
      setOpen(false);
    } catch (error) {
      console.error("Error rejecting ask:", error);
    }
  };

  return (
    <RejectAskDialogView
      open={open}
      setOpen={setOpen}
      handleReject={handleReject}
      isPending={isPending}
      artikul={artikul}
    />
  );
}
