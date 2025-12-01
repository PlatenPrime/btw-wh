import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IPallet } from "@/modules/pallets/api/types";

interface DeletePalletEmptyPosesDialogViewProps {
  pallet: IPallet;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export function DeletePalletEmptyPosesDialogView({
  pallet,
  isDeleting,
  onDelete,
  onCancel,
}: DeletePalletEmptyPosesDialogViewProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Видалити порожні позиції палети "{pallet.title}"?
        </DialogTitle>
        <DialogDescription>
          Ви впевнені, що хочете видалити тільки порожні позиції? Цю дію
          неможливо скасувати.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onDelete}
          cancelText="Скасувати"
          submitText="Видалити порожні"
          isSubmitting={isDeleting}
          variant="destructive"
          className="w-full"
        />
      </DialogFooter>
    </DialogContent>
  );
}
