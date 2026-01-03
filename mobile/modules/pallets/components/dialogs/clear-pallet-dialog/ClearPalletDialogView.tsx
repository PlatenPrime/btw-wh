import { FormDialog } from "@/components/shared/form-dialog";
import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { DialogDescription } from "@/components/shared/dialog-description/DialogDescription";
import type { IPallet } from "@/modules/pallets/api/types";

interface ClearPalletDialogViewProps {
  pallet: IPallet;
  visible: boolean;
  onClose: () => void;
  onClear: () => Promise<void>;
  isClearing: boolean;
}

export function ClearPalletDialogView({
  pallet,
  visible,
  onClose,
  onClear,
  isClearing,
}: ClearPalletDialogViewProps) {
  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title={`Видалити всі позиції палети "${pallet.title}"?`}
      footer={
        <DialogActions
          onCancel={onClose}
          onSubmit={onClear}
          cancelText="Скасувати"
          submitText="Видалити"
          isSubmitting={isClearing}
          variant="destructive"
        />
      }
    >
      <DialogDescription>
        Ви впевнені, що хочете видалити всі позиції палети "{pallet.title}"? Цю дію
        неможливо скасувати, вона також призведе до видалення всіх
        пов'язаних позицій.
      </DialogDescription>
    </FormDialog>
  );
}
