import { useDeleteProdMutation } from "@/modules/prods/api/hooks/mutations/useDeleteProdMutation";
import type { ProdDto } from "@/modules/prods/api/types";

interface UseDeleteProdDialogProps {
  prod: ProdDto;
  onSuccess?: () => void;
}

interface UseDeleteProdDialogReturn {
  isDeleting: boolean;
  handleDelete: () => Promise<void>;
}

export function useDeleteProdDialog({
  prod,
  onSuccess,
}: UseDeleteProdDialogProps): UseDeleteProdDialogReturn {
  const mutation = useDeleteProdMutation();

  const isDeleting = mutation.isPending;

  const handleDelete = async () => {
    if (isDeleting) return;
    try {
      await mutation.mutateAsync(prod._id);
      onSuccess?.();
    } catch (error) {
      console.error("Помилка видалення виробника:", error);
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}
