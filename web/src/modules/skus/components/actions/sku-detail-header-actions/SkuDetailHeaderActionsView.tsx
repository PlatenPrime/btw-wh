import type { SkuDto } from "@/modules/skus/api/types";
import { PatchSkuSliceDialog } from "@/modules/skus/components/dialogs/patch-sku-slice-dialog";
import { SkuSalesExcelDialog } from "@/modules/skus/components/dialogs/sku-sales-excel-dialog";
import { SkuSliceExcelDialog } from "@/modules/skus/components/dialogs/sku-slice-excel-dialog";

interface SkuDetailHeaderActionsViewProps {
  sku: SkuDto;
  sliceExcelDialogOpen: boolean;
  onSliceExcelDialogOpenChange: (open: boolean) => void;
  salesExcelDialogOpen: boolean;
  onSalesExcelDialogOpenChange: (open: boolean) => void;
  patchSliceDialogOpen: boolean;
  onPatchSliceDialogOpenChange: (open: boolean) => void;
}

export function SkuDetailHeaderActionsView({
  sku,
  sliceExcelDialogOpen,
  onSliceExcelDialogOpenChange,
  salesExcelDialogOpen,
  onSalesExcelDialogOpenChange,
  patchSliceDialogOpen,
  onPatchSliceDialogOpenChange,
}: SkuDetailHeaderActionsViewProps) {
  return (
    <>
      <SkuSliceExcelDialog
        sku={sku}
        open={sliceExcelDialogOpen}
        onOpenChange={onSliceExcelDialogOpenChange}
      />
      <SkuSalesExcelDialog
        sku={sku}
        open={salesExcelDialogOpen}
        onOpenChange={onSalesExcelDialogOpenChange}
      />
      <PatchSkuSliceDialog
        skuId={sku._id}
        skuTitle={sku.title}
        open={patchSliceDialogOpen}
        onOpenChange={onPatchSliceDialogOpenChange}
      />
    </>
  );
}
