interface UseUpdateVariantDialogProps {
  onOpenChange?: (open: boolean) => void;
}

interface UseUpdateVariantDialogReturn {
  handleSuccess: () => void;
  handleCancel: () => void;
}

export function useUpdateVariantDialog({
  onOpenChange,
}: UseUpdateVariantDialogProps): UseUpdateVariantDialogReturn {
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

