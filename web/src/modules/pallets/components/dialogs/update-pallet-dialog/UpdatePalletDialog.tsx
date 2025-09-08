import type { PalletShortDto } from "@/modules/pallets/api/types";
import { useState } from "react";
import { UpdatePalletDialogView } from "./UpdatePalletDialogView";

interface UpdatePalletDialogProps {
  pallet: PalletShortDto;
  rowId: string;
  trigger?: React.ReactNode;
}

export function UpdatePalletDialog({
  pallet,
  rowId,
  trigger,
}: UpdatePalletDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
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
