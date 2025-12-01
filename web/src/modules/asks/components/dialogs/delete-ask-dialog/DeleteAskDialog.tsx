import { Dialog } from "@/components/ui/dialog";
import { DeleteAskDialogView } from "./DeleteAskDialogView";
import { useDeleteAskDialog } from "./useDeleteAskDialog";

interface DeleteAskDialogProps {
  askId: string;
  artikul: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteAskDialog({
  askId,
  artikul,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeleteAskDialogProps) {
  const { isDeleting, handleDelete } = useDeleteAskDialog({
    askId,
    onSuccess,
  });

  const handleDeleteAndClose = async () => {
    await handleDelete();
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DeleteAskDialogView
        artikul={artikul}
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
