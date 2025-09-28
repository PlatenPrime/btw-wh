import { Container } from "@/components/shared/container";
import { Progress } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import type { DefsCalculationStatus } from "@/modules/defs/api/types/dto";
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
    return `${minutes} мин ${remainingSeconds} сек`;
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
            Расчет дефицитов выполняется
          </h3>
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Запуск...
          </Badge>
        </div>

        <div className="bg-muted rounded-lg p-3">
          <p className="text-sm font-medium">Инициализация процесса расчета</p>
          <p className="text-muted-foreground mt-1 text-xs">
            Получение данных о статусе...
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
            Расчет дефицитов выполняется
          </h3>
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Активно
          </Badge>
        </div>

        {status.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Прогресс</span>
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
                  Обработано: {status.processedItems} из {status.totalItems}
                </p>
              )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          {status.startedAt && (
            <div className="flex items-center gap-2">
              <Clock className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="font-medium">Начато</p>
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
                  <p className="font-medium">Осталось времени</p>
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
        <h3 className="text-lg font-semibold">Расчет дефицитов завершен</h3>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Завершено
        </Badge>
      </div>

      {status.lastUpdate && (
        <div className="text-muted-foreground mt-3 flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4" />
          <span>Последнее обновление: {formatDate(status.lastUpdate)}</span>
        </div>
      )}

      {status.progress === 100 && (
        <div className="mt-3 rounded-lg bg-green-50 p-3">
          <p className="text-sm font-medium text-green-800">
            Расчет успешно завершен!
          </p>
        </div>
      )}
    </Container>
  );
}
