interface UseCreateAnalogDialogProps {
  onOpenChange?: (open: boolean) => void;
}

interface UseCreateAnalogDialogReturn {
  handleSuccess: () => void;
  handleCancel: () => void;
}

export function useCreateAnalogDialog({
  onOpenChange,
}: UseCreateAnalogDialogProps): UseCreateAnalogDialogReturn {
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
