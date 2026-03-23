import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SkugrPageDto } from "@/modules/skugrs/api/types";

interface DeleteSkugrDialogViewProps {
  skugr: SkugrPageDto;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export function DeleteSkugrDialogView({
  skugr,
  isDeleting,
  onDelete,
  onCancel,
}: DeleteSkugrDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Видалити товарну групу</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <p className="text-muted-foreground text-sm">
          Ви впевнені, що хочете видалити групу <strong>{skugr.title}</strong>? Цю
          дію неможливо скасувати. Документи товарів (SKU) у базі не видаляються.
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
