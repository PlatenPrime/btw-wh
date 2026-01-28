interface UseCreatePalletGroupDialogParams {
  onOpenChange?: (open: boolean) => void;
}

interface UseCreatePalletGroupDialogReturn {
  handleSuccess: () => void;
  handleCancel: () => void;
}

export function useCreatePalletGroupDialog({
  onOpenChange,
}: UseCreatePalletGroupDialogParams): UseCreatePalletGroupDialogReturn {
  const handleSuccess = () => {
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return {
    handleSuccess,
    handleCancel,
  };
}
