interface UseUpdateSkugrDialogProps {
  onOpenChange?: (open: boolean) => void;
}

interface UseUpdateSkugrDialogReturn {
  handleSuccess: () => void;
  handleCancel: () => void;
}

export function useUpdateSkugrDialog({
  onOpenChange,
}: UseUpdateSkugrDialogProps): UseUpdateSkugrDialogReturn {
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
