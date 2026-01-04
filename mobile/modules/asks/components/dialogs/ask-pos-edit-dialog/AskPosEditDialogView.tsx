import { FormDialog } from "@/components/shared/dialog/form-dialog";
import { AskPosEditForm } from "@/modules/asks/components/forms/ask-pos-edit-form/AskPosEditForm";
import type { PosResponse } from "@/modules/poses/api/types";

interface AskPosEditDialogViewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  pos: PosResponse;
  askId: string;
  trigger?: React.ReactNode;
  onSuccess: () => void;
  onCancel: () => void;
  initialRemovedQuant?: number;
}

export function AskPosEditDialogView({
  open,
  setOpen,
  pos,
  askId,
  trigger,
  onSuccess,
  onCancel,
  initialRemovedQuant,
}: AskPosEditDialogViewProps) {
  return (
    <FormDialog
      visible={open}
      onClose={() => setOpen(false)}
      title={pos.data?.palletData?.title || ""}
    >
      <AskPosEditForm
        pos={pos}
        askId={askId}
        onSuccess={onSuccess}
        onCancel={onCancel}
        initialRemovedQuant={initialRemovedQuant}
      />
    </FormDialog>
  );
}
