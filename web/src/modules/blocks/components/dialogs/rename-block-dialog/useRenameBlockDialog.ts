interface UseRenameBlockDialogProps {
    onOpenChange?: (open: boolean) => void;
}

interface UseRenameBlockDialogReturn {
    handleSuccess: () => void;
    handleCancel: () => void;
}

export function useRenameBlockDialog({
    onOpenChange,
}: UseRenameBlockDialogProps): UseRenameBlockDialogReturn {
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
