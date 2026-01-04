import { FormDialog } from "@/components/shared/dialog/form-dialog";
import type { IPos } from "@/modules/poses/api/types";
import { UpdatePosForm } from "@/modules/poses/components/forms/update-pos-form/UpdatePosForm";

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
    <FormDialog visible={visible} onClose={onClose} title={pos.artikul}>
      <UpdatePosForm
        pos={pos}
        onSuccess={onSuccess}
        onCancel={onClose}
        isDialogOpen={visible}
      />
    </FormDialog>
  );
}
