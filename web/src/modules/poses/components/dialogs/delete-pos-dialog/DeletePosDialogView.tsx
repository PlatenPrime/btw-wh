import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IPos } from "@/modules/poses/api/types";

interface DeletePosDialogViewProps {
  pos: IPos;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export function DeletePosDialogView({
  pos,
  isDeleting,
  onDelete,
  onCancel,
}: DeletePosDialogViewProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Видалити позицію "{pos.artikul}"?</DialogTitle>
        <DialogDescription>
          Ви впевнені, що хочете видалити позицію "{pos.artikul}"? Цю дію
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
