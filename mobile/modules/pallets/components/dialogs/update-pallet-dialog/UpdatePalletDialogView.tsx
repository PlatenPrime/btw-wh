import { FormDialog } from "@/components/shared/dialog/form-dialog";
import type { PalletShortDto } from "@/modules/pallets/api/types";
import { UpdatePalletForm } from "@/modules/pallets/components/forms/update-pallet-form/UpdatePalletForm";

interface UpdatePalletDialogViewProps {
  pallet: PalletShortDto;
  rowId: string;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function UpdatePalletDialogView({
  pallet,
  rowId,
  visible,
  onClose,
  onSuccess,
}: UpdatePalletDialogViewProps) {
  return (
    <FormDialog visible={visible} onClose={onClose} title="Редагувати палету">
      <UpdatePalletForm
        pallet={pallet}
        rowId={rowId}
        onSuccess={onSuccess}
        onCancel={onClose}
      />
    </FormDialog>
  );
}
