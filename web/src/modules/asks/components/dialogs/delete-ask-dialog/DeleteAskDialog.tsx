import { DeleteAskDialogView } from "@/modules/asks/components/dialogs/delete-ask-dialog/DeleteAskDialogView.tsx";

interface DeleteAskDialogProps {
  handleDeleteAsk: () => void;
  isPending: boolean;
  artikul: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteAskDialog({
  handleDeleteAsk,
  isPending,
  artikul,
  open,
  onOpenChange,
}: DeleteAskDialogProps) {
  const handleDelete = async () => {
    try {
      await handleDeleteAsk();
      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting ask:", error);
    }
  };
  return (
    <DeleteAskDialogView
      open={open}
      setOpen={onOpenChange}
      handleDelete={handleDelete}
      isPending={isPending}
      artikul={artikul}
    />
  );
}
