import type { Defcalc } from "@/modules/defs/api/types/dto";
import { DefsStatsView } from "@/modules/defs/components/elements/defs-stats/DefsStatsView";
import { useMemo } from "react";

interface DefsStatsProps {
  defsData: Defcalc;
}

export function DefsStats({ defsData }: DefsStatsProps) {
  const stats = useMemo(() => {
    return {
      deficits: defsData.total,
      critical: defsData.totalCriticalDefs,
      nearLimit: defsData.totalLimitDefs,
    };
  }, [defsData]);

  return <DefsStatsView defsData={defsData} stats={stats} />;
}
