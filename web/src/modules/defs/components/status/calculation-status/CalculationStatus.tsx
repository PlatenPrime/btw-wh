import type { DefsCalculationStatus } from "@/modules/defs/api/types/dto";
import { CalculationStatusView } from "@/modules/defs/components/status/calculation-status/CalculationStatusView";

interface CalculationStatusProps {
  status: DefsCalculationStatus;
  isLoading?: boolean;
}

export function CalculationStatus({
  status,
  isLoading,
}: CalculationStatusProps) {
  return <CalculationStatusView status={status} isLoading={isLoading} />;
}
