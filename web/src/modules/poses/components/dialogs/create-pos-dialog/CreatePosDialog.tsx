import type { IPallet } from "@/modules/pallets/api/types";
import { CreatePosDialogView } from "@/modules/poses/components/dialogs/create-pos-dialog/CreatePosDialogView.tsx";
import { useState } from "react";

interface CreatePosDialogProps {
  pallet: IPallet;
  trigger?: React.ReactNode;
  onSuccess?: (newPosId?: string) => void;
}

export function CreatePosDialog({
  pallet,
  trigger,
  onSuccess,
}: CreatePosDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = (newPosId?: string) => {
    setOpen(false);
    onSuccess?.(newPosId);
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
