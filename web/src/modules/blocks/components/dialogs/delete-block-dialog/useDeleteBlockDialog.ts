import { useDeleteBlockMutation } from "@/modules/blocks/api/hooks/mutations/useDeleteBlockMutation";
import type { BlockDto } from "@/modules/blocks/api/types";

interface UseDeleteBlockDialogProps {
  block: BlockDto;
  onSuccess?: () => void;
}

interface UseDeleteBlockDialogReturn {
  isDeleting: boolean;
  handleDelete: () => Promise<void>;
}

export function useDeleteBlockDialog({
  block,
  onSuccess,
}: UseDeleteBlockDialogProps): UseDeleteBlockDialogReturn {
  const mutation = useDeleteBlockMutation();

  const isDeleting = mutation.isPending;

  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }

    try {
      await mutation.mutateAsync(block._id);
      onSuccess?.();
    } catch (error) {
      console.error("Помилка видалення блоку:", error);
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}

