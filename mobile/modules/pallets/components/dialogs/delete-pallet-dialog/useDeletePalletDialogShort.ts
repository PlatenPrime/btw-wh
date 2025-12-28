import { useDeletePalletMutation } from "@/modules/pallets/api/hooks/mutations/useDeletePalletMutation";
import type { PalletShortDto } from "@/modules/pallets/api/types";

interface UseDeletePalletDialogShortProps {
  pallet: PalletShortDto;
  rowId: string;
  onSuccess?: () => void;
}

interface UseDeletePalletDialogShortReturn {
  isDeleting: boolean;
  handleDelete: () => Promise<void>;
}

export function useDeletePalletDialogShort({
  pallet,
  rowId,
  onSuccess,
}: UseDeletePalletDialogShortProps): UseDeletePalletDialogShortReturn {
  const mutation = useDeletePalletMutation(rowId);

  const isDeleting = mutation.isPending;

  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }

    try {
      await mutation.mutateAsync(pallet._id);
      onSuccess?.();
    } catch (error) {
      console.error("Помилка видалення палети:", error);
      throw error;
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}

