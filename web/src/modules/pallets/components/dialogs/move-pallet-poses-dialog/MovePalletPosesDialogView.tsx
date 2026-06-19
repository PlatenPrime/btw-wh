import { FormErrorDisplay } from "@/components/shared/errors";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IPallet } from "@/modules/pallets/api/types";
import { MovePalletPosesForm } from "@/modules/pallets/components/forms/move-pallet-poses-form/MovePalletPosesForm";
import { typography } from "@/lib/typography";

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
          <div className={typography.pageDescription}>
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
