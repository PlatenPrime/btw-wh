import { useDeleteDelMutation } from "@/modules/dels/api/hooks/mutations/useDeleteDelMutation";
import type { DelListItemDto } from "@/modules/dels/api/types";

interface UseDeleteDelDialogProps {
  del: DelListItemDto;
  onSuccess?: () => void;
}

interface UseDeleteDelDialogReturn {
  isDeleting: boolean;
  handleDelete: () => Promise<void>;
}

export function useDeleteDelDialog({
  del,
  onSuccess,
}: UseDeleteDelDialogProps): UseDeleteDelDialogReturn {
  const mutation = useDeleteDelMutation();

  const isDeleting = mutation.isPending;

  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }

    try {
      await mutation.mutateAsync(del._id);
      onSuccess?.();
    } catch (error) {
      console.error("Помилка видалення поставки:", error);
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}
