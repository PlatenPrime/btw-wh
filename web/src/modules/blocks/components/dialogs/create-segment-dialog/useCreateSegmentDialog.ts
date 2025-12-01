interface UseCreateSegmentDialogProps {
  onOpenChange?: (open: boolean) => void;
}

interface UseCreateSegmentDialogReturn {
  handleSuccess: () => void;
  handleCancel: () => void;
}

export function useCreateSegmentDialog({
  onOpenChange,
}: UseCreateSegmentDialogProps): UseCreateSegmentDialogReturn {
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

