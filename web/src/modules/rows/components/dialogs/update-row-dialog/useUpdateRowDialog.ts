interface UseUpdateRowDialogProps {
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

interface UseUpdateRowDialogReturn {
  handleSuccess: () => void;
  handleCancel: () => void;
}

export function useUpdateRowDialog({
  onOpenChange,
  onSuccess,
}: UseUpdateRowDialogProps): UseUpdateRowDialogReturn {
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

