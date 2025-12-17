import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { UpdateAllBtradeStocksDialogView } from "./UpdateAllBtradeStocksDialogView";
import { useUpdateAllBtradeStocksDialog } from "./useUpdateAllBtradeStocksDialog";

interface UpdateAllBtradeStocksDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function UpdateAllBtradeStocksDialog({
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: UpdateAllBtradeStocksDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const { isUpdating, handleUpdate } = useUpdateAllBtradeStocksDialog({
    onSuccess,
  });

  const handleUpdateAndClose = async () => {
    await handleUpdate();
    handleOpenChange(false);
  };

  const handleCancel = () => {
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <UpdateAllBtradeStocksDialogView
        isUpdating={isUpdating}
        onUpdate={handleUpdateAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}

