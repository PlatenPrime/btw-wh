interface UseAddZonesToSegmentDialogProps {
  onOpenChange?: (open: boolean) => void;
}

interface UseAddZonesToSegmentDialogReturn {
  handleSuccess: () => void;
  handleCancel: () => void;
}

export function useAddZonesToSegmentDialog({
  onOpenChange,
}: UseAddZonesToSegmentDialogProps): UseAddZonesToSegmentDialogReturn {
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

