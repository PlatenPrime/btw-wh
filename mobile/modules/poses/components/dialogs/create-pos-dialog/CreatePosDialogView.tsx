import { FormDialog } from "@/components/shared/form-dialog";
import { CreatePosForm } from "@/modules/poses/components/forms/create-pos-form/CreatePosForm";
import { CreatePosFormWithActions } from "./CreatePosFormWithActions";
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
    <CreatePosFormWithActions
      visible={visible}
      onClose={onClose}
      onSuccess={onSuccess}
      pallet={pallet}
    />
  );
}

