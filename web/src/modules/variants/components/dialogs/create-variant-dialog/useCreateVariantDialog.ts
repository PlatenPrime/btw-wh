interface UseCreateVariantDialogProps {
  onOpenChange?: (open: boolean) => void;
}

interface UseCreateVariantDialogReturn {
  handleSuccess: () => void;
  handleCancel: () => void;
}

export function useCreateVariantDialog({
  onOpenChange,
}: UseCreateVariantDialogProps): UseCreateVariantDialogReturn {
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

