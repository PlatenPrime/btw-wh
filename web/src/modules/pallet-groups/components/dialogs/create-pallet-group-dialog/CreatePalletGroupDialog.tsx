import { Dialog } from "@/components/ui/dialog";
import { CreatePalletGroupDialogView } from "@/modules/pallet-groups/components/dialogs/create-pallet-group-dialog/CreatePalletGroupDialogView";
import { useCreatePalletGroupDialog } from "@/modules/pallet-groups/components/dialogs/create-pallet-group-dialog/useCreatePalletGroupDialog";
import { useState } from "react";

interface CreatePalletGroupDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreatePalletGroupDialog({
  open: controlledOpen,
  onOpenChange,
}: CreatePalletGroupDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { handleSuccess, handleCancel } = useCreatePalletGroupDialog({
    onOpenChange: handleOpenChange,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <CreatePalletGroupDialogView
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
