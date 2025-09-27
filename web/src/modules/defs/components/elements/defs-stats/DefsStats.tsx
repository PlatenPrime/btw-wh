import type { Defcalc } from "@/modules/defs/api/types/dto";
import { DefsStatsView } from "@/modules/defs/components/elements/defs-stats/DefsStatsView";

interface DefsStatsProps {
  defsData: Defcalc;
}

export function DefsStats({ defsData }: DefsStatsProps) {
  return <DefsStatsView defsData={defsData} />;
}
