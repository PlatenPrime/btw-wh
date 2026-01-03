import { useState } from "react";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { DeleteRowDialogView } from "./DeleteRowDialogView";
import { useDeleteRowDialog } from "./useDeleteRowDialog";

interface DeleteRowDialogProps {
  row: RowDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteRowDialog({
  row,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeleteRowDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { isDeleting, handleDelete } = useDeleteRowDialog({
    row,
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
    <DeleteRowDialogView
      row={row}
      visible={open}
      onClose={handleCancel}
      onDelete={handleDeleteAndClose}
      isDeleting={isDeleting}
    />
  );
}

