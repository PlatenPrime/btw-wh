import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IPallet } from "@/modules/pallets/api/types";

interface ClearPalletDialogViewProps {
  pallet: IPallet;
  isClearing: boolean;
  onClear: () => Promise<void>;
  onCancel: () => void;
}

export function ClearPalletDialogView({
  pallet,
  isClearing,
  onClear,
  onCancel,
}: ClearPalletDialogViewProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Очистити палету "{pallet.title}"?</DialogTitle>
        <DialogDescription>
          Ви впевнені, що хочете очистити палету "{pallet.title}"? Цю дію
          неможливо скасувати, вона також призведе до видалення всіх
          пов'язаних позицій.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onClear}
          cancelText="Скасувати"
          submitText="Очистити"
          isSubmitting={isClearing}
          variant="destructive"
          className="w-full"
        />
      </DialogFooter>
    </DialogContent>
  );
}
