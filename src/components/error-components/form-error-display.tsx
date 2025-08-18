import { cn } from "@/lib/utils";
import { AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";

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
      <div
        className={cn(
          "text-destructive flex items-center gap-2 text-sm",
          className,
        )}
      >
        <AlertCircle className="h-4 w-4 flex-shrink-0" />
        <span>{error}</span>
        {onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="text-destructive hover:bg-destructive/10 h-auto p-1"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <Alert variant="destructive" className={cn("relative", className)}>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{error}</AlertDescription>
      {onDismiss && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          className="text-destructive hover:bg-destructive/10 absolute top-2 right-2 h-auto p-1"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </Alert>
  );
}

// Компонент для отображения ошибок валидации полей
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
      className={cn(
        "text-destructive flex items-center gap-1.5 text-sm",
        className,
      )}
    >
      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
      <span>{error}</span>
    </div>
  );
}
