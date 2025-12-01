import { Dialog } from "@/components/ui/dialog";
import type { RowDto } from "@/modules/rows/api/types/dto";
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
  const { isDeleting, handleDelete } = useDeleteRowDialog({
    row,
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
