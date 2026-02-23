import { Dialog } from "@/components/ui/dialog";
import type { KonkDto } from "@/modules/konks/api/types";
import { useState } from "react";
import { DeleteKonkDialogView } from "./DeleteKonkDialogView";
import { useDeleteKonkDialog } from "./useDeleteKonkDialog";

interface DeleteKonkDialogProps {
  konk: KonkDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteKonkDialog({
  konk,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeleteKonkDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { isDeleting, handleDelete } = useDeleteKonkDialog({
    konk,
    onSuccess,
  });

  const handleDeleteAndClose = async () => {
    await handleDelete();
    handleOpenChange?.(false);
  };

  const handleCancel = () => {
    handleOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DeleteKonkDialogView
        konk={konk}
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
