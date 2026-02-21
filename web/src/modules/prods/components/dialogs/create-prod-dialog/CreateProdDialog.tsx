import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { CreateProdDialogView } from "./CreateProdDialogView";

interface CreateProdDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateProdDialog({
  open: controlledOpen,
  onOpenChange,
}: CreateProdDialogProps) {
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
      <CreateProdDialogView onSuccess={handleSuccess} onCancel={handleCancel} />
    </Dialog>
  );
}
