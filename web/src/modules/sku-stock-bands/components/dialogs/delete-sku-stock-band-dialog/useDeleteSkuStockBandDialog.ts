import { useDeleteSkuStockBandMutation } from "@/modules/sku-stock-bands/api/hooks/mutations/useDeleteSkuStockBandMutation";
import type { SkuStockBandDto } from "@/modules/sku-stock-bands/api/types";

interface UseDeleteSkuStockBandDialogProps {
  band: SkuStockBandDto;
  onSuccess?: () => void;
}

export function useDeleteSkuStockBandDialog({
  band,
  onSuccess,
}: UseDeleteSkuStockBandDialogProps) {
  const mutation = useDeleteSkuStockBandMutation();

  const handleDelete = async () => {
    if (mutation.isPending) return;
    await mutation.mutateAsync(band._id);
    onSuccess?.();
  };

  return {
    isDeleting: mutation.isPending,
    handleDelete,
  };
}
