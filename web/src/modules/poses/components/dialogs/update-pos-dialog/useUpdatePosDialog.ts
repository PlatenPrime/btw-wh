interface UseUpdatePosDialogProps {
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

interface UseUpdatePosDialogReturn {
  handleSuccess: () => void;
  handleCancel: () => void;
}

export function useUpdatePosDialog({
  onOpenChange,
  onSuccess,
}: UseUpdatePosDialogProps): UseUpdatePosDialogReturn {
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

