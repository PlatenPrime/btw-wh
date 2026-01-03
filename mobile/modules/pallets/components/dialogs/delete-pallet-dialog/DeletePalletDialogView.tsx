import { FormDialog } from "@/components/shared/form-dialog";
import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { DialogDescription } from "@/components/shared/dialog-description/DialogDescription";
import type { IPallet } from "@/modules/pallets/api/types";

interface DeletePalletDialogViewProps {
  pallet: IPallet;
  visible: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
  isDeleting: boolean;
}

export function DeletePalletDialogView({
  pallet,
  visible,
  onClose,
  onDelete,
  isDeleting,
}: DeletePalletDialogViewProps) {
  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title={`Видалити палету "${pallet.title}"?`}
      footer={
        <DialogActions
          onCancel={onClose}
          onSubmit={onDelete}
          cancelText="Скасувати"
          submitText="Видалити"
          isSubmitting={isDeleting}
          variant="destructive"
        />
      }
    >
      <DialogDescription>
        Ви впевнені, що хочете видалити палету "{pallet.title}"? Цю дію
        неможливо скасувати, вона також призведе до видалення всіх
        пов'язаних позицій.
      </DialogDescription>
    </FormDialog>
  );
}

