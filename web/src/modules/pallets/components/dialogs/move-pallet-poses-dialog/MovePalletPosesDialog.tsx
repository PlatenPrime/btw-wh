import type { IPallet } from "@/modules/pallets/api/types";
import { useState } from "react";
import { MovePalletPosesDialogView } from "./MovePalletPosesDialogView";

interface MovePalletPosesDialogProps {
  pallet: IPallet;
}

export function MovePalletPosesDialog({ pallet }: MovePalletPosesDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <MovePalletPosesDialogView
      open={open}
      setOpen={setOpen}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
      pallet={pallet}
    />
  );
}
