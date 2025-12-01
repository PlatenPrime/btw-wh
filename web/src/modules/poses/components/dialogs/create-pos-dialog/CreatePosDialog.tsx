import { Dialog } from "@/components/ui/dialog";
import type { IPallet } from "@/modules/pallets/api/types";
import { CreatePosDialogTrigger } from "./CreatePosDialogTrigger";
import { CreatePosDialogView } from "./CreatePosDialogView";
import { useCreatePosDialog } from "./useCreatePosDialog";

interface CreatePosDialogProps {
  pallet: IPallet;
  trigger?: React.ReactNode;
  showTrigger?: boolean;
  onSuccess?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreatePosDialog({
  pallet,
  trigger,
  showTrigger = true,
  onSuccess,
  open: controlledOpen,
  onOpenChange,
}: CreatePosDialogProps) {
  const { handleSuccess, handleCancel } = useCreatePosDialog({
    onOpenChange,
    onSuccess,
  });

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      {showTrigger && <CreatePosDialogTrigger trigger={trigger} />}
      <CreatePosDialogView
        pallet={pallet}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
