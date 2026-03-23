import { useDeleteSkugrMutation } from "@/modules/skugrs/api/hooks/mutations/useDeleteSkugrMutation";
import type { SkugrPageDto } from "@/modules/skugrs/api/types";

interface UseDeleteSkugrDialogProps {
  skugr: SkugrPageDto;
  onSuccess?: () => void;
}

interface UseDeleteSkugrDialogReturn {
  isDeleting: boolean;
  handleDelete: () => Promise<void>;
}

export function useDeleteSkugrDialog({
  skugr,
  onSuccess,
}: UseDeleteSkugrDialogProps): UseDeleteSkugrDialogReturn {
  const mutation = useDeleteSkugrMutation();

  const isDeleting = mutation.isPending;

  const handleDelete = async () => {
    if (isDeleting) return;
    try {
      await mutation.mutateAsync(skugr._id);
      onSuccess?.();
    } catch (error) {
      console.error("Помилка видалення товарної групи:", error);
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}
