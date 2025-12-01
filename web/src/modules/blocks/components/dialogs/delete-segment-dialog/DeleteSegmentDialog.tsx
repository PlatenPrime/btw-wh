import { Dialog } from "@/components/ui/dialog";
import type { SegmentDto } from "@/modules/blocks/api/types";
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
  const { isDeleting, handleDelete } = useDeleteSegmentDialog({
    segment,
    onSuccess,
  });

  const handleDeleteAndClose = async () => {
    await handleDelete();
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DeleteSegmentDialogView
        segment={segment}
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}

