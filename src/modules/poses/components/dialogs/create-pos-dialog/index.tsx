import type { IPallet } from "@/modules/pallets/api/types";
import { useState } from "react";
import { CreatePosDialogView } from "./view";

interface CreatePosDialogProps {
  pallet: IPallet;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function CreatePosDialog({
  pallet,
  trigger,
  onSuccess,
}: CreatePosDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <CreatePosDialogView
      open={open}
      setOpen={setOpen}
      pallet={pallet}
      trigger={trigger}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
