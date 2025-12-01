import { Dialog } from "@/components/ui/dialog";
import type { IPos } from "@/modules/poses/api/types";
import { UpdatePosDialogTrigger } from "./UpdatePosDialogTrigger";
import { UpdatePosDialogView } from "./UpdatePosDialogView";
import { useUpdatePosDialog } from "./useUpdatePosDialog";

interface UpdatePosDialogProps {
  pos: IPos;
  trigger?: React.ReactNode;
  showTrigger?: boolean;
  onSuccess?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function UpdatePosDialog({
  pos,
  trigger,
  showTrigger = true,
  onSuccess,
  open: controlledOpen,
  onOpenChange,
}: UpdatePosDialogProps) {
  const { handleSuccess, handleCancel } = useUpdatePosDialog({
    onOpenChange,
    onSuccess,
  });

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      {showTrigger && <UpdatePosDialogTrigger trigger={trigger} />}
      <UpdatePosDialogView
        pos={pos}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
        isDialogOpen={controlledOpen ?? false}
      />
    </Dialog>
  );
}
