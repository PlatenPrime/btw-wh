import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { CreateAnalogDialogView } from "./CreateAnalogDialogView";
import { useCreateAnalogDialog } from "./useCreateAnalogDialog";

interface CreateAnalogDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateAnalogDialog({
  open: controlledOpen,
  onOpenChange,
}: CreateAnalogDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { handleSuccess, handleCancel } = useCreateAnalogDialog({
    onOpenChange: handleOpenChange,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <CreateAnalogDialogView
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
