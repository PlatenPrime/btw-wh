import { FormErrorDisplay } from "@/components/shared/error-components/form-error-display";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IPallet } from "@/modules/pallets/api/types";
import { MovePalletPosesForm } from "@/modules/pallets/components/forms/move-pallet-poses-form/MovePalletPosesForm";

interface MovePalletPosesDialogViewProps {
  pallet: IPallet;
  isSourceEmpty: boolean;
  mutationError: string | null;
  isMoving: boolean;
  onSubmit: (targetPalletId: string) => Promise<void>;
  onCancel: () => void;
}

export function MovePalletPosesDialogView({
  pallet,
  isSourceEmpty,
  mutationError,
  isMoving,
  onSubmit,
  onCancel,
}: MovePalletPosesDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Перемістити позиції</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-3">
        <FormErrorDisplay error={mutationError} />
        {isSourceEmpty ? (
          <div className="text-muted-foreground text-sm">
            На цій паллеті немає позицій для переміщення
          </div>
        ) : (
          <MovePalletPosesForm
            fromPallet={pallet}
            onSuccess={onSubmit}
            isSubmitting={isMoving}
            onCancel={onCancel}
          />
        )}
      </div>
    </DialogContent>
  );
}
