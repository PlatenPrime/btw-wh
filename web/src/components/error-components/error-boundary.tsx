import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import { Component, type ErrorInfo, type ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  private handleGoBack = () => {
    window.history.back();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="bg-background flex min-h-screen items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <div className="bg-destructive/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <AlertTriangle className="text-destructive h-8 w-8" />
              </div>
              <CardTitle className="text-destructive text-2xl font-bold">
                Что-то пошло не так
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Произошла неожиданная ошибка в приложении
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Детали ошибки</AlertTitle>
                <AlertDescription>
                  {this.state.error?.message || "Неизвестная ошибка"}
                </AlertDescription>
              </Alert>

              {import.meta.env.DEV && this.state.errorInfo && (
                <details className="bg-muted rounded-lg border p-4">
                  <summary className="text-muted-foreground cursor-pointer font-medium">
                    Техническая информация (только для разработчиков)
                  </summary>
                  <pre className="text-muted-foreground mt-2 text-xs whitespace-pre-wrap">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  onClick={this.handleRetry}
                  variant="default"
                  className="flex-1 sm:flex-none"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Попробовать снова
                </Button>
                <Button
                  onClick={this.handleGoBack}
                  variant="outline"
                  className="flex-1 sm:flex-none"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Назад
                </Button>
                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="flex-1 sm:flex-none"
                >
                  <Home className="mr-2 h-4 w-4" />
                  На главную
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
