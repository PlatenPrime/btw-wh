import { useState } from "react";
import { ExecuteAskDialogView } from "@/modules/asks/components/dialogs/execute-ask-dialog/ExecuteAskDialogView.tsx";

interface ExecuteAskDialogProps {
  handleExecuteAsk: () => void;
  isPending: boolean;
  artikul: string;
}

export function ExecuteAskDialog({
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
    <ExecuteAskDialogView
      open={open}
      setOpen={setOpen}
      handleExecute={handleExecute}
      isPending={isPending}
      artikul={artikul}
    />
  );
}
