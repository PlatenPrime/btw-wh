import { Button, HStack, Text } from "@/components/ui";
import { ActivityIndicator } from "react-native";
import { SemanticColors } from "@/constants/theme";

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

  return (
    <HStack className={`gap-2 ${className || ""}`}>
      {onCancel && (
        <Button
          onPress={onCancel}
          disabled={isSubmitting}
          variant="outline"
          className="flex-1"
        >
          <Text className="font-semibold">{cancelText}</Text>
        </Button>
      )}
      <Button
        onPress={onSubmit}
        disabled={isDisabledState}
        variant={variant === "destructive" ? "destructive" : "default"}
        className="flex-1"
      >
        {isSubmitting ? (
          <ActivityIndicator color={SemanticColors.white} />
        ) : (
          <Text className="text-white font-semibold">{submitText}</Text>
        )}
      </Button>
    </HStack>
  );
}
