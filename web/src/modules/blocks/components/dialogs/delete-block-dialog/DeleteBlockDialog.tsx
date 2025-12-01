import { Dialog } from "@/components/ui/dialog";
import type { BlockDto } from "@/modules/blocks/api/types";
import { DeleteBlockDialogView } from "./DeleteBlockDialogView";
import { useDeleteBlockDialog } from "./useDeleteBlockDialog";

interface DeleteBlockDialogProps {
  block: BlockDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteBlockDialog({
  block,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeleteBlockDialogProps) {
  const { isDeleting, handleDelete } = useDeleteBlockDialog({
    block,
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
      <DeleteBlockDialogView
        block={block}
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}

