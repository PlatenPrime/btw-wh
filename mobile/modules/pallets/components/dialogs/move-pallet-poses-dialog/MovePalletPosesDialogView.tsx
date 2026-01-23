import { DialogActions } from "@/components/shared/dialog/dialog-actions/DialogActions";
import { FormDialog } from "@/components/shared/dialog/form-dialog";
import { ThemedBox, ThemedText } from "@/components/themed/";
import type { IPallet } from "@/modules/pallets/api/types";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const submitFnRef = useRef<(() => void) | null>(null);
  const isSubmitDisabledRef = useRef(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (!visible) {
      // Сбрасываем только при закрытии диалога
      submitFnRef.current = null;
      isSubmitDisabledRef.current = true;
      setIsSubmitDisabled(true);
    }
  }, [visible]);

  const handleSubmitReady = useCallback((fn: () => void, disabled: boolean) => {
    submitFnRef.current = fn;
    isSubmitDisabledRef.current = disabled;
    setIsSubmitDisabled(disabled);
  }, []);

  const handleDialogSubmit = useCallback(() => {
    const fn = submitFnRef.current;
    if (fn) {
      fn();
    }
  }, []);

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
        <ThemedBox className="mb-4 p-3 rounded-lg border border-error-500 bg-error-50">
          <ThemedText type="default" className="text-error-700">
            {mutationError}
          </ThemedText>
        </ThemedBox>
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
