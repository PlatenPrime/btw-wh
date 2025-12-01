import { useDeleteSegmentMutation } from "@/modules/blocks/api/hooks/mutations/useDeleteSegmentMutation";
import type { SegmentDto } from "@/modules/blocks/api/types";

interface UseDeleteSegmentDialogProps {
  segment: SegmentDto;
  onSuccess?: () => void;
}

interface UseDeleteSegmentDialogReturn {
  isDeleting: boolean;
  handleDelete: () => Promise<void>;
}

export function useDeleteSegmentDialog({
  segment,
  onSuccess,
}: UseDeleteSegmentDialogProps): UseDeleteSegmentDialogReturn {
  const mutation = useDeleteSegmentMutation();

  const isDeleting = mutation.isPending;

  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }

    try {
      await mutation.mutateAsync(segment._id);
      onSuccess?.();
    } catch (error) {
      console.error("Помилка видалення сегмента:", error);
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}

