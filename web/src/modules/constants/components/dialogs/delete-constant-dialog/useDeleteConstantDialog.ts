import { useDeleteConstantMutation } from "@/modules/constants/api/hooks/mutations/useDeleteConstantMutation";
import type { ConstantDto } from "@/modules/constants/api/types";

interface UseDeleteConstantDialogProps {
  constant: ConstantDto;
  onSuccess?: () => void;
}

interface UseDeleteConstantDialogReturn {
  isDeleting: boolean;
  handleDelete: () => Promise<void>;
}

export function useDeleteConstantDialog({
  constant,
  onSuccess,
}: UseDeleteConstantDialogProps): UseDeleteConstantDialogReturn {
  const mutation = useDeleteConstantMutation();

  const isDeleting = mutation.isPending;

  const handleDelete = async () => {
    if (isDeleting) return;
    try {
      await mutation.mutateAsync(constant._id);
      onSuccess?.();
    } catch (error) {
      console.error("Помилка видалення константи:", error);
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}
