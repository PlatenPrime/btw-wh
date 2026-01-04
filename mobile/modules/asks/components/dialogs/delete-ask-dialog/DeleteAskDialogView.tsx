import { DialogActions } from "@/components/shared/dialog/dialog-actions/DialogActions";
import { FormDialog } from "@/components/shared/dialog/form-dialog";
import { ThemedText } from "@/components/themed/themed-text";

interface DeleteAskDialogViewProps {
  artikul: string;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
  visible: boolean;
}

export function DeleteAskDialogView({
  artikul,
  isDeleting,
  onDelete,
  onCancel,
  visible,
}: DeleteAskDialogViewProps) {
  return (
    <FormDialog
      visible={visible}
      onClose={onCancel}
      title={`Видалити запит ${artikul}?`}
      footer={
        <DialogActions
          onCancel={onCancel}
          onSubmit={onDelete}
          cancelText="Скасувати"
          submitText="Видалити"
          isSubmitting={isDeleting}
          variant="destructive"
        />
      }
    >
      <ThemedText type="default" className="text-sm opacity-70">
        Ви впевнені, що хочете видалити запит {artikul}? Цю дію неможливо
        скасувати.
      </ThemedText>
    </FormDialog>
  );
}
