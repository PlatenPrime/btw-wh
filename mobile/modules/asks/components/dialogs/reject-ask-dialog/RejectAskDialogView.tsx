import { DialogActions } from "@/components/shared/dialog/dialog-actions/DialogActions";
import { FormDialog } from "@/components/shared/dialog/form-dialog";
import { ThemedText } from "@/components/themed/themed-text";

interface RejectAskDialogViewProps {
  artikul: string;
  isRejecting: boolean;
  onReject: () => Promise<void>;
  onCancel: () => void;
  visible: boolean;
}

export function RejectAskDialogView({
  artikul,
  isRejecting,
  onReject,
  onCancel,
  visible,
}: RejectAskDialogViewProps) {
  return (
    <FormDialog
      visible={visible}
      onClose={onCancel}
      title={`Відмовити на запит "${artikul}"?`}
      footer={
        <DialogActions
          onCancel={onCancel}
          onSubmit={onReject}
          cancelText="Скасувати"
          submitText="Відмовити"
          isSubmitting={isRejecting}
          variant="destructive"
        />
      }
    >
      <ThemedText type="default" className="text-sm opacity-70">
        Ви впевнені, що хочете відмовити на запит "{artikul}"? Ця дія змінить
        статус запиту на "відмовлено".
      </ThemedText>
    </FormDialog>
  );
}
