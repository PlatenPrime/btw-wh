interface UseCreateSkugrDialogProps {
  onOpenChange?: (open: boolean) => void;
}

interface UseCreateSkugrDialogReturn {
  handleSuccess: () => void;
  handleCancel: () => void;
}

export function useCreateSkugrDialog({
  onOpenChange,
}: UseCreateSkugrDialogProps): UseCreateSkugrDialogReturn {
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
