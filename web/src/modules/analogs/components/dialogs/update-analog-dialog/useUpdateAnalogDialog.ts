interface UseUpdateAnalogDialogProps {
  onOpenChange?: (open: boolean) => void;
}

interface UseUpdateAnalogDialogReturn {
  handleSuccess: () => void;
  handleCancel: () => void;
}

export function useUpdateAnalogDialog({
  onOpenChange,
}: UseUpdateAnalogDialogProps): UseUpdateAnalogDialogReturn {
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
