import { Dialog } from "@/components/ui/dialog";
import { CreateSkuStockBandDialogView } from "@/modules/sku-stock-bands/components/dialogs/create-sku-stock-band-dialog/CreateSkuStockBandDialogView";
import { useState } from "react";

interface CreateSkuStockBandDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateSkuStockBandDialog({
  open: controlledOpen,
  onOpenChange,
}: CreateSkuStockBandDialogProps) {
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
      <CreateSkuStockBandDialogView
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
