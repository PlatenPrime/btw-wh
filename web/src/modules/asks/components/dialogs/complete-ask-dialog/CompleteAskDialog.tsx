import { CompleteAskDialogView } from "@/modules/asks/components/dialogs/complete-ask-dialog/CompleteAskDialogView";
import { useState } from "react";

interface ExecuteAskDialogProps {
  handleExecuteAsk: () => void;
  isPending: boolean;
  artikul: string;
}

export function CompleteAskDialog({
  handleExecuteAsk,
  isPending,
  artikul,
}: ExecuteAskDialogProps) {
  const [open, setOpen] = useState(false);

  const handleExecute = async () => {
    try {
      await handleExecuteAsk();
      setOpen(false);
    } catch (error) {
      console.error("Error executing ask:", error);
    }
  };

  return (
    <CompleteAskDialogView
      open={open}
      setOpen={setOpen}
      handleExecute={handleExecute}
      isPending={isPending}
      artikul={artikul}
    />
  );
}
