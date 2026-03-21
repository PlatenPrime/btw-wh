import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { CreateSkugrDialogView } from "./CreateSkugrDialogView";
import { useCreateSkugrDialog } from "./useCreateSkugrDialog";

interface CreateSkugrDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onCreated?: (id: string) => void;
}

export function CreateSkugrDialog({
  open: controlledOpen,
  onOpenChange,
  onCreated,
}: CreateSkugrDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { handleSuccess, handleCancel } = useCreateSkugrDialog({
    onOpenChange: handleOpenChange,
  });

  const handleFormSuccess = (id: string) => {
    onCreated?.(id);
    handleSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <CreateSkugrDialogView
        onSuccess={handleFormSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
