import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

interface DialogActionsProps {
  onCancel?: () => void;
  onSubmit: () => void;
  cancelText?: string;
  submitText?: string;
  isSubmitting?: boolean;
  isDisabled?: boolean;
  variant?: VariantProps<typeof buttonVariants>["variant"];
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
    <div className={cn("flex gap-2", className)}>
      {onCancel && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1"
        >
          {cancelText}
        </Button>
      )}
      <Button
        type="button"
        variant={variant}
        onClick={onSubmit}
        disabled={isDisabledState}
        className={onCancel ? "flex-1" : "w-full"}
      >
        {isSubmitting ? "Обробка..." : submitText}
      </Button>
    </div>
  );
}
