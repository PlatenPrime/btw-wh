import { FormDialog } from "@/components/shared/form-dialog";
import { CreateZoneForm } from "@/modules/zones/components/forms/create-zone-form/CreateZoneForm";

interface CreateZoneDialogViewProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateZoneDialogView({
  visible,
  onClose,
  onSuccess,
}: CreateZoneDialogViewProps) {
  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title="Створити зону"
    >
      <CreateZoneForm onSuccess={onSuccess} onCancel={onClose} />
    </FormDialog>
  );
}

