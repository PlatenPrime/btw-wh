import { Dialog } from "@/components/ui/dialog";
import type { ConstantDto } from "@/modules/constants/api/types";
import { useState } from "react";
import { DeleteConstantDialogView } from "./DeleteConstantDialogView";
import { useDeleteConstantDialog } from "./useDeleteConstantDialog";

interface DeleteConstantDialogProps {
  constant: ConstantDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteConstantDialog({
  constant,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeleteConstantDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { isDeleting, handleDelete } = useDeleteConstantDialog({
    constant,
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
      <DeleteConstantDialogView
        constant={constant}
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
