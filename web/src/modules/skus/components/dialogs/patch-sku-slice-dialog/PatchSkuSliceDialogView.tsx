import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PatchSkuSliceForm } from "@/modules/skus/components/forms/patch-sku-slice-form";

interface PatchSkuSliceDialogViewProps {
  skuId: string;
  skuTitle: string;
  isActive: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

export function PatchSkuSliceDialogView({
  skuId,
  skuTitle,
  isActive,
  onSuccess,
  onCancel,
}: PatchSkuSliceDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Виправити зріз</DialogTitle>
      </DialogHeader>
      <PatchSkuSliceForm
        skuId={skuId}
        skuTitle={skuTitle}
        isActive={isActive}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </DialogContent>
  );
}
