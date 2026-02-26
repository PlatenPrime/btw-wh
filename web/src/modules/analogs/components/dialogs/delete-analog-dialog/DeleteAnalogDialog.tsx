import { Dialog } from "@/components/ui/dialog";
import type { AnalogDto } from "@/modules/analogs/api/types";
import { useState } from "react";
import { DeleteAnalogDialogView } from "./DeleteAnalogDialogView";
import { useDeleteAnalogDialog } from "./useDeleteAnalogDialog";

interface DeleteAnalogDialogProps {
  analog: AnalogDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteAnalogDialog({
  analog,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeleteAnalogDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const { isDeleting, handleDelete } = useDeleteAnalogDialog({
    analog,
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
      <DeleteAnalogDialogView
        analog={analog}
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
