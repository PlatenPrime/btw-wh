import type { DefsCalculationStatus } from "@/modules/defs/api/types/dto";
import { CalculationStatusContainerView } from "@/modules/defs/components/containers/calculation-status-container/CalculationStatusContainerView";

interface CalculationStatusContainerProps {
  status: DefsCalculationStatus;
  isLoading: boolean;
}

export function CalculationStatusContainer({
  status,
  isLoading,
}: CalculationStatusContainerProps) {
  return (
    <CalculationStatusContainerView status={status} isLoading={isLoading} />
  );
}
