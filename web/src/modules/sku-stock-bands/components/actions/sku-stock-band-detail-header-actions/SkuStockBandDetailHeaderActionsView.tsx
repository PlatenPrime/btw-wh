import type { SkuStockBandDto } from "@/modules/sku-stock-bands/api/types";
import { DeleteSkuStockBandDialog } from "@/modules/sku-stock-bands/components/dialogs/delete-sku-stock-band-dialog";
import { UpdateSkuStockBandDialog } from "@/modules/sku-stock-bands/components/dialogs/update-sku-stock-band-dialog";

interface SkuStockBandDetailHeaderActionsViewProps {
  band: SkuStockBandDto;
  updateDialogOpen: boolean;
  onUpdateDialogOpenChange: (open: boolean) => void;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  onDeleteSuccess: () => void;
}

export function SkuStockBandDetailHeaderActionsView({
  band,
  updateDialogOpen,
  onUpdateDialogOpenChange,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  onDeleteSuccess,
}: SkuStockBandDetailHeaderActionsViewProps) {
  return (
    <>
      <UpdateSkuStockBandDialog
        band={band}
        open={updateDialogOpen}
        onOpenChange={onUpdateDialogOpenChange}
      />
      <DeleteSkuStockBandDialog
        band={band}
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
        onSuccess={onDeleteSuccess}
      />
    </>
  );
}
