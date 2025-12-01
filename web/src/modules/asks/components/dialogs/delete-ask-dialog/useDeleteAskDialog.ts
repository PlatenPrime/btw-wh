import { useDeleteAskMutation } from "@/modules/asks/api/hooks/mutations/useDeleteAskMutation";

interface UseDeleteAskDialogProps {
  askId: string;
  onSuccess?: () => void;
}

interface UseDeleteAskDialogReturn {
  isDeleting: boolean;
  handleDelete: () => Promise<void>;
}

export function useDeleteAskDialog({
  askId,
  onSuccess,
}: UseDeleteAskDialogProps): UseDeleteAskDialogReturn {
  const mutation = useDeleteAskMutation(askId);

  const isDeleting = mutation.isPending;

  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }

    try {
      await mutation.mutateAsync();
      onSuccess?.();
    } catch (error) {
      console.error("Помилка видалення запиту:", error);
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}

