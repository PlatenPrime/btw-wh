import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { RowDto } from "@/modules/rows/api/types/dto";

interface DeleteRowDialogViewProps {
  row: RowDto;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export function DeleteRowDialogView({
  row,
  isDeleting,
  onDelete,
  onCancel,
}: DeleteRowDialogViewProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Видалити ряд "{row.title}"?</DialogTitle>
        <DialogDescription>
          Ви впевнені, що хочете видалити ряд "{row.title}"? Цю дію неможливо
          скасувати, вона також призведе до видалення всіх пов'язаних палет та
          позицій.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onDelete}
          cancelText="Скасувати"
          submitText="Видалити"
          isSubmitting={isDeleting}
          variant="destructive"
          className="w-full"
        />
      </DialogFooter>
    </DialogContent>
  );
}
