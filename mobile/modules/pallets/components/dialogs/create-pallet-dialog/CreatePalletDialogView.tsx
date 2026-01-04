import { DialogActions } from "@/components/shared/dialog/dialog-actions/DialogActions";
import { FormDialog } from "@/components/shared/dialog/form-dialog";
import { CreatePalletFormView } from "@/modules/pallets/components/forms/create-pallet-form/CreatePalletFormView";
import type { PalletFormValues } from "@/modules/pallets/components/forms/schema";
import type { UseFormReturn } from "react-hook-form";

interface CreatePalletDialogViewProps {
  visible: boolean;
  onClose: () => void;
  form: UseFormReturn<PalletFormValues>;
  onSubmit: (data: PalletFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export function CreatePalletDialogView({
  visible,
  onClose,
  form,
  onSubmit,
  isSubmitting,
}: CreatePalletDialogViewProps) {
  const { handleSubmit } = form;

  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title="Додати палету"
      footer={
        <DialogActions
          onCancel={onClose}
          onSubmit={handleSubmit(onSubmit)}
          cancelText="Скасувати"
          submitText="Додати"
          isSubmitting={isSubmitting}
          variant="create"
        />
      }
    >
      <CreatePalletFormView
        form={form}
        onSubmit={onSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
        hideActions={true}
      />
    </FormDialog>
  );
}
