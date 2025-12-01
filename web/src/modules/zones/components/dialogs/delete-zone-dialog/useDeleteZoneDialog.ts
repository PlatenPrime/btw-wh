import { useDeleteZoneMutation } from "@/modules/zones/api/hooks/mutations/useDeleteZoneMutation";
import type { ZoneDto } from "@/modules/zones/api/types";

interface UseDeleteZoneDialogProps {
  zone: ZoneDto;
  onSuccess?: () => void;
}

interface UseDeleteZoneDialogReturn {
  isDeleting: boolean;
  handleDelete: () => Promise<void>;
}

export function useDeleteZoneDialog({
  zone,
  onSuccess,
}: UseDeleteZoneDialogProps): UseDeleteZoneDialogReturn {
  const mutation = useDeleteZoneMutation();

  const isDeleting = mutation.isPending;

  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }

    try {
      await mutation.mutateAsync(zone._id);
      onSuccess?.();
    } catch (error) {
      console.error("Помилка видалення зони:", error);
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}
