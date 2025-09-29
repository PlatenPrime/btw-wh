import type { DefsCalculationStatus } from "@/modules/defs/api/types/dto";
import { CalculationStatusView } from "@/modules/defs/components/containers/calculation-status-container/CalculationStatusView";

interface CalculationStatusContainerProps {
  status: DefsCalculationStatus;
  isLoading: boolean;
}

export function CalculationStatusContainer({
  status,
  isLoading,
}: CalculationStatusContainerProps) {
  return <CalculationStatusView status={status} isLoading={isLoading} />;
}
