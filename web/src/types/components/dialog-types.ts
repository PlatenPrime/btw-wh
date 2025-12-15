import type { ReactNode } from "react";

/**
 * Базовый интерфейс для всех диалогов с поддержкой controlled/uncontrolled режимов
 */
export interface BaseDialogProps {
  /** Управляет открытием диалога (controlled режим) */
  open?: boolean;
  /** Обработчик изменения состояния открытия */
  onOpenChange?: (open: boolean) => void;
}

/**
 * Интерфейс для диалогов с триггером
 */
export interface DialogWithTriggerProps extends BaseDialogProps {
  /** Кастомный триггер для открытия диалога */
  trigger?: ReactNode;
  /** Показывать ли стандартный триггер (по умолчанию true) */
  showTrigger?: boolean;
}

/**
 * Интерфейс для диалогов с колбэком успешного выполнения
 */
export interface DialogWithSuccessProps extends BaseDialogProps {
  /** Колбэк, вызываемый при успешном выполнении действия */
  onSuccess?: () => void;
}

/**
 * Полный интерфейс для диалогов с триггером и успехом
 */
export interface DialogWithTriggerAndSuccessProps
  extends DialogWithTriggerProps,
    DialogWithSuccessProps {}

/**
 * Базовый интерфейс для хуков диалогов
 */
export interface UseDialogProps {
  /** Обработчик изменения состояния открытия */
  onOpenChange?: (open: boolean) => void;
}

/**
 * Базовый интерфейс для хуков диалогов с успехом
 */
export interface UseDialogWithSuccessProps extends UseDialogProps {
  /** Колбэк, вызываемый при успешном выполнении действия */
  onSuccess?: () => void;
}

/**
 * Базовый возвращаемый тип для хуков диалогов
 */
export interface UseDialogReturn {
  /** Обработчик успешного выполнения */
  handleSuccess: () => void;
  /** Обработчик отмены */
  handleCancel: () => void;
}

