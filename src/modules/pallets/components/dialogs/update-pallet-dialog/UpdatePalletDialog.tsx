import type { PalletShortDto } from "@/modules/rows/api/types/dto";
import { useState } from "react";
import { UpdatePalletDialogView } from "./UpdatePalletDialogView";

interface UpdatePalletDialogProps {
  pallet: PalletShortDto;
  rowId: string;
  trigger?: React.ReactNode;
  onSuccess: () => void;
}

export function UpdatePalletDialog({
  pallet,
  rowId,
  trigger,
  onSuccess,
}: UpdatePalletDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    onSuccess();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <UpdatePalletDialogView
      open={open}
      setOpen={setOpen}
      pallet={pallet}
      rowId={rowId}
      trigger={trigger}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
