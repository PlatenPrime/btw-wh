import type { DefsCalculationStatus } from "@/modules/defs/api/types/dto";
import { CalculationStatusView } from "@/modules/defs/components/containers/calculation-status-container/CalculationStatusView";

interface CalculationStatusContainerViewProps {
  status: DefsCalculationStatus;
  isLoading: boolean;
}

export function CalculationStatusContainerView({
  status,
  isLoading,
}: CalculationStatusContainerViewProps) {
  return <CalculationStatusView status={status} isLoading={isLoading} />;
}
