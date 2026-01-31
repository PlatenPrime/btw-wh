import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { CreateUserDialogView } from "./CreateUserDialogView";
import { useCreateUserDialog } from "./useCreateUserDialog";

interface CreateUserDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateUserDialog({
  open: controlledOpen,
  onOpenChange,
}: CreateUserDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { handleSuccess, handleCancel } = useCreateUserDialog({
    onOpenChange: handleOpenChange,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <CreateUserDialogView onSuccess={handleSuccess} onCancel={handleCancel} />
    </Dialog>
  );
}
