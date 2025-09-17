import { FormErrorDisplay } from '@/components/shared/error-components/form-error-display';
import { MoveTrigger } from '@/components/shared/triggers/move-trigger/MoveTrigger';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import type { IPallet } from "@/modules/pallets/api/types";
import { MovePalletPosesForm } from "@/modules/pallets/components/forms/move-pallet-poses-form/MovePalletPosesForm";
import type { UseMutationResult } from "@tanstack/react-query";

interface MovePalletPosesDialogViewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onCancel: () => void;
  pallet: IPallet;
  handleSubmit: (targetPalletId: string) => void;
  isSourceEmpty: boolean;
  moveMutation: UseMutationResult<unknown, unknown, string, unknown>;
  mutationError: string | null;
}

export function MovePalletPosesDialogView({
  open,
  setOpen,
  onCancel,
  pallet,
  handleSubmit,
  isSourceEmpty,
  moveMutation,
  mutationError,
}: MovePalletPosesDialogViewProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) {
          moveMutation.reset();
        }
        setOpen(next);
      }}
    >
      <DialogTrigger asChild>
        <MoveTrigger />
      </DialogTrigger>
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
              onSuccess={handleSubmit}
              isSubmitting={moveMutation.isPending}
              onCancel={() => {
                onCancel();
                setOpen(false);
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
