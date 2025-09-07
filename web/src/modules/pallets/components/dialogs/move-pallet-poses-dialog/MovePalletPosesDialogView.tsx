import { FormErrorDisplay } from "@/components/error-components/form-error-display";
import { MoveTrigger } from "@/components/triggers/move-trigger.tsx/MoveTrigger";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { useMovePalletPosesMutation } from "@/modules/pallets/api/hooks/mutations/useMovePalletPosesMutation";
import type { IPallet } from "@/modules/pallets/api/types"; 
import { MovePalletPosesForm } from "@/modules/pallets/components/forms/move-pallet-poses-form/MovePalletPosesForm";

interface MovePalletPosesDialogViewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  onCancel: () => void;
  pallet: IPallet;
}

export function MovePalletPosesDialogView({
  open,
  setOpen,
  onSuccess,
  onCancel,
  pallet,
}: MovePalletPosesDialogViewProps) {
  const moveMutation = useMovePalletPosesMutation({
    pallet,
  });

  const handleSubmit = async (targetPalletId: string) => {
    // clear previous error before new attempt
    moveMutation.reset();
    await moveMutation.mutateAsync(targetPalletId);
    onSuccess();
    setOpen(false);
  };

  const mutationError = moveMutation.error
    ? moveMutation.error instanceof Error
      ? moveMutation.error.message
      : "Помилка переміщення позицій"
    : null;

  const isSourceEmpty =
    !Array.isArray(pallet.poses) || pallet.poses.length === 0;

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
