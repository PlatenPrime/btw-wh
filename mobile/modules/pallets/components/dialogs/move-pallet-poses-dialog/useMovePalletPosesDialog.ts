import { useMovePalletPosesMutation } from "@/modules/pallets/api/hooks/mutations/useMovePalletPosesMutation";
import type { IPallet } from "@/modules/pallets/api/types";

interface UseMovePalletPosesDialogProps {
  pallet: IPallet;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

interface UseMovePalletPosesDialogReturn {
  isMoving: boolean;
  isSourceEmpty: boolean;
  mutationError: string | null;
  handleSubmit: (targetPalletId: string) => Promise<void>;
  handleDialogOpenChange: (newOpen: boolean) => void;
}

export function useMovePalletPosesDialog({
  pallet,
  onOpenChange,
  onSuccess,
}: UseMovePalletPosesDialogProps): UseMovePalletPosesDialogReturn {
  const moveMutation = useMovePalletPosesMutation({
    pallet,
  });

  const isMoving = moveMutation.isPending;

  const isSourceEmpty =
    !Array.isArray(pallet.poses) || pallet.poses.length === 0;

  const mutationError = moveMutation.error
    ? moveMutation.error instanceof Error
      ? moveMutation.error.message
      : "Помилка переміщення позицій"
    : null;

  const handleSubmit = async (targetPalletId: string) => {
    if (isMoving) {
      return;
    }

    moveMutation.reset();
    try {
      await moveMutation.mutateAsync(targetPalletId);
      onOpenChange?.(false);
      onSuccess?.();
    } catch (error) {
      console.error("Помилка переміщення позицій:", error);
    }
  };

  const handleDialogOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      moveMutation.reset();
    }
    onOpenChange?.(newOpen);
  };

  return {
    isMoving,
    isSourceEmpty,
    mutationError,
    handleSubmit,
    handleDialogOpenChange,
  };
}

