import { FormDialog } from "@/components/shared/dialog/form-dialog";
import { CreateRowForm } from "@/modules/rows/components/forms/create-row-form/CreateRowForm";

interface CreateRowDialogViewProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateRowDialogView({
  visible,
  onClose,
  onSuccess,
}: CreateRowDialogViewProps) {
  return (
    <FormDialog visible={visible} onClose={onClose} title="Створити ряд">
      <CreateRowForm onSuccess={onSuccess} onCancel={onClose} />
    </FormDialog>
  );
}
