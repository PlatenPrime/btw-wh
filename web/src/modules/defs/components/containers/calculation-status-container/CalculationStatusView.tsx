import type { DefsCalculationStatus } from "@/modules/defs/api/types/dto";
import { CalcFinishContainer } from "./components/calc-finish-container/CalcFinishcontainer";
import { CalcInitContainer } from "./components/calc-init-container/CalcInitContainer";
import { CalcRunContainer } from "./components/calc-run-container/CalcRunContainer";

interface CalculationStatusViewProps {
  status: DefsCalculationStatus;
  isLoading?: boolean;
}

export function CalculationStatusView({
  status,
  isLoading,
}: CalculationStatusViewProps) {
  if (isLoading) {
    return <CalcInitContainer />;
  }

  if (status.isRunning) {
    return <CalcRunContainer status={status} />;
  }

  return <CalcFinishContainer status={status} />;
}
