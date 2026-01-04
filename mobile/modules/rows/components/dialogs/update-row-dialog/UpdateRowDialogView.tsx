import { FormDialog } from "@/components/shared/dialog/form-dialog";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { UpdateRowForm } from "@/modules/rows/components/forms/update-row-form/UpdateRowForm";

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
    <FormDialog visible={visible} onClose={onClose} title="Редагувати ряд">
      <UpdateRowForm row={row} onSuccess={onSuccess} onCancel={onClose} />
    </FormDialog>
  );
}
