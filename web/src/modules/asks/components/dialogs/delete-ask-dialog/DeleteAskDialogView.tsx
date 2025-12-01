import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteAskDialogViewProps {
  artikul: string;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export function DeleteAskDialogView({
  artikul,
  isDeleting,
  onDelete,
  onCancel,
}: DeleteAskDialogViewProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Видалити запит "{artikul}"?</DialogTitle>
        <DialogDescription>
          Ви впевнені, що хочете видалити запит "{artikul}"? Цю дію неможливо
          скасувати.
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
