import type { AnalogDto } from "@/modules/analogs/api/types";
import { useDeleteAnalogMutation } from "@/modules/analogs/api/hooks/mutations/useDeleteAnalogMutation";

interface UseDeleteAnalogDialogProps {
  analog: AnalogDto;
  onSuccess?: () => void;
}

interface UseDeleteAnalogDialogReturn {
  isDeleting: boolean;
  handleDelete: () => Promise<void>;
}

export function useDeleteAnalogDialog({
  analog,
  onSuccess,
}: UseDeleteAnalogDialogProps): UseDeleteAnalogDialogReturn {
  const mutation = useDeleteAnalogMutation();

  const isDeleting = mutation.isPending;

  const handleDelete = async () => {
    if (isDeleting) return;
    try {
      await mutation.mutateAsync(analog._id);
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
