import { Dialog } from "@/components/ui/dialog";
import type { BlockDto } from "@/modules/blocks/api/types";
import { useState } from "react";
import { DeleteBlockDialogView } from "./DeleteBlockDialogView";
import { useDeleteBlockDialog } from "./useDeleteBlockDialog";

interface DeleteBlockDialogProps {
  block: BlockDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteBlockDialog({
  block,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeleteBlockDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const { isDeleting, handleDelete } = useDeleteBlockDialog({
    block,
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
      <DeleteBlockDialogView
        block={block}
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}

