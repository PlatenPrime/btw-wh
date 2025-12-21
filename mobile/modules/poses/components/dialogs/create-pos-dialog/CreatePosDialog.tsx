import { useState } from "react";
import type { IPallet } from "@/modules/pallets/api/types";
import { CreatePosDialogView } from "./CreatePosDialogView";

interface CreatePosDialogProps {
  pallet: IPallet;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreatePosDialog({
  pallet,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: CreatePosDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const handleSuccess = () => {
    handleOpenChange?.(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    handleOpenChange?.(false);
  };

  return (
    <CreatePosDialogView
      visible={open}
      onClose={handleCancel}
      onSuccess={handleSuccess}
      pallet={pallet}
    />
  );
}

