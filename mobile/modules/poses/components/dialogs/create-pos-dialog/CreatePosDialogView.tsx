import { FormDialog } from "@/components/shared/form-dialog";
import { CreatePosForm } from "@/modules/poses/components/forms/create-pos-form/CreatePosForm";
import type { IPallet } from "@/modules/pallets/api/types";

interface CreatePosDialogViewProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  pallet: IPallet;
}

export function CreatePosDialogView({
  visible,
  onClose,
  onSuccess,
  pallet,
}: CreatePosDialogViewProps) {
  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title="Створити нову позицію"
    >
      <CreatePosForm pallet={pallet} onSuccess={onSuccess} onCancel={onClose} />
    </FormDialog>
  );
}

