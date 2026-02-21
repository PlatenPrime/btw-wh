import { Dialog } from "@/components/ui/dialog";
import type { ProdDto } from "@/modules/prods/api/types";
import { useState } from "react";
import { DeleteProdDialogView } from "./DeleteProdDialogView";
import { useDeleteProdDialog } from "./useDeleteProdDialog";

interface DeleteProdDialogProps {
  prod: ProdDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteProdDialog({
  prod,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeleteProdDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { isDeleting, handleDelete } = useDeleteProdDialog({
    prod,
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
      <DeleteProdDialogView
        prod={prod}
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
