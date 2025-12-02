import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { CreateZoneDialogView } from "./CreateZoneDialogView";
import { useCreateZoneDialog } from "./useCreateZoneDialog";

interface CreateZoneDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateZoneDialog({
  open: controlledOpen,
  onOpenChange,
}: CreateZoneDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { handleSuccess, handleCancel } = useCreateZoneDialog({
    onOpenChange: handleOpenChange,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <CreateZoneDialogView onSuccess={handleSuccess} onCancel={handleCancel} />
    </Dialog>
  );
}



