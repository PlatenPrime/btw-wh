import { useState } from "react";
import { RejectAskDialogView } from "./RejectAskDialogView";

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
