import { AlertTriangle, RefreshCw, Shield, Wifi } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface QueryErrorDisplayProps {
  error: Error | unknown;
  title?: string;
  description?: string;
  onRetry?: () => void;
  onGoBack?: () => void;
  onGoHome?: () => void;
  variant?: "default" | "compact" | "fullscreen";
  showActions?: boolean;
  className?: string;
}

export function QueryErrorDisplay({
  error,
  title,
  description,
  onRetry,
  onGoBack,
  onGoHome,
  variant = "default",
  showActions = true,
  className,
}: QueryErrorDisplayProps) {
  const errorMessage =
    error instanceof Error ? error.message : "Невідома помилка";

  // Визначаємо тип помилки для відповідної іконки та кольору
  const getErrorIcon = () => {
    if (errorMessage.includes("network") || errorMessage.includes("fetch")) {
      return <Wifi className="h-4 w-4" />;
    }
    if (errorMessage.includes("unauthorized") || errorMessage.includes("401")) {
      return <Shield className="h-4 w-4" />;
    }
    return <AlertTriangle className="h-4 w-4" />;
  };

  const getErrorType = () => {
    if (errorMessage.includes("network") || errorMessage.includes("fetch")) {
      return "Мережева помилка";
    }
    if (errorMessage.includes("unauthorized") || errorMessage.includes("401")) {
      return "Помилка авторизації";
    }
    if (errorMessage.includes("not found") || errorMessage.includes("404")) {
      return "Дані не знайдено";
    }
    return "Помилка завантаження";
  };

  const errorType = getErrorType();
  const errorIcon = getErrorIcon();

  if (variant === "compact") {
    return (
      <Alert variant="destructive" className="flex flex-col gap-2">
        {errorIcon}
        <AlertTitle>{title || errorType}</AlertTitle>
        <AlertDescription>{description || errorMessage}</AlertDescription>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry} className="">
            <RefreshCw className="h-4 w-4" />
            <span className="text-xs">Повторити</span>
          </Button>
        )}
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
              {description || "Сталася помилка при завантаженні даних"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="destructive">
              {errorIcon}
              <AlertTitle>Деталі помилки</AlertTitle>
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
                    Спробувати знову
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
                    На головну
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
              {description || "Сталася помилка при завантаженні даних"}
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
          <AlertTitle>Опис помилки</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>

        {showActions && (onRetry || onGoBack || onGoHome) && (
          <div className="flex flex-wrap gap-2">
            {onRetry && (
              <Button onClick={onRetry} variant="default" size="sm">
                <RefreshCw className="mr-2 h-3 w-3" />
                Спробувати знову
              </Button>
            )}
            {onGoBack && (
              <Button onClick={onGoBack} variant="outline" size="sm">
                Назад
              </Button>
            )}
            {onGoHome && (
              <Button onClick={onGoHome} variant="outline" size="sm">
                На головну
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
