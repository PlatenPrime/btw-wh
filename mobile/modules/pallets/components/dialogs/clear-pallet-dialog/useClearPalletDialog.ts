import { useClearPalletMutation } from "@/modules/pallets/api/hooks/mutations/useClearPalletMutation";
import type { IPallet } from "@/modules/pallets/api/types";

interface UseClearPalletDialogProps {
  pallet: IPallet;
  onSuccess?: () => void;
}

interface UseClearPalletDialogReturn {
  isClearing: boolean;
  handleClear: () => Promise<void>;
}

export function useClearPalletDialog({
  pallet,
  onSuccess,
}: UseClearPalletDialogProps): UseClearPalletDialogReturn {
  const mutation = useClearPalletMutation({
    palletId: pallet._id,
    palletTitle: pallet.title,
    rowTitle: pallet.rowData.title,
  });

  const isClearing = mutation.isPending;

  const handleClear = async () => {
    if (isClearing) {
      return;
    }

    try {
      await mutation.mutateAsync();
      onSuccess?.();
    } catch (error) {
      console.error("Помилка очищення палети:", error);
      throw error;
    }
  };

  return {
    isClearing,
    handleClear,
  };
}

