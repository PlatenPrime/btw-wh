import { FormDialog } from "@/components/shared/form-dialog";
import { UpdatePosForm } from "@/modules/poses/components/forms/update-pos-form/UpdatePosForm";
import type { IPos } from "@/modules/poses/api/types";

interface UpdatePosDialogViewProps {
  pos: IPos;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function UpdatePosDialogView({
  pos,
  visible,
  onClose,
  onSuccess,
}: UpdatePosDialogViewProps) {
  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title={pos.artikul}
    >
      <UpdatePosForm pos={pos} onSuccess={onSuccess} onCancel={onClose} isDialogOpen={visible} />
    </FormDialog>
  );
}

