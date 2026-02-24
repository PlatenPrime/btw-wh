import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { CreateConstantDialogView } from "./CreateConstantDialogView";

interface CreateConstantDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateConstantDialog({
  open: controlledOpen,
  onOpenChange,
}: CreateConstantDialogProps) {
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
      <CreateConstantDialogView onSuccess={handleSuccess} onCancel={handleCancel} />
    </Dialog>
  );
}
