import { Dialog } from "@/components/ui/dialog";
import type { User } from "@/modules/auth/api/types";
import { useState } from "react";
import { EditUserDialogView } from "./EditUserDialogView";
import { useEditUserDialog } from "./useEditUserDialog";

interface EditUserDialogProps {
  user: User;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EditUserDialog({
  user,
  open: controlledOpen,
  onOpenChange,
}: EditUserDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { handleSuccess, handleCancel } = useEditUserDialog({
    onOpenChange: handleOpenChange,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <EditUserDialogView
        user={user}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
