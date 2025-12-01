interface UseCreateBlockDialogProps {
  onOpenChange?: (open: boolean) => void;
}

interface UseCreateBlockDialogReturn {
  handleSuccess: () => void;
  handleCancel: () => void;
}

export function useCreateBlockDialog({
  onOpenChange,
}: UseCreateBlockDialogProps): UseCreateBlockDialogReturn {
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

