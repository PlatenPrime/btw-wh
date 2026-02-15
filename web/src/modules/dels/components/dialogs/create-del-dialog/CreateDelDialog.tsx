import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { CreateDelDialogView } from "./CreateDelDialogView";

interface CreateDelDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateDelDialog({
  open: controlledOpen,
  onOpenChange,
}: CreateDelDialogProps) {
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
      <CreateDelDialogView onSuccess={handleSuccess} onCancel={handleCancel} />
    </Dialog>
  );
}
