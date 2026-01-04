import { DialogActions } from "@/components/shared/dialog/dialog-actions/DialogActions";
import { DialogDescription } from "@/components/shared/dialog/dialog-description/DialogDescription";
import { FormDialog } from "@/components/shared/dialog/form-dialog";
import type { ZoneDto } from "@/modules/zones/api/types/dto";

interface DeleteZoneDialogViewProps {
  zone: ZoneDto;
  visible: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
  isDeleting: boolean;
}

export function DeleteZoneDialogView({
  zone,
  visible,
  onClose,
  onDelete,
  isDeleting,
}: DeleteZoneDialogViewProps) {
  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title={`Видалити зону "${zone.title}"?`}
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
        Ви впевнені, що хочете видалити зону "{zone.title}"? Цю дію неможливо
        скасувати.
      </DialogDescription>
    </FormDialog>
  );
}
