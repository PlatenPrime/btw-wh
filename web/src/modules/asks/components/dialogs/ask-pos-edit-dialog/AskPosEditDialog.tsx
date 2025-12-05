import { AskPosEditDialogView } from "@/modules/asks/components/dialogs/ask-pos-edit-dialog/AskPosEditDialogView.tsx";
import type { PosResponse } from "@/modules/poses/api/types";
import { useState } from "react";

interface AskPosEditDialogProps {
  pos: PosResponse;
  askId: string;
  trigger?: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  onSuccess?: () => void;
  initialRemovedQuant?: number;
}

export function AskPosEditDialog({
  pos,
  askId,
  trigger,
  open: externalOpen,
  setOpen: externalSetOpen,
  onSuccess,
  initialRemovedQuant,
}: AskPosEditDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalSetOpen || setInternalOpen;

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
      initialRemovedQuant={initialRemovedQuant}
    />
  );
}
