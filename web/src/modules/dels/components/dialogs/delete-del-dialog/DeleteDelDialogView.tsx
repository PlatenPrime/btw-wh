import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { DelListItemDto } from "@/modules/dels/api/types";

interface DeleteDelDialogViewProps {
  del: DelListItemDto;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export function DeleteDelDialogView({
  del,
  isDeleting,
  onDelete,
  onCancel,
}: DeleteDelDialogViewProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Видалити поставку "{del.title}"?</DialogTitle>
        <DialogDescription>
          Ви впевнені, що хочете видалити поставку "{del.title}"? Цю дію
          неможливо скасувати.
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
