import { DialogActions } from "@/components/shared/dialogs";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { typography } from "@/lib/typography";
import type { SkuStockBandDto } from "@/modules/sku-stock-bands/api/types";

interface DeleteSkuStockBandDialogViewProps {
  band: SkuStockBandDto;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

const numberFormat = new Intl.NumberFormat("uk-UA", {
  maximumFractionDigits: 0,
});

export function DeleteSkuStockBandDialogView({
  band,
  isDeleting,
  onDelete,
  onCancel,
}: DeleteSkuStockBandDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Видалити діапазон</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <p className={typography.pageDescription}>
          Видалити діапазон{" "}
          <strong>
            {band.konk.title} · {numberFormat.format(band.stockMin)}–
            {numberFormat.format(band.stockMax)}
          </strong>
          ? Цю дію неможливо скасувати.
        </p>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onDelete}
          isSubmitting={isDeleting}
          submitText="Видалити"
          variant="destructive"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}
