interface UseUpdateArtDialogProps {
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

interface UseUpdateArtDialogReturn {
  handleSuccess: () => void;
  handleCancel: () => void;
}

export function useUpdateArtDialog({
  onOpenChange,
  onSuccess,
}: UseUpdateArtDialogProps): UseUpdateArtDialogReturn {
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
