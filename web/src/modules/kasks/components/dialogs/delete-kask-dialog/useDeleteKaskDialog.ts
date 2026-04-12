import { useDeleteKaskMutation } from "@/modules/kasks/api/hooks/mutations/useDeleteKaskMutation";
import type { KaskDto } from "@/modules/kasks/api/types/dto";

interface UseDeleteKaskDialogProps {
  kask: KaskDto;
  onSuccess?: () => void;
}

interface UseDeleteKaskDialogReturn {
  isDeleting: boolean;
  handleDelete: () => Promise<void>;
}

export function useDeleteKaskDialog({
  kask,
  onSuccess,
}: UseDeleteKaskDialogProps): UseDeleteKaskDialogReturn {
  const mutation = useDeleteKaskMutation();

  const isDeleting = mutation.isPending;

  const handleDelete = async () => {
    if (isDeleting) return;
    try {
      await mutation.mutateAsync(kask._id);
      onSuccess?.();
    } catch (error) {
      console.error("Помилка видалення запису до каси:", error);
      throw error;
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}
