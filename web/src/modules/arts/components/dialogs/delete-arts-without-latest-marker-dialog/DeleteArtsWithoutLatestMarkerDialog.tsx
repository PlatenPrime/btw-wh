import { Dialog } from "@/components/ui/dialog";
import { DeleteArtsWithoutLatestMarkerDialogView } from "./DeleteArtsWithoutLatestMarkerDialogView";
import { useDeleteArtsWithoutLatestMarkerDialog } from "./useDeleteArtsWithoutLatestMarkerDialog";

interface DeleteArtsWithoutLatestMarkerDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteArtsWithoutLatestMarkerDialog({
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeleteArtsWithoutLatestMarkerDialogProps) {
  const { isDeleting, handleDelete } =
    useDeleteArtsWithoutLatestMarkerDialog({
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
      <DeleteArtsWithoutLatestMarkerDialogView
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}

