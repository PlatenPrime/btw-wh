import { FormDialog } from "@/components/shared/form-dialog";
import { CreatePosForm } from "@/modules/poses/components/forms/create-pos-form/CreatePosForm";
import { CreatePosFormWithActions } from "./CreatePosFormWithActions";

interface CreatePosDialogViewProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  pallet: { _id: string; row: string; poses: any[] };
}

export function CreatePosDialogView({
  visible,
  onClose,
  onSuccess,
  pallet,
}: CreatePosDialogViewProps) {
  return (
    <CreatePosFormWithActions
      visible={visible}
      onClose={onClose}
      onSuccess={onSuccess}
      pallet={pallet}
    />
  );
}

