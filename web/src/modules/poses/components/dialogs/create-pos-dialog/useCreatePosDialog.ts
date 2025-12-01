interface UseCreatePosDialogProps {
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

interface UseCreatePosDialogReturn {
  handleSuccess: () => void;
  handleCancel: () => void;
}

export function useCreatePosDialog({
  onOpenChange,
  onSuccess,
}: UseCreatePosDialogProps): UseCreatePosDialogReturn {
  const handleSuccess = () => {
    onOpenChange?.(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return {
    handleSuccess,
    handleCancel,
  };
}

