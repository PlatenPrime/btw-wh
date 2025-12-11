import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Badge } from "@/components/ui/badge";
import type { DefsCalculationStatus } from "@/modules/defs/api/types/dto";
import { formatDate } from "@/utils/formatDate";
import { CheckCircle2, Clock } from "lucide-react";

interface CalcFinishContainerProps {
  status: DefsCalculationStatus;
}

export function CalcFinishContainer({ status }: CalcFinishContainerProps) {
  return (
    <Wrapper className="grid gap-4 p-4">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <h3 className="text-lg font-semibold">
          Розрахунок дефіцитів завершено
        </h3>
        <Badge variant="default" className="bg-green-100 text-green-800">
          Завершено
        </Badge>
      </div>

      {status.processedItems !== undefined &&
        status.totalItems !== undefined && (
          <div className="bg-muted rounded-lg p-3">
            <p className="text-sm font-medium">
              Оброблено елементів: {status.processedItems} з {status.totalItems}
            </p>
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

        {status.lastUpdate && (
          <div className="flex items-center gap-2">
            <Clock className="text-muted-foreground h-4 w-4" />
            <div>
              <p className="font-medium">Завершено</p>
              <p className="text-muted-foreground">
                {formatDate(status.lastUpdate)}
              </p>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
}

