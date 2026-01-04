import { DialogActions } from "@/components/shared/dialog/dialog-actions/DialogActions";
import { FormDialog } from "@/components/shared/dialog/form-dialog";
import { ThemedText } from "@/components/themed/themed-text";
import { Box } from "@/components/ui/box";
import type { IPallet } from "@/modules/pallets/api/types";
import { useState } from "react";
import { MovePalletPosesForm } from "../../dialogs/move-pallet-poses-form/MovePalletPosesForm";

interface MovePalletPosesDialogViewProps {
  pallet: IPallet;
  visible: boolean;
  onClose: () => void;
  onSubmit: (targetPalletId: string) => Promise<void>;
  isSourceEmpty: boolean;
  mutationError: string | null;
  isMoving: boolean;
}

export function MovePalletPosesDialogView({
  pallet,
  visible,
  onClose,
  onSubmit,
  isSourceEmpty,
  mutationError,
  isMoving,
}: MovePalletPosesDialogViewProps) {
  const [submitFn, setSubmitFn] = useState<(() => void) | null>(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleSubmitReady = (fn: () => void, disabled: boolean) => {
    setSubmitFn(() => fn);
    setIsSubmitDisabled(disabled);
  };

  const handleDialogSubmit = () => {
    if (submitFn && !isSubmitDisabled) {
      submitFn();
    }
  };

  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title="Перемістити позиції"
      footer={
        !isSourceEmpty ? (
          <DialogActions
            onCancel={onClose}
            onSubmit={handleDialogSubmit}
            cancelText="Скасувати"
            submitText="Підтвердити"
            isSubmitting={isMoving}
            isDisabled={isSubmitDisabled}
            variant="confirm"
          />
        ) : undefined
      }
    >
      {mutationError && (
        <Box className="mb-4 p-3 rounded-lg border border-error-500 bg-error-50">
          <ThemedText type="default" className="text-error-700">
            {mutationError}
          </ThemedText>
        </Box>
      )}

      {isSourceEmpty ? (
        <ThemedText type="default" className="text-sm mb-4">
          На цій паллеті немає позицій для переміщення
        </ThemedText>
      ) : (
        <MovePalletPosesForm
          fromPallet={pallet}
          onSuccess={onSubmit}
          isSubmitting={isMoving}
          hideActions={true}
          onSubmitReady={handleSubmitReady}
        />
      )}
    </FormDialog>
  );
}
