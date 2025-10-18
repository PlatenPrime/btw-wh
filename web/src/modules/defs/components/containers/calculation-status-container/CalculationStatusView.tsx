import { Container } from "@/components/shared/containers/Container";
import { Progress } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import type { DefsCalculationStatus } from "@/modules/defs/api/types";
import { CheckCircle2, Clock, Loader2 } from "lucide-react";

interface CalculationStatusViewProps {
  status: DefsCalculationStatus;
  isLoading?: boolean;
}

export function CalculationStatusView({
  status,
  isLoading,
}: CalculationStatusViewProps) {
  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds} сек`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} хв ${remainingSeconds} сек`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <Container className="space-y-4 p-4">
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
          <h3 className="text-lg font-semibold">
            Розрахунок дефіцитів виконується
          </h3>
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Запуск...
          </Badge>
        </div>

        <div className="bg-muted rounded-lg p-3">
          <p className="text-sm font-medium">
            Ініціалізація процесу розрахунку
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            Отримання даних про статус...
          </p>
        </div>
      </Container>
    );
  }

  if (status.isRunning) {
    return (
      <Container className="space-y-4 p-4">
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
          <h3 className="text-lg font-semibold">
            Розрахунок дефіцитів виконується
          </h3>
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Активно
          </Badge>
        </div>

        {status.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Прогрес</span>
              <span className="font-medium">{status.progress}%</span>
            </div>
            <Progress value={status.progress} className="h-2" />
          </div>
        )}

        {status.currentStep && (
          <div className="bg-muted rounded-lg p-3">
            <p className="text-sm font-medium">{status.currentStep}</p>
            {status.processedItems !== undefined &&
              status.totalItems !== undefined && (
                <p className="text-muted-foreground mt-1 text-xs">
                  Оброблено: {status.processedItems} з {status.totalItems}
                </p>
              )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          {status.startedAt && (
            <div className="flex items-center gap-2">
              <Clock className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="font-medium">Розпочато</p>
                <p className="text-muted-foreground">
                  {formatDate(status.startedAt)}
                </p>
              </div>
            </div>
          )}

          {status.estimatedTimeRemaining !== undefined &&
            status.estimatedTimeRemaining > 0 && (
              <div className="flex items-center gap-2">
                <Clock className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="font-medium">Залишилось часу</p>
                  <p className="text-muted-foreground">
                    {formatTime(status.estimatedTimeRemaining)}
                  </p>
                </div>
              </div>
            )}
        </div>
      </Container>
    );
  }

  // Статус завершен или не запущен
  return (
    <Container className="p-4">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <h3 className="text-lg font-semibold">
          Розрахунок дефіцитів завершено
        </h3>
      </div>

      {status.lastUpdate && (
        <div className="text-muted-foreground mt-3 flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4" />
          <span>Останнє оновлення: {formatDate(status.lastUpdate)}</span>
        </div>
      )}
    </Container>
  );
}
