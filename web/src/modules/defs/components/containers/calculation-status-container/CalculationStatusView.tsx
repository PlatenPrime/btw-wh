import type { DefsCalculationStatus } from "@/modules/defs/api/types/dto";
import { CalculationFinishView } from "./components/calculation-finish-view";
import { CalculationInitView } from "./components/calculation-init-view";
import { CalculationRunView } from "./components/calculation-run-view";

interface CalculationStatusViewProps {
  status: DefsCalculationStatus;
  isLoading?: boolean;
}

export function CalculationStatusView({
  status,
  isLoading,
}: CalculationStatusViewProps) {
  if (isLoading) {
    return <CalculationInitView />;
  }

  if (status.isRunning) {
    return <CalculationRunView status={status} />;
  }

  return <CalculationFinishView status={status} />;
}
