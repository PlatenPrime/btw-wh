import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Badge, Progress } from "@/components/ui";
import type { DefsCalculationStatus } from "@/modules/defs/api/types/dto";
import { formatDate } from "@/utils/formatDate";
import { formatRemainingSeconds } from "@/utils/formatRemainingSeconds";
import { Clock, Loader2 } from "lucide-react";

interface CalcRunContainerProps {
  status: DefsCalculationStatus;
}

export function CalcRunContainer({ status }: CalcRunContainerProps) {
  return (
    <Wrapper className="space-y-4 p-4">
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
                  {formatRemainingSeconds(status.estimatedTimeRemaining)}
                </p>
              </div>
            </div>
          )}
      </div>
    </Wrapper>
  );
}
