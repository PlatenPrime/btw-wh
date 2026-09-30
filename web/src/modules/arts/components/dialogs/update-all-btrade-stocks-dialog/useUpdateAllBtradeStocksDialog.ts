import { useStartApiTask } from "@/modules/apitasks";

interface UseUpdateAllBtradeStocksDialogProps {
  onSuccess?: () => void;
}

interface UseUpdateAllBtradeStocksDialogReturn {
  isUpdating: boolean;
  handleUpdate: () => Promise<void>;
}

export function useUpdateAllBtradeStocksDialog({
  onSuccess,
}: UseUpdateAllBtradeStocksDialogProps): UseUpdateAllBtradeStocksDialogReturn {
  const { startTask, isStarting } = useStartApiTask();

  const handleUpdate = async () => {
    if (isStarting) return;

    try {
      const task = await startTask({
        kind: "arts.btrade-stock-update-all",
        params: {},
        title: "Оновлення залишків Btrade",
      });
      if (task) onSuccess?.();
    } catch {
      // toast у provider
    }
  };

  return {
    isUpdating: isStarting,
    handleUpdate,
  };
}
