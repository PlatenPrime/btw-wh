import { DialogActions } from "@/components/shared/dialog/dialog-actions/DialogActions";
import { DialogDescription } from "@/components/shared/dialog/dialog-description/DialogDescription";
import { FormDialog } from "@/components/shared/dialog/form-dialog";
import type { IPos } from "@/modules/poses/api/types";

interface DeletePosDialogViewProps {
  pos: IPos;
  visible: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
  isDeleting: boolean;
}

export function DeletePosDialogView({
  pos,
  visible,
  onClose,
  onDelete,
  isDeleting,
}: DeletePosDialogViewProps) {
  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title={`Видалити позицію "${pos.artikul}"?`}
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
        Ви впевнені, що хочете видалити позицію "{pos.artikul}"? Цю дію
        неможливо скасувати.
      </DialogDescription>
    </FormDialog>
  );
}
