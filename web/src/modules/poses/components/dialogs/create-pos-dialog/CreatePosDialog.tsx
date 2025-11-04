import type { IPallet } from "@/modules/pallets/api/types";
import { CreatePosDialogView } from "@/modules/poses/components/dialogs/create-pos-dialog/CreatePosDialogView.tsx";
import { useState } from "react";

interface CreatePosDialogProps {
  pallet: IPallet;
  trigger?: React.ReactNode;
  showTrigger?: boolean; // Показывать ли триггер (по умолчанию true)
  onSuccess?: () => void;
}

export function CreatePosDialog({
  pallet,
  trigger,
  showTrigger = true,
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
      showTrigger={showTrigger}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
