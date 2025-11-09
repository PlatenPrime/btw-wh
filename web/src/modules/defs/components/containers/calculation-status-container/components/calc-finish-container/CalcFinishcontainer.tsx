import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { DefsCalculationStatus } from "@/modules/defs/api/types/dto";
import { formatDate } from "@/utils/formatDate";
import { CheckCircle2, Clock } from "lucide-react";

interface CalcFinishContainerProps {
  status: DefsCalculationStatus;
}

export function CalcFinishContainer({ status }: CalcFinishContainerProps) {
  return (
    <Wrapper className="p-4">
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
    </Wrapper>
  );
}
