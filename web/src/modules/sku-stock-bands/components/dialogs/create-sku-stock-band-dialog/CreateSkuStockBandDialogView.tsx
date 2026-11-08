import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateSkuStockBandForm } from "@/modules/sku-stock-bands/components/forms/create-sku-stock-band-form";

interface CreateSkuStockBandDialogViewProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateSkuStockBandDialogView({
  onSuccess,
  onCancel,
}: CreateSkuStockBandDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[560px]">
      <DialogHeader>
        <DialogTitle>Створити діапазон</DialogTitle>
      </DialogHeader>
      <CreateSkuStockBandForm onSuccess={onSuccess} onCancel={onCancel} />
    </DialogContent>
  );
}
