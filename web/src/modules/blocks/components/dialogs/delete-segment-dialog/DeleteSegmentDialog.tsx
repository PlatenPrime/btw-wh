import { Dialog } from "@/components/ui/dialog";
import type { SegmentDto } from "@/modules/blocks/api/types";
import { useState } from "react";
import { DeleteSegmentDialogView } from "./DeleteSegmentDialogView";
import { useDeleteSegmentDialog } from "./useDeleteSegmentDialog";

interface DeleteSegmentDialogProps {
  segment: SegmentDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteSegmentDialog({
  segment,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeleteSegmentDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const { isDeleting, handleDelete } = useDeleteSegmentDialog({
    segment,
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
      <DeleteSegmentDialogView
        segment={segment}
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}

