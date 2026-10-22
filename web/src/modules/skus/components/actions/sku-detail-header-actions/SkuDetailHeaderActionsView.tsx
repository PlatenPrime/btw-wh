import type { SkuDto } from "@/modules/skus/api/types";
import { CorrectBalunBandSpikeDialog } from "@/modules/skus/components/dialogs/correct-balun-band-spike-dialog";
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
  bandSpikeDialogOpen: boolean;
  onBandSpikeDialogOpenChange: (open: boolean) => void;
  canCorrectBandSpike: boolean;
}

export function SkuDetailHeaderActionsView({
  sku,
  sliceExcelDialogOpen,
  onSliceExcelDialogOpenChange,
  salesExcelDialogOpen,
  onSalesExcelDialogOpenChange,
  patchSliceDialogOpen,
  onPatchSliceDialogOpenChange,
  bandSpikeDialogOpen,
  onBandSpikeDialogOpenChange,
  canCorrectBandSpike,
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
      {canCorrectBandSpike ? (
        <CorrectBalunBandSpikeDialog
          skuId={sku._id}
          skuTitle={sku.title}
          open={bandSpikeDialogOpen}
          onOpenChange={onBandSpikeDialogOpenChange}
        />
      ) : null}
    </>
  );
}
