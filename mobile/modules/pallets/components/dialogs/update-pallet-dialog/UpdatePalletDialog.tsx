import { useState } from "react";
import type { PalletShortDto } from "@/modules/pallets/api/types";
import { UpdatePalletDialogView } from "./UpdatePalletDialogView";

interface UpdatePalletDialogProps {
  pallet: PalletShortDto;
  rowId: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function UpdatePalletDialog({
  pallet,
  rowId,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: UpdatePalletDialogProps) {
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
    <UpdatePalletDialogView
      pallet={pallet}
      rowId={rowId}
      visible={open}
      onClose={handleCancel}
      onSuccess={handleSuccess}
    />
  );
}

