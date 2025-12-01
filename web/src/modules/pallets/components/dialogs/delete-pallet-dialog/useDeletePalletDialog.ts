import { useDeletePalletMutation } from "@/modules/pallets/api/hooks/mutations/useDeletePalletMutation";
import type { IPallet } from "@/modules/pallets/api/types";

interface UseDeletePalletDialogProps {
  pallet: IPallet;
  onSuccess?: () => void;
}

interface UseDeletePalletDialogReturn {
  isDeleting: boolean;
  handleDelete: () => Promise<void>;
}

export function useDeletePalletDialog({
  pallet,
  onSuccess,
}: UseDeletePalletDialogProps): UseDeletePalletDialogReturn {
  const mutation = useDeletePalletMutation(pallet.rowData._id);

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
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}

