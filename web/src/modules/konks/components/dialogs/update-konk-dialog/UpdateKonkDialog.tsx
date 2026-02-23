import { Dialog } from "@/components/ui/dialog";
import type { KonkDto } from "@/modules/konks/api/types";
import { useState } from "react";
import { UpdateKonkDialogView } from "./UpdateKonkDialogView";

interface UpdateKonkDialogProps {
  konk: KonkDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function UpdateKonkDialog({
  konk,
  open: controlledOpen,
  onOpenChange,
}: UpdateKonkDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const handleSuccess = () => {
    handleOpenChange?.(false);
  };

  const handleCancel = () => {
    handleOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <UpdateKonkDialogView
        konk={konk}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
