import { Dialog } from "@/components/ui/dialog";
import type { DelListItemDto } from "@/modules/dels/api/types";
import { DeleteDelDialogView } from "./DeleteDelDialogView";
import { useDeleteDelDialog } from "./useDeleteDelDialog";

interface DeleteDelDialogProps {
  del: DelListItemDto;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteDelDialog({
  del,
  open,
  onOpenChange,
  onSuccess,
}: DeleteDelDialogProps) {
  const { isDeleting, handleDelete } = useDeleteDelDialog({
    del,
    onSuccess,
  });

  const handleDeleteAndClose = async () => {
    await handleDelete();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DeleteDelDialogView
        del={del}
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
