import { Dialog } from "@/components/ui/dialog";
import type { PatchSkuSliceFormInitialValues } from "@/modules/skus/components/forms/patch-sku-slice-form";
import { useState } from "react";
import { PatchSkuSliceDialogView } from "./PatchSkuSliceDialogView";
import { usePatchSkuSliceDialog } from "./usePatchSkuSliceDialog";

interface PatchSkuSliceDialogProps {
  skuId: string;
  skuTitle: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialValues?: PatchSkuSliceFormInitialValues;
}

export function PatchSkuSliceDialog({
  skuId,
  skuTitle,
  open: controlledOpen,
  onOpenChange,
  initialValues,
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
        skuId={skuId}
        skuTitle={skuTitle}
        isActive={open}
        initialValues={initialValues}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
