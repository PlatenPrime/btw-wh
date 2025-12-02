import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
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
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const { isDeleting, handleDelete } =
    useDeleteArtsWithoutLatestMarkerDialog({
      onSuccess,
    });

  const handleDeleteAndClose = async () => {
    await handleDelete();
    handleOpenChange(false);
  };

  const handleCancel = () => {
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DeleteArtsWithoutLatestMarkerDialogView
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}

