import type { IPos } from "@/modules/poses/api/types";
import { useState } from "react";
import { UpdatePosDialogView } from "@/modules/poses/components/dialogs/update-pos-dialog/UpdatePosDialogView.tsx";

interface UpdatePosDialogProps {
  pos: IPos;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function UpdatePosDialog({
  pos,
  trigger,
  onSuccess,
}: UpdatePosDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <UpdatePosDialogView
      open={open}
      setOpen={setOpen}
      pos={pos}
      trigger={trigger}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
