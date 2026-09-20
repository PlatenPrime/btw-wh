import { Dialog } from "@/components/ui/dialog";
import type { SkuDto } from "@/modules/skus/api/types";
import { useState } from "react";
import { PatchSkuSliceDialogView } from "./PatchSkuSliceDialogView";
import { usePatchSkuSliceDialog } from "./usePatchSkuSliceDialog";

interface PatchSkuSliceDialogProps {
  sku: SkuDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function PatchSkuSliceDialog({
  sku,
  open: controlledOpen,
  onOpenChange,
}: PatchSkuSliceDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const { handleSuccess, handleCancel } = usePatchSkuSliceDialog({
    onOpenChange: handleOpenChange,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <PatchSkuSliceDialogView
        skuId={sku._id}
        skuTitle={sku.title}
        isActive={open}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
