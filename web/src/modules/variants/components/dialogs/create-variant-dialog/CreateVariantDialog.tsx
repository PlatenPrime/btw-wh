import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { CreateVariantDialogView } from "./CreateVariantDialogView";
import { useCreateVariantDialog } from "./useCreateVariantDialog";

interface CreateVariantDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateVariantDialog({
  open: controlledOpen,
  onOpenChange,
}: CreateVariantDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { handleSuccess, handleCancel } = useCreateVariantDialog({
    onOpenChange: handleOpenChange,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <CreateVariantDialogView
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}

