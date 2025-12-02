import { Dialog } from "@/components/ui/dialog";
import type { IPos } from "@/modules/poses/api/types";
import { useState } from "react";
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
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { handleSuccess, handleCancel } = useUpdatePosDialog({
    onOpenChange: handleOpenChange,
    onSuccess,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {showTrigger && <UpdatePosDialogTrigger trigger={trigger} />}
      <UpdatePosDialogView
        pos={pos}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
        isDialogOpen={open}
      />
    </Dialog>
  );
}
