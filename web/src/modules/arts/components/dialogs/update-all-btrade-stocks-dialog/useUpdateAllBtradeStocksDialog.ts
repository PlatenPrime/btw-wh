import { useUpdateAllBtradeStocksMutation } from "@/modules/arts/api/hooks/mutations/useUpdateAllBtradeStocksMutation";

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
  const mutation = useUpdateAllBtradeStocksMutation();

  const isUpdating = mutation.isPending;

  const handleUpdate = async () => {
    if (isUpdating) {
      return;
    }

    try {
      await mutation.mutateAsync();
      onSuccess?.();
    } catch (error) {
      console.error("Помилка оновлення залишків Btrade:", error);
    }
  };

  return {
    isUpdating,
    handleUpdate,
  };
}

