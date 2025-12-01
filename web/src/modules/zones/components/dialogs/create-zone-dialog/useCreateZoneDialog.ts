interface UseCreateZoneDialogProps {
  onOpenChange?: (open: boolean) => void;
}

interface UseCreateZoneDialogReturn {
  handleSuccess: () => void;
  handleCancel: () => void;
}

export function useCreateZoneDialog({
  onOpenChange,
}: UseCreateZoneDialogProps): UseCreateZoneDialogReturn {
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

