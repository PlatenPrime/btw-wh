interface UsePatchSkuSliceDialogProps {
  onOpenChange?: (open: boolean) => void;
}

interface UsePatchSkuSliceDialogReturn {
  handleSuccess: () => void;
  handleCancel: () => void;
}

export function usePatchSkuSliceDialog({
  onOpenChange,
}: UsePatchSkuSliceDialogProps): UsePatchSkuSliceDialogReturn {
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
