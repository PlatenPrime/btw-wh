import { useMovePalletPosesMutation } from "@/modules/pallets/api/hooks/mutations/useMovePalletPosesMutation";
import type { IPallet } from "@/modules/pallets/api/types";
import { MovePalletPosesDialogView } from "@/modules/pallets/components/dialogs/move-pallet-poses-dialog/MovePalletPosesDialogView.tsx";
import { useState } from "react";

interface MovePalletPosesDialogProps {
  pallet: IPallet;
  trigger?: React.ReactNode;
  // Поддержка контролируемого режима
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function MovePalletPosesDialog({
  pallet,
  trigger,
  open: controlledOpen,
  onOpenChange,
}: MovePalletPosesDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  // Используем контролируемое состояние если передано, иначе внутреннее
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const moveMutation = useMovePalletPosesMutation({
    pallet,
  });

  const handleSuccess = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async (targetPalletId: string) => {
    // clear previous error before new attempt
    moveMutation.reset();
    await moveMutation.mutateAsync(targetPalletId);
    handleSuccess();
    setOpen(false);
  };

  const isSourceEmpty =
    !Array.isArray(pallet.poses) || pallet.poses.length === 0;

  const mutationError = moveMutation.error
    ? moveMutation.error instanceof Error
      ? moveMutation.error.message
      : "Помилка переміщення позицій"
    : null;

  return (
    <MovePalletPosesDialogView
      open={open}
      setOpen={setOpen}
      onCancel={handleCancel}
      pallet={pallet}
      handleSubmit={handleSubmit}
      isSourceEmpty={isSourceEmpty}
      moveMutation={moveMutation}
      mutationError={mutationError}
      trigger={trigger}
    />
  );
}
