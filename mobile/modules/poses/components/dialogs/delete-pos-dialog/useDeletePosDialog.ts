import { useDeletePosMutation } from "@/modules/poses/api/hooks/mutations/useDeletePosMutation";
import type { IPos } from "@/modules/poses/api/types";

interface UseDeletePosDialogProps {
  pos: IPos;
  onSuccess?: () => void;
}

interface UseDeletePosDialogReturn {
  isDeleting: boolean;
  handleDelete: () => Promise<void>;
}

export function useDeletePosDialog({
  pos,
  onSuccess,
}: UseDeletePosDialogProps): UseDeletePosDialogReturn {
  const mutation = useDeletePosMutation(pos);

  const isDeleting = mutation.isPending;

  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }

    try {
      await mutation.mutateAsync(pos._id);
      onSuccess?.();
    } catch (error) {
      console.error("Помилка видалення позиції:", error);
      throw error;
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}

