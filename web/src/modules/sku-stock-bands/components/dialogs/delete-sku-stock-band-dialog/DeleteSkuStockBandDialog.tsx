import { Dialog } from "@/components/ui/dialog";
import type { SkuStockBandDto } from "@/modules/sku-stock-bands/api/types";
import { DeleteSkuStockBandDialogView } from "@/modules/sku-stock-bands/components/dialogs/delete-sku-stock-band-dialog/DeleteSkuStockBandDialogView";
import { useDeleteSkuStockBandDialog } from "@/modules/sku-stock-bands/components/dialogs/delete-sku-stock-band-dialog/useDeleteSkuStockBandDialog";
import { useState } from "react";

interface DeleteSkuStockBandDialogProps {
  band: SkuStockBandDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteSkuStockBandDialog({
  band,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeleteSkuStockBandDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { isDeleting, handleDelete } = useDeleteSkuStockBandDialog({
    band,
    onSuccess,
  });

  const handleDeleteAndClose = async () => {
    await handleDelete();
    handleOpenChange?.(false);
  };

  const handleCancel = () => {
    handleOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DeleteSkuStockBandDialogView
        band={band}
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
