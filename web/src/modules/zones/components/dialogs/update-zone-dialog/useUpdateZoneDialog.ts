interface UseUpdateZoneDialogProps {
  onOpenChange?: (open: boolean) => void;
}

interface UseUpdateZoneDialogReturn {
  handleSuccess: () => void;
  handleCancel: () => void;
}

export function useUpdateZoneDialog({
  onOpenChange,
}: UseUpdateZoneDialogProps): UseUpdateZoneDialogReturn {
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

