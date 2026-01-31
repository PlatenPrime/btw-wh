interface UseCreateUserDialogProps {
  onOpenChange?: (open: boolean) => void;
}

interface UseCreateUserDialogReturn {
  handleSuccess: () => void;
  handleCancel: () => void;
}

export function useCreateUserDialog({
  onOpenChange,
}: UseCreateUserDialogProps): UseCreateUserDialogReturn {
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
