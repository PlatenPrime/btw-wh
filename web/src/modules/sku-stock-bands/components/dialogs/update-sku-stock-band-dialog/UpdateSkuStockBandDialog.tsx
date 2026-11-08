import { Dialog } from "@/components/ui/dialog";
import type { SkuStockBandDto } from "@/modules/sku-stock-bands/api/types";
import { UpdateSkuStockBandDialogView } from "@/modules/sku-stock-bands/components/dialogs/update-sku-stock-band-dialog/UpdateSkuStockBandDialogView";
import { useState } from "react";

interface UpdateSkuStockBandDialogProps {
  band: SkuStockBandDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function UpdateSkuStockBandDialog({
  band,
  open: controlledOpen,
  onOpenChange,
}: UpdateSkuStockBandDialogProps) {
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
      <UpdateSkuStockBandDialogView
        band={band}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
