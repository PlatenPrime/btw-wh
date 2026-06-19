import { cn } from "@/lib/utils";
import { iconSize, typography } from "@/lib/typography";
import { AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export interface FormErrorDisplayProps {
  error?: string | null;
  onDismiss?: () => void;
  className?: string;
  variant?: "default" | "compact";
}

export function FormErrorDisplay({
  error,
  onDismiss,
  className,
  variant = "default",
}: FormErrorDisplayProps) {
  if (!error) return null;

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2", typography.formError, className)}>
        <AlertCircle className={iconSize.ui} />
        <span>{error}</span>
        {onDismiss ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="text-destructive hover:bg-destructive/10 h-auto p-1"
          >
            <X className={iconSize.inline} />
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <Alert variant="destructive" className={cn("relative", className)}>
      <AlertCircle className={iconSize.ui} />
      <AlertDescription>{error}</AlertDescription>
      {onDismiss ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          className="text-destructive hover:bg-destructive/10 absolute right-2 top-2 h-auto p-1"
        >
          <X className={iconSize.inline} />
        </Button>
      ) : null}
    </Alert>
  );
}

export interface FieldErrorDisplayProps {
  error?: string | null;
  className?: string;
}

export function FieldErrorDisplay({
  error,
  className,
}: FieldErrorDisplayProps) {
  if (!error) return null;

  return (
    <div
      className={cn("flex items-center gap-1.5", typography.formError, className)}
    >
      <AlertCircle className={iconSize.inline} />
      <span>{error}</span>
    </div>
  );
}
