interface UseCreateAskDialogProps {
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

interface UseCreateAskDialogReturn {
  handleSuccess: () => void;
  handleCancel: () => void;
}

export function useCreateAskDialog({
  onOpenChange,
  onSuccess,
}: UseCreateAskDialogProps): UseCreateAskDialogReturn {
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

