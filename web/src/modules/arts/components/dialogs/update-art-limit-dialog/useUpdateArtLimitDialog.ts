interface UseUpdateArtLimitDialogProps {
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

interface UseUpdateArtLimitDialogReturn {
  handleSuccess: () => void;
  handleCancel: () => void;
}

export function useUpdateArtLimitDialog({
  onOpenChange,
  onSuccess,
}: UseUpdateArtLimitDialogProps): UseUpdateArtLimitDialogReturn {
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

