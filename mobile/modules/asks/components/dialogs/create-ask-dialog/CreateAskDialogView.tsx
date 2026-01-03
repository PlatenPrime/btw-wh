import { FormDialog } from "@/components/shared/form-dialog";
import { CreateAskForm } from "@/modules/asks/components/forms/create-ask-form/CreateAskForm";

interface CreateAskDialogViewProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  preFilledArtikul?: string;
}

export function CreateAskDialogView({
  visible,
  onClose,
  onSuccess,
  preFilledArtikul,
}: CreateAskDialogViewProps) {
  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title="Створити запит"
    >
      <CreateAskForm
        onSuccess={onSuccess}
        onCancel={onClose}
        preFilledArtikul={preFilledArtikul}
      />
    </FormDialog>
  );
}

