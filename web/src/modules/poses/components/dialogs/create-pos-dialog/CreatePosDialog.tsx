import { Dialog } from "@/components/ui/dialog";
import type { IPallet } from "@/modules/pallets/api/types";
import { useState } from "react";
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
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { handleSuccess, handleCancel } = useCreatePosDialog({
    onOpenChange: handleOpenChange,
    onSuccess,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {showTrigger && <CreatePosDialogTrigger trigger={trigger} />}
      <CreatePosDialogView
        pallet={pallet}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
