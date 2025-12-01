import { Dialog } from "@/components/ui/dialog";
import type { IPos } from "@/modules/poses/api/types";
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
  const { isDeleting, handleDelete } = useDeletePosDialog({
    pos,
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
