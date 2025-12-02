import { Dialog } from "@/components/ui/dialog";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { useState } from "react";
import { DeleteRowDialogTrigger } from "./DeleteRowDialogTrigger";
import { DeleteRowDialogView } from "./DeleteRowDialogView";
import { useDeleteRowDialog } from "./useDeleteRowDialog";

interface DeleteRowDialogProps {
  row: RowDto;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DeleteRowDialog({
  row,
  trigger,
  onSuccess,
  open: controlledOpen,
  onOpenChange,
}: DeleteRowDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const { isDeleting, handleDelete } = useDeleteRowDialog({
    row,
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
      {trigger !== undefined && <DeleteRowDialogTrigger trigger={trigger} />}
      <DeleteRowDialogView
        row={row}
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
