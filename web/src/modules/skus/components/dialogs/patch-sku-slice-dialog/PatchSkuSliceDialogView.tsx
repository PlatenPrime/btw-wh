import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  PatchSkuSliceForm,
  type PatchSkuSliceFormInitialValues,
} from "@/modules/skus/components/forms/patch-sku-slice-form";

interface PatchSkuSliceDialogViewProps {
  skuId: string;
  skuTitle: string;
  isActive: boolean;
  initialValues?: PatchSkuSliceFormInitialValues;
  onSuccess: () => void;
  onCancel: () => void;
}

export function PatchSkuSliceDialogView({
  skuId,
  skuTitle,
  isActive,
  initialValues,
  onSuccess,
  onCancel,
}: PatchSkuSliceDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle>Виправити зріз</DialogTitle>
      </DialogHeader>
      <PatchSkuSliceForm
        skuId={skuId}
        skuTitle={skuTitle}
        isActive={isActive}
        initialValues={initialValues}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </DialogContent>
  );
}
