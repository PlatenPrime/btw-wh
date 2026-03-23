import { Dialog } from "@/components/ui/dialog";
import type { SkugrPageDto } from "@/modules/skugrs/api/types";
import { useState } from "react";
import { DeleteSkugrDialogView } from "./DeleteSkugrDialogView";
import { useDeleteSkugrDialog } from "./useDeleteSkugrDialog";

interface DeleteSkugrDialogProps {
  skugr: SkugrPageDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteSkugrDialog({
  skugr,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeleteSkugrDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { isDeleting, handleDelete } = useDeleteSkugrDialog({
    skugr,
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
      <DeleteSkugrDialogView
        skugr={skugr}
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
