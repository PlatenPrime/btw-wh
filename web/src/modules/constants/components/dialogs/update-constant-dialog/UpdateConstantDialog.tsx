import { Dialog } from "@/components/ui/dialog";
import type { ConstantDto } from "@/modules/constants/api/types";
import { useState } from "react";
import { UpdateConstantDialogView } from "./UpdateConstantDialogView";

interface UpdateConstantDialogProps {
  constant: ConstantDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function UpdateConstantDialog({
  constant,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: UpdateConstantDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const handleSuccess = () => {
    onSuccess?.();
    handleOpenChange?.(false);
  };

  const handleCancel = () => {
    handleOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <UpdateConstantDialogView
        constant={constant}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
