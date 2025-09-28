import type { Defcalc } from "@/modules/defs/api/types/dto";
import { DefsStatsView } from "@/modules/defs/components/elements/defs-stats/DefsStatsView";
import { useMemo } from "react";

interface DefsStatsProps {
  defsData: Defcalc;
}

export function DefsStats({ defsData }: DefsStatsProps) {
  const stats = useMemo(() => {
    const items = Object.values(defsData.result);

    return {
      deficits: defsData.totalDeficits,
      critical: items.filter((item) => item.difQuant <= 0).length,
      nearLimit: items.filter(
        (item) => item.difQuant > 0 && item.limit && item.quant <= item.limit,
      ).length,
    };
  }, [defsData]);

  return <DefsStatsView defsData={defsData} stats={stats} />;
}
