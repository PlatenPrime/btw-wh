import { useState } from "react";
import type { IPos } from "@/modules/poses/api/types";
import { UpdatePosDialogView } from "./UpdatePosDialogView";
import { useUpdatePosDialog } from "./useUpdatePosDialog";

interface UpdatePosDialogProps {
  pos: IPos;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function UpdatePosDialog({
  pos,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
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
    <UpdatePosDialogView
      pos={pos}
      visible={open}
      onClose={handleCancel}
      onSuccess={handleSuccess}
    />
  );
}

