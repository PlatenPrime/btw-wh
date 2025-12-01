import { useDeletePalletEmptyPosesMutation } from "@/modules/pallets/api/hooks/mutations/useDeletePalletEmptyPosesMutation";
import type { IPallet } from "@/modules/pallets/api/types";

interface UseDeletePalletEmptyPosesDialogProps {
  pallet: IPallet;
  onSuccess?: () => void;
}

interface UseDeletePalletEmptyPosesDialogReturn {
  isDeleting: boolean;
  handleDelete: () => Promise<void>;
}

export function useDeletePalletEmptyPosesDialog({
  pallet,
  onSuccess,
}: UseDeletePalletEmptyPosesDialogProps): UseDeletePalletEmptyPosesDialogReturn {
  const mutation = useDeletePalletEmptyPosesMutation({
    palletId: pallet._id,
    palletTitle: pallet.title,
  });

  const isDeleting = mutation.isPending;

  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }

    try {
      await mutation.mutateAsync();
      onSuccess?.();
    } catch (error) {
      console.error("Помилка видалення порожніх позицій:", error);
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}

