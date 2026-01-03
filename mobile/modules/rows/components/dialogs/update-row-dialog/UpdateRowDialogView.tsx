import { FormDialog } from "@/components/shared/form-dialog";
import { UpdateRowForm } from "@/modules/rows/components/forms/update-row-form/UpdateRowForm";
import type { RowDto } from "@/modules/rows/api/types/dto";

interface UpdateRowDialogViewProps {
  row: RowDto;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function UpdateRowDialogView({
  row,
  visible,
  onClose,
  onSuccess,
}: UpdateRowDialogViewProps) {
  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title="Редагувати ряд"
    >
      <UpdateRowForm row={row} onSuccess={onSuccess} onCancel={onClose} />
    </FormDialog>
  );
}

