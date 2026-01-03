import { FormDialog } from "@/components/shared/form-dialog";
import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { DialogDescription } from "@/components/shared/dialog-description/DialogDescription";
import type { RowDto } from "@/modules/rows/api/types/dto";

interface DeleteRowDialogViewProps {
  row: RowDto;
  visible: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
  isDeleting: boolean;
}

export function DeleteRowDialogView({
  row,
  visible,
  onClose,
  onDelete,
  isDeleting,
}: DeleteRowDialogViewProps) {
  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title={`Видалити ряд "${row.title}"?`}
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
        Ви впевнені, що хочете видалити ряд "{row.title}"? Цю дію
        неможливо скасувати, вона також призведе до видалення всіх
        пов'язаних палет та позицій.
      </DialogDescription>
    </FormDialog>
  );
}

