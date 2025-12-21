import { View } from "react-native";
import { Button, ButtonText, ButtonSpinner, HStack } from "@/components/ui";
import { ThemedText } from "@/components/themed-text";

interface DialogActionsProps {
  onCancel?: () => void;
  onSubmit: () => void;
  cancelText?: string;
  submitText?: string;
  isSubmitting?: boolean;
  isDisabled?: boolean;
  variant?: "default" | "destructive";
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

  const submitButtonBgColor =
    variant === "destructive" ? "bg-error-500" : "bg-info-500";

  return (
    <HStack className={`gap-2 ${className || ""}`}>
      {onCancel && (
        <Button
          onPress={onCancel}
          isDisabled={isSubmitting}
          className="flex-1 rounded-lg border border-outline-200 bg-background-0 items-center justify-center py-3"
          style={{ opacity: isSubmitting ? 0.5 : 1 }}
        >
          <ButtonText>
            <ThemedText type="defaultSemiBold">{cancelText}</ThemedText>
          </ButtonText>
        </Button>
      )}
      <Button
        onPress={onSubmit}
        isDisabled={isDisabledState}
        className={`flex-1 rounded-lg ${submitButtonBgColor} items-center justify-center py-3`}
        style={{ opacity: isDisabledState ? 0.5 : 1 }}
      >
        {isSubmitting ? (
          <ButtonSpinner color="#fff" />
        ) : (
          <ButtonText>
            <ThemedText type="defaultSemiBold" className="text-white">
              {submitText}
            </ThemedText>
          </ButtonText>
        )}
      </Button>
    </HStack>
  );
}

