import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SkuStockBandDto } from "@/modules/sku-stock-bands/api/types";
import { UpdateSkuStockBandForm } from "@/modules/sku-stock-bands/components/forms/update-sku-stock-band-form";

interface UpdateSkuStockBandDialogViewProps {
  band: SkuStockBandDto;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpdateSkuStockBandDialogView({
  band,
  onSuccess,
  onCancel,
}: UpdateSkuStockBandDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[560px]">
      <DialogHeader>
        <DialogTitle>Редагувати діапазон</DialogTitle>
      </DialogHeader>
      <UpdateSkuStockBandForm
        band={band}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </DialogContent>
  );
}
