import { FormDialog } from "@/components/shared/form-dialog";
import { Box } from "@/components/ui/box";
import { ThemedText } from "@/components/themed-text";
import type { IPallet } from "@/modules/pallets/api/types";
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
  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title="Перемістити позиції"
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
          onCancel={onClose}
        />
      )}
    </FormDialog>
  );
}

