import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { CreateKonkDialogView } from "./CreateKonkDialogView";

interface CreateKonkDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateKonkDialog({
  open: controlledOpen,
  onOpenChange,
}: CreateKonkDialogProps) {
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
      <CreateKonkDialogView onSuccess={handleSuccess} onCancel={handleCancel} />
    </Dialog>
  );
}
