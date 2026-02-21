import { Dialog } from "@/components/ui/dialog";
import type { ProdDto } from "@/modules/prods/api/types";
import { useState } from "react";
import { UpdateProdDialogView } from "./UpdateProdDialogView";

interface UpdateProdDialogProps {
  prod: ProdDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function UpdateProdDialog({
  prod,
  open: controlledOpen,
  onOpenChange,
}: UpdateProdDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const handleSuccess = () => {
    handleOpenChange?.(false);
  };

  const handleCancel = () => {
    handleOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <UpdateProdDialogView
        prod={prod}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
