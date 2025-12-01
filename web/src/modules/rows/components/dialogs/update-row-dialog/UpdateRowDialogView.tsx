import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { UpdateRowForm } from "@/modules/rows/components/forms/update-row-form/UpdateRowForm";

interface UpdateRowDialogViewProps {
  row: RowDto;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpdateRowDialogView({
  row,
  onSuccess,
  onCancel,
}: UpdateRowDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Редагувати</DialogTitle>
      </DialogHeader>
      <UpdateRowForm row={row} onSuccess={onSuccess} onCancel={onCancel} />
    </DialogContent>
  );
}
