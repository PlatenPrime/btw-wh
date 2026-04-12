import { Dialog } from "@/components/ui/dialog";
import type { KaskDto } from "@/modules/kasks/api/types/dto";
import { DeleteKaskDialogView } from "@/modules/kasks/components/dialogs/delete-kask-dialog/DeleteKaskDialogView";
import { useDeleteKaskDialog } from "@/modules/kasks/components/dialogs/delete-kask-dialog/useDeleteKaskDialog";

interface DeleteKaskDialogProps {
  kask: KaskDto;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteKaskDialog({
  kask,
  open,
  onOpenChange,
  onSuccess,
}: DeleteKaskDialogProps) {
  const { isDeleting, handleDelete } = useDeleteKaskDialog({
    kask,
    onSuccess,
  });

  const handleDeleteAndClose = async () => {
    try {
      await handleDelete();
    } catch {
      return;
    }
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DeleteKaskDialogView
        kask={kask}
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
