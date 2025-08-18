import { AlertTriangle, FileText, RefreshCw, Shield, Wifi } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export interface ErrorDisplayProps {
  error: Error | string | unknown;
  title?: string;
  description?: string;
  onRetry?: () => void;
  onGoBack?: () => void;
  onGoHome?: () => void;
  variant?: "default" | "compact" | "fullscreen";
  showActions?: boolean;
  className?: string;
}

export function ErrorDisplay({
  error,
  title,
  description,
  onRetry,
  onGoBack,
  onGoHome,
  variant = "default",
  showActions = true,
  className,
}: ErrorDisplayProps) {
  const errorMessage =
    typeof error === "string"
      ? error
      : error instanceof Error
        ? error.message
        : "Неизвестная ошибка";
  const errorName = error instanceof Error ? error.name : undefined;

  // Определяем тип ошибки для соответствующей иконки
  const getErrorIcon = () => {
    if (errorName?.includes("Network") || errorMessage.includes("network")) {
      return <Wifi className="h-4 w-4" />;
    }
    if (errorName?.includes("Auth") || errorMessage.includes("unauthorized")) {
      return <Shield className="h-4 w-4" />;
    }
    if (
      errorName?.includes("Validation") ||
      errorMessage.includes("validation")
    ) {
      return <FileText className="h-4 w-4" />;
    }
    return <AlertTriangle className="h-4 w-4" />;
  };

  const getErrorType = () => {
    if (errorName?.includes("Network") || errorMessage.includes("network")) {
      return "Сетевая ошибка";
    }
    if (errorName?.includes("Auth") || errorMessage.includes("unauthorized")) {
      return "Ошибка авторизации";
    }
    if (
      errorName?.includes("Validation") ||
      errorMessage.includes("validation")
    ) {
      return "Ошибка валидации";
    }
    return "Ошибка приложения";
  };

  const errorType = getErrorType();
  const errorIcon = getErrorIcon();

  if (variant === "compact") {
    return (
      <Alert variant="destructive" className={className}>
        {errorIcon}
        <AlertTitle>{title || errorType}</AlertTitle>
        <AlertDescription>{description || errorMessage}</AlertDescription>
      </Alert>
    );
  }

  if (variant === "fullscreen") {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="bg-destructive/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              {errorIcon}
            </div>
            <CardTitle className="text-destructive text-2xl font-bold">
              {title || errorType}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {description || "Произошла ошибка при выполнении операции"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="destructive">
              {errorIcon}
              <AlertTitle>Детали ошибки</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>

            {showActions && (
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                {onRetry && (
                  <Button
                    onClick={onRetry}
                    variant="default"
                    className="flex-1 sm:flex-none"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Попробовать снова
                  </Button>
                )}
                {onGoBack && (
                  <Button
                    onClick={onGoBack}
                    variant="outline"
                    className="flex-1 sm:flex-none"
                  >
                    Назад
                  </Button>
                )}
                {onGoHome && (
                  <Button
                    onClick={onGoHome}
                    variant="outline"
                    className="flex-1 sm:flex-none"
                  >
                    На главную
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Default variant
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-destructive/10 flex h-10 w-10 items-center justify-center rounded-full">
            {errorIcon}
          </div>
          <div>
            <CardTitle className="text-destructive text-lg">
              {title || errorType}
            </CardTitle>
            <CardDescription>
              {description || "Произошла ошибка при выполнении операции"}
            </CardDescription>
          </div>
        </div>
        <Badge variant="secondary" className="w-fit">
          {errorType}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="destructive">
          {errorIcon}
          <AlertTitle>Описание ошибки</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>

        {showActions && (onRetry || onGoBack || onGoHome) && (
          <div className="flex flex-wrap gap-2">
            {onRetry && (
              <Button onClick={onRetry} variant="default" size="sm">
                <RefreshCw className="mr-2 h-3 w-3" />
                Попробовать снова
              </Button>
            )}
            {onGoBack && (
              <Button onClick={onGoBack} variant="outline" size="sm">
                Назад
              </Button>
            )}
            {onGoHome && (
              <Button onClick={onGoHome} variant="outline" size="sm">
                На главную
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
