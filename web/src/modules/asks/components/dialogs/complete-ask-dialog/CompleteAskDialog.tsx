import { CompleteAskDialogView } from "@/modules/asks/components/dialogs/complete-ask-dialog/CompleteAskDialogView";

interface ExecuteAskDialogProps {
  handleExecuteAsk: () => void;
  isPending: boolean;
  artikul: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CompleteAskDialog({
  handleExecuteAsk,
  isPending,
  artikul,
  open,
  onOpenChange,
}: ExecuteAskDialogProps) {
  const handleExecute = async () => {
    try {
      await handleExecuteAsk();
      onOpenChange(false);
    } catch (error) {
      console.error("Error executing ask:", error);
    }
  };

  return (
    <CompleteAskDialogView
      open={open}
      setOpen={onOpenChange}
      handleExecute={handleExecute}
      isPending={isPending}
      artikul={artikul}
    />
  );
}
