import { CreateSkuStockBandDialog } from "@/modules/sku-stock-bands/components/dialogs/create-sku-stock-band-dialog";

interface SkuStockBandsHeaderActionsViewProps {
  createDialogOpen: boolean;
  onCreateDialogOpenChange: (open: boolean) => void;
}

export function SkuStockBandsHeaderActionsView({
  createDialogOpen,
  onCreateDialogOpenChange,
}: SkuStockBandsHeaderActionsViewProps) {
  return (
    <CreateSkuStockBandDialog
      open={createDialogOpen}
      onOpenChange={onCreateDialogOpenChange}
    />
  );
}
