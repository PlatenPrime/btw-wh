import type { UseDialogProps, UseDialogReturn } from "@/types/components/dialog-types";

/**
 * Базовый хук для диалогов с поддержкой controlled/uncontrolled режимов
 * Предоставляет стандартную логику для открытия/закрытия диалогов
 */
export function useDialog({ onOpenChange }: UseDialogProps): UseDialogReturn {
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

