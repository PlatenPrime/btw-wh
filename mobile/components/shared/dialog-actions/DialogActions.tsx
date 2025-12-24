import { Button, ButtonSpinner, ButtonText, HStack } from "@/components/ui";
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
          isDisabled={isSubmitting}
          className="flex-1 rounded-lg border border-outline-200 bg-background-0 items-center justify-center py-3"
          style={{ opacity: isSubmitting ? 0.5 : 1 }}
        >
          <ButtonText className="font-semibold">{cancelText}</ButtonText>
        </Button>
      )}
      <Button
        onPress={onSubmit}
        isDisabled={isDisabledState}
        className={`flex-1 rounded-lg ${
          variant === "destructive" ? "bg-error-500" : ""
        } items-center justify-center py-3`}
        style={{
          opacity: isDisabledState ? 0.5 : 1,
          ...(variant !== "destructive" && {
            backgroundColor: isDisabledState
              ? SemanticColors.disabled
              : SemanticColors.primary,
          }),
        }}
      >
        {isSubmitting ? (
          <ButtonSpinner color={SemanticColors.white} />
        ) : (
          <ButtonText className="text-white font-semibold">{submitText}</ButtonText>
        )}
      </Button>
    </HStack>
  );
}
