import type { PosResponse } from "@/modules/poses/api/types";
import { useState } from "react";
import { AskPosEditDialogView } from "@/modules/asks/components/dialogs/ask-pos-edit-dialog/AskPosEditDialogView.tsx";

interface AskPosEditDialogProps {
  pos: PosResponse;
  askId: string;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function AskPosEditDialog({
  pos,
  askId,
  trigger,
  onSuccess,
}: AskPosEditDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <AskPosEditDialogView
      open={open}
      setOpen={setOpen}
      pos={pos}
      askId={askId}
      trigger={trigger}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
