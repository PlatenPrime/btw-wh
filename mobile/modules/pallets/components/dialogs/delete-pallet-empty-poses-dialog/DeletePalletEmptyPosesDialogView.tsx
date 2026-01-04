import { DialogActions } from "@/components/shared/dialog/dialog-actions/DialogActions";
import { DialogDescription } from "@/components/shared/dialog/dialog-description/DialogDescription";
import { FormDialog } from "@/components/shared/dialog/form-dialog";
import type { IPallet } from "@/modules/pallets/api/types";

interface DeletePalletEmptyPosesDialogViewProps {
  pallet: IPallet;
  visible: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
  isDeleting: boolean;
}

export function DeletePalletEmptyPosesDialogView({
  pallet,
  visible,
  onClose,
  onDelete,
  isDeleting,
}: DeletePalletEmptyPosesDialogViewProps) {
  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title="Очистити порожні позиції?"
      footer={
        <DialogActions
          onCancel={onClose}
          onSubmit={onDelete}
          cancelText="Скасувати"
          submitText="Очистити порожні"
          isSubmitting={isDeleting}
          variant="destructive"
        />
      }
    >
      <DialogDescription>
        Ви впевнені, що хочете очистити порожні позиції палети "{pallet.title}"?
        Цю дію неможливо скасувати.
      </DialogDescription>
    </FormDialog>
  );
}
