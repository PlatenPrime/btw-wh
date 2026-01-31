interface UseEditUserDialogProps {
  onOpenChange?: (open: boolean) => void;
}

interface UseEditUserDialogReturn {
  handleSuccess: () => void;
  handleCancel: () => void;
}

export function useEditUserDialog({
  onOpenChange,
}: UseEditUserDialogProps): UseEditUserDialogReturn {
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
