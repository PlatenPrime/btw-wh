import { useStartApiTask } from "@/modules/apitasks";

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
  const { startTask, isStarting } = useStartApiTask();

  const handleDelete = async () => {
    if (isStarting) return;

    try {
      const task = await startTask({
        kind: "arts.delete-without-latest-marker",
        params: {},
        title: "Видалення артикулів без маркера",
      });
      if (task) onSuccess?.();
    } catch {
      // toast у provider
    }
  };

  return {
    isDeleting: isStarting,
    handleDelete,
  };
}
