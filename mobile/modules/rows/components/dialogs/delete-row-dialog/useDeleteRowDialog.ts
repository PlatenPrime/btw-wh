import { useDeleteRowMutation } from "@/modules/rows/api/hooks/mutations/useDeleteRowMutation";
import type { RowDto } from "@/modules/rows/api/types/dto";

interface UseDeleteRowDialogProps {
  row: RowDto;
  onSuccess?: () => void;
}

interface UseDeleteRowDialogReturn {
  isDeleting: boolean;
  handleDelete: () => Promise<void>;
}

export function useDeleteRowDialog({
  row,
  onSuccess,
}: UseDeleteRowDialogProps): UseDeleteRowDialogReturn {
  const mutation = useDeleteRowMutation();

  const isDeleting = mutation.isPending;

  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }

    try {
      await mutation.mutateAsync(row._id);
      onSuccess?.();
    } catch (error) {
      console.error("Помилка видалення ряду:", error);
      throw error;
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}

