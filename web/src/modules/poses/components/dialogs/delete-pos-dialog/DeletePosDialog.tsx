import { Dialog } from "@/components/ui/dialog";
import type { IPos } from "@/modules/poses/api/types";
import { useState } from "react";
import { DeletePosDialogTrigger } from "./DeletePosDialogTrigger";
import { DeletePosDialogView } from "./DeletePosDialogView";
import { useDeletePosDialog } from "./useDeletePosDialog";

interface DeletePosDialogProps {
  pos: IPos;
  trigger?: React.ReactNode;
  showTrigger?: boolean;
  onSuccess?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DeletePosDialog({
  pos,
  trigger,
  showTrigger = true,
  onSuccess,
  open: controlledOpen,
  onOpenChange,
}: DeletePosDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const { isDeleting, handleDelete } = useDeletePosDialog({
    pos,
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
      {showTrigger && <DeletePosDialogTrigger trigger={trigger} />}
      <DeletePosDialogView
        pos={pos}
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
