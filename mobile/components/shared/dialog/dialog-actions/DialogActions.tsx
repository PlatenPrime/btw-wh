import type { ButtonProps } from "@/components/types";
import { ThemedButton, ThemedHStack, ThemedText as ThemedTextButton } from "@/components/themed";
import { SemanticColors } from "@/constants/theme";
import { ActivityIndicator } from "react-native";

type DialogActionsVariant = "default" | "destructive" | "confirm" | "create";

interface DialogActionsProps {
  onCancel?: () => void;
  onSubmit: () => void;
  cancelText?: string;
  submitText?: string;
  isSubmitting?: boolean;
  isDisabled?: boolean;
  variant?: DialogActionsVariant;
  className?: string;
}

export function DialogActions({
  onCancel,
  onSubmit,
  cancelText = "Скасувати",
  submitText = "Підтвердити",
  isSubmitting = false,
  isDisabled = false,
  variant = "default",
  className,
}: DialogActionsProps) {
  const isDisabledState = isDisabled || isSubmitting;

  const variants: Record<DialogActionsVariant, ButtonProps["variant"]> = {
    default: "default",
    destructive: "destructive",
    create: "create",
    confirm: "confirm",
  };

  return (
    <ThemedHStack className={`gap-2 ${className || ""}`}>
      {onCancel && (
        <ThemedButton
          onPress={onCancel}
          disabled={isSubmitting}
          variant="outline"
          className="flex-1"
        >
          <ThemedTextButton className="font-semibold">{cancelText}</ThemedTextButton>
        </ThemedButton>
      )}
      <ThemedButton
        onPress={onSubmit}
        disabled={isDisabledState}
        variant={variants[variant] || "default"}
        className="flex-1"
        key={`submit-${isDisabledState}`}
      >
        {isSubmitting ? (
          <ActivityIndicator color={SemanticColors.white} />
        ) : (
          <ThemedTextButton className="text-white font-semibold">{submitText}</ThemedTextButton>
        )}
      </ThemedButton>
    </ThemedHStack>
  );
}
