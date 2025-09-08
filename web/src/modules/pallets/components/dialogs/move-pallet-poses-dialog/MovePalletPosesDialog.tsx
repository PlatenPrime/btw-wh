import { useMovePalletPosesMutation } from "@/modules/pallets/api/hooks/mutations/useMovePalletPosesMutation";
import type { IPallet } from "@/modules/pallets/api/types";
import { useState } from "react";
import { MovePalletPosesDialogView } from "./MovePalletPosesDialogView";

interface MovePalletPosesDialogProps {
  pallet: IPallet;
}

export function MovePalletPosesDialog({ pallet }: MovePalletPosesDialogProps) {
  const [open, setOpen] = useState(false);

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
    />
  );
}
