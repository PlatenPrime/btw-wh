import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { CreateBlockDialogView } from "./CreateBlockDialogView";
import { useCreateBlockDialog } from "./useCreateBlockDialog";

interface CreateBlockDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateBlockDialog({
  open: controlledOpen,
  onOpenChange,
}: CreateBlockDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { handleSuccess, handleCancel } = useCreateBlockDialog({
    onOpenChange: handleOpenChange,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <CreateBlockDialogView
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
