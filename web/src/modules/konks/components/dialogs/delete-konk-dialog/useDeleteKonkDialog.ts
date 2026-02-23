import { useDeleteKonkMutation } from "@/modules/konks/api/hooks/mutations/useDeleteKonkMutation";
import type { KonkDto } from "@/modules/konks/api/types";

interface UseDeleteKonkDialogProps {
  konk: KonkDto;
  onSuccess?: () => void;
}

interface UseDeleteKonkDialogReturn {
  isDeleting: boolean;
  handleDelete: () => Promise<void>;
}

export function useDeleteKonkDialog({
  konk,
  onSuccess,
}: UseDeleteKonkDialogProps): UseDeleteKonkDialogReturn {
  const mutation = useDeleteKonkMutation();

  const isDeleting = mutation.isPending;

  const handleDelete = async () => {
    if (isDeleting) return;
    try {
      await mutation.mutateAsync(konk._id);
      onSuccess?.();
    } catch (error) {
      console.error("Помилка видалення конкурента:", error);
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}
