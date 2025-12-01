import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IPallet } from "@/modules/pallets/api/types";

interface DeletePalletDialogViewProps {
  pallet: IPallet;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export function DeletePalletDialogView({
  pallet,
  isDeleting,
  onDelete,
  onCancel,
}: DeletePalletDialogViewProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Видалити палету "{pallet.title}"?</DialogTitle>
        <DialogDescription>
          Ви впевнені, що хочете видалити палету "{pallet.title}"? Цю дію
          неможливо скасувати, вона також призведе до видалення всіх
          пов'язаних позицій.
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
