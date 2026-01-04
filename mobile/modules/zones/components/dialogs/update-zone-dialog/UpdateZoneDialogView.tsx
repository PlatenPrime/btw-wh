import { FormDialog } from "@/components/shared/dialog/form-dialog";
import type { ZoneDto } from "@/modules/zones/api/types/dto";
import { UpdateZoneForm } from "@/modules/zones/components/forms/update-zone-form/UpdateZoneForm";

interface UpdateZoneDialogViewProps {
  zone: ZoneDto;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function UpdateZoneDialogView({
  zone,
  visible,
  onClose,
  onSuccess,
}: UpdateZoneDialogViewProps) {
  return (
    <FormDialog visible={visible} onClose={onClose} title="Редагувати зону">
      <UpdateZoneForm zone={zone} onSuccess={onSuccess} onCancel={onClose} />
    </FormDialog>
  );
}
