import { Dialog } from "@/components/ui/dialog";
import type { VariantDto } from "@/modules/variants/api/types";
import { useState } from "react";
import { DeleteVariantDialogView } from "./DeleteVariantDialogView";
import { useDeleteVariantDialog } from "./useDeleteVariantDialog";

interface DeleteVariantDialogProps {
  variant: VariantDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteVariantDialog({
  variant,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeleteVariantDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const { isDeleting, handleDelete } = useDeleteVariantDialog({
    variant,
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
      <DeleteVariantDialogView
        variant={variant}
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}

