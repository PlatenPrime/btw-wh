import type { VariantDto } from "@/modules/variants/api/types";
import { useDeleteVariantMutation } from "@/modules/variants/api/hooks/mutations/useDeleteVariantMutation";

interface UseDeleteVariantDialogProps {
  variant: VariantDto;
  onSuccess?: () => void;
}

interface UseDeleteVariantDialogReturn {
  isDeleting: boolean;
  handleDelete: () => Promise<void>;
}

export function useDeleteVariantDialog({
  variant,
  onSuccess,
}: UseDeleteVariantDialogProps): UseDeleteVariantDialogReturn {
  const mutation = useDeleteVariantMutation();

  const isDeleting = mutation.isPending;

  const handleDelete = async () => {
    if (isDeleting) return;
    try {
      await mutation.mutateAsync(variant._id);
      onSuccess?.();
    } catch {
      // toast in mutation
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}

