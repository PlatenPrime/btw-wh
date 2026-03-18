import { Dialog } from "@/components/ui/dialog";
import type { VariantDto } from "@/modules/variants/api/types";
import { useState } from "react";
import { UpdateVariantDialogView } from "./UpdateVariantDialogView";
import { useUpdateVariantDialog } from "./useUpdateVariantDialog";

interface UpdateVariantDialogProps {
  variant: VariantDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function UpdateVariantDialog({
  variant,
  open: controlledOpen,
  onOpenChange,
}: UpdateVariantDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { handleSuccess, handleCancel } = useUpdateVariantDialog({
    onOpenChange: handleOpenChange,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <UpdateVariantDialogView
        variant={variant}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}

