import { useDeleteArtsWithoutLatestMarkerMutation } from "@/modules/arts/api/hooks/mutations/useDeleteArtsWithoutLatestMarkerMutation";
import { toast } from "sonner";

interface UseDeleteArtsWithoutLatestMarkerDialogProps {
  onSuccess?: () => void;
}

interface UseDeleteArtsWithoutLatestMarkerDialogReturn {
  isDeleting: boolean;
  handleDelete: () => Promise<void>;
}

export function useDeleteArtsWithoutLatestMarkerDialog({
  onSuccess,
}: UseDeleteArtsWithoutLatestMarkerDialogProps): UseDeleteArtsWithoutLatestMarkerDialogReturn {
  const mutation = useDeleteArtsWithoutLatestMarkerMutation();

  const isDeleting = mutation.isPending;

  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }

    try {
      const result = await mutation.mutateAsync();
      toast.success(
        `Успішно видалено ${result.deletedCount} артикулів. Останній маркер: ${
          result.latestMarker || "не знайдено"
        }`,
      );
      onSuccess?.();
    } catch (error) {
      console.error("Помилка видалення артикулів:", error);
      toast.error("Помилка видалення артикулів", {
        description:
          error instanceof Error ? error.message : "Невідома помилка",
      });
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}

